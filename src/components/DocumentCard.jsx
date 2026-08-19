import React from "react";
import { Link } from "react-router-dom";
import BaseMenu from "./base/BaseMenu";
import {
  EditIcon,
  MoreIcon,
  OrgIcon,
  ReportsIcon,
  TemplatesIcon,
} from "./base/Icons";

function CardThumbnail({ isTemplate }) {
  if (isTemplate) {
    return (
      <div className="w-full h-[120px] bg-bg-subtle rounded-sm mb-3 p-3 grid grid-cols-2 gap-1.5 border border-border-subtle flex-shrink-0">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`rounded-[2px] ${i === 0 ? "bg-border-default" : "bg-bg-hover"}`}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="w-full h-[120px] bg-bg-subtle rounded-sm mb-3 p-3 flex flex-col gap-1.5 border border-border-subtle flex-shrink-0">
      <div className="h-2 w-[55%] bg-border-default rounded-[2px]" />
      <div className="h-1.5 w-[80%] bg-border-subtle rounded-[2px]" />
      <div className="h-1.5 w-[65%] bg-border-subtle rounded-[2px]" />
      <div className="h-1.5 w-[75%] bg-border-subtle rounded-[2px]" />
      <div className="h-1.5 w-[50%] bg-border-subtle rounded-[2px]" />
      <div className="mt-auto h-1.5 w-[40%] bg-border-subtle rounded-[2px] opacity-50" />
    </div>
  );
}

// Grid card view
const DocumentCard = (props) => {
  const isTemplate = props.identifier === "template";
  const target = `/${props.basePath}/${props.navigate}?collab=yjs`;

  return (
    <div className="relative bg-bg-surface border border-border-subtle rounded-xs cursor-pointer transition-all duration-150 hover:shadow-ds-md hover:border-border-default group flex flex-col">
      <Link to={target} className="no-underline p-3 flex-1">
        <CardThumbnail isTemplate={isTemplate} />
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            <div className="font-medium text-[13px] text-text-primary truncate leading-snug">
              {props.title}
            </div>
            <div className="text-[11px] text-text-muted mt-0.5 flex items-center gap-1">
              {props.organizationId && <OrgIcon size={10} />}
              {props.modifiedAt}
            </div>
          </div>
        </div>
      </Link>

      {props.actionsVisible && (
        <div
          className="
      absolute top-2 right-2 z-20
      opacity-0
      group-hover:opacity-100
      transition-opacity duration-150
      pointer-events-none
      group-hover:pointer-events-auto
      
    "
        >
          <BaseMenu
            trigger={
              <span
                className="
            w-7 h-7
            flex items-center justify-center
            rounded-full
            bg-white
            border border-border-subtle
            shadow-sm
            text-text-muted
            hover:text-text-primary
            hover:shadow-md
            transition-all
          "
              >
                <MoreIcon className={"rotate-90"} />
              </span>
            }
          >
            <Link
              className="block w-full text-left px-3 py-2 text-[13px] hover:bg-bg-hover no-underline text-text-primary"
              to={target}
              target="_blank"
            >
              Open in New Tab
            </Link>

            <button
              className="block w-full text-left px-3 py-2 text-[13px] hover:bg-bg-hover bg-transparent border-none cursor-pointer text-error-text"
              onClick={() => props.deleteDocumentHandler(props.id)}
            >
              Remove
            </button>
          </BaseMenu>
        </div>
      )}
    </div>
  );
};

// List row view
export function DocumentListRow(props) {
  const isTemplate = props.identifier === "template";
  const target = `/${props.basePath}/${props.navigate}?collab=yjs`;
  const Icon = isTemplate ? TemplatesIcon : ReportsIcon;

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border-subtle last:border-b-0 hover:bg-bg-hover group transition-colors duration-100">
      <div className="w-7 h-7 rounded-xs bg-bg-subtle border border-border-subtle flex items-center justify-center text-text-muted flex-shrink-0">
        <Icon size={13} />
      </div>
      <Link to={target} className="flex-1 min-w-0 no-underline">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[13px] font-medium text-text-primary truncate">
            {props.title}
          </span>
          {props.organizationId && (
            <span className="text-text-muted flex-shrink-0">
              <OrgIcon size={11} />
            </span>
          )}
        </div>
      </Link>
      <span className="text-[11px] text-text-muted whitespace-nowrap flex-shrink-0 hidden sm:block">
        {props.modifiedAt}
      </span>
      {props.actionsVisible && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 flex-shrink-0">
          <Link
            to={target}
            target="_blank"
            className="w-[22px] h-[22px] bg-transparent border-none rounded-xs cursor-pointer text-text-muted hover:text-text-primary hover:bg-bg-hover flex items-center justify-center no-underline"
            onClick={(e) => e.stopPropagation()}
            title="Open in new tab"
          >
            <EditIcon />
          </Link>
          <BaseMenu
            trigger={
              <span className="w-[22px] h-[22px] flex items-center justify-center rounded-xs text-text-muted hover:text-text-primary hover:bg-bg-hover">
                <MoreIcon />
              </span>
            }
          >
            <Link
              className="block w-full text-left px-3 py-2 text-[13px] hover:bg-bg-hover no-underline text-text-primary"
              to={target}
              target="_blank"
            >
              Open in New Tab
            </Link>
            <button
              className="block w-full text-left px-3 py-2 text-[13px] hover:bg-bg-hover border-none bg-transparent cursor-pointer text-error-text"
              onClick={() => props.deleteDocumentHandler(props.id)}
            >
              Remove
            </button>
          </BaseMenu>
        </div>
      )}
    </div>
  );
}

export default DocumentCard;
