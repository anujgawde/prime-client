import * as Y from "yjs";
import { Awareness, encodeAwarenessUpdate, applyAwarenessUpdate } from "y-protocols/awareness";

// Bridges a Y.Doc to the existing Socket.IO connection.
// Events used (resourceType in {"report","template"}):
//   <type>-yjs-join       client -> server  (one-shot on attach)
//   <type>-yjs-init       server -> client  ({snapshot, updates})
//   <type>-yjs-update     bidirectional     ({update}) — persisted + broadcast
//   <type>-yjs-awareness  bidirectional     ({update}) — broadcast only
const REMOTE_ORIGIN = Symbol("remote-yjs");

export class SocketYjsProvider {
  constructor({ socket, docReference, resourceType, joinPayload }) {
    this.socket = socket;
    this.docReference = docReference;
    this.resourceType = resourceType;
    this.joinPayload = joinPayload;
    this.doc = new Y.Doc();
    this.awareness = new Awareness(this.doc);
    this.synced = false;
    this._onSynced = [];
    this._handlers = {};

    this._evt = {
      init: `${resourceType}-yjs-init`,
      update: `${resourceType}-yjs-update`,
      awareness: `${resourceType}-yjs-awareness`,
      join: `${resourceType}-yjs-join`,
    };

    this._wire();
  }

  onSynced(cb) {
    if (this.synced) cb();
    else this._onSynced.push(cb);
  }

  destroy() {
    Object.entries(this._handlers).forEach(([name, fn]) => {
      this.socket.off(name, fn);
    });
    this.doc.off("update", this._docUpdateHandler);
    this.awareness.off("update", this._awarenessUpdateHandler);
    this.awareness.destroy();
    this.doc.destroy();
  }

  _wire() {
    const { init, update, awareness, join } = this._evt;

    this._handlers[init] = ({ snapshot, updates }) => {
      this.doc.transact(() => {
        if (snapshot) Y.applyUpdate(this.doc, _toUint8(snapshot), REMOTE_ORIGIN);
        if (updates) {
          for (const u of updates) {
            Y.applyUpdate(this.doc, _toUint8(u), REMOTE_ORIGIN);
          }
        }
      }, REMOTE_ORIGIN);
      this.synced = true;
      this._onSynced.forEach((cb) => cb());
      this._onSynced = [];
    };

    this._handlers[update] = ({ update: u }) => {
      Y.applyUpdate(this.doc, _toUint8(u), REMOTE_ORIGIN);
    };

    this._handlers[awareness] = ({ update: u }) => {
      applyAwarenessUpdate(this.awareness, _toUint8(u), REMOTE_ORIGIN);
    };

    Object.entries(this._handlers).forEach(([name, fn]) => {
      this.socket.on(name, fn);
    });

    this._docUpdateHandler = (u, origin) => {
      if (origin === REMOTE_ORIGIN) return;
      this.socket.emit(update, { docReference: this.docReference, update: u });
    };
    this.doc.on("update", this._docUpdateHandler);

    this._awarenessUpdateHandler = ({ added, updated, removed }, origin) => {
      if (origin === REMOTE_ORIGIN) return;
      const changed = [...added, ...updated, ...removed];
      const u = encodeAwarenessUpdate(this.awareness, changed);
      this.socket.emit(awareness, { docReference: this.docReference, update: u });
    };
    this.awareness.on("update", this._awarenessUpdateHandler);

    this.socket.emit(join, { docReference: this.docReference, ...this.joinPayload });
  }
}

function _toUint8(v) {
  if (v instanceof Uint8Array) return v;
  if (v && v.type === "Buffer" && Array.isArray(v.data)) return new Uint8Array(v.data);
  if (Array.isArray(v)) return new Uint8Array(v);
  if (v && v.buffer) return new Uint8Array(v.buffer, v.byteOffset || 0, v.byteLength || v.length);
  return new Uint8Array(v);
}
