import React from "react";
import { Link } from "react-router-dom";
import BaseMenu from "./base/BaseMenu";
import { EditIcon, MoreIcon, OrgIcon } from "./base/Icons";

const DocumentCard = (props) => {
  const isTemplate = props.identifier === "template";
  const basePath = props.basePath;
  const target = `/${basePath}/${props.navigate}?collab=yjs`;

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xs p-4 cursor-pointer transition-all duration-150 hover:shadow-ds-md hover:border-border-default">
      <Link to={target} className="no-underline">
        {/* Thumbnail */}
        {isTemplate ? (
          <div className="w-full h-[88px] bg-bg-subtle rounded-[1px] mb-3 p-2 grid grid-cols-2 gap-1 border border-border-subtle">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`rounded-[1px] ${i === 0 ? "bg-border-default" : "bg-bg-hover"}`}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-[90px] bg-bg-subtle rounded-[1px] mb-3 p-2.5 flex flex-col gap-1.5 border border-border-subtle">
            <div className="h-1.5 w-[70%] bg-border-default rounded-[1px]" />
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[5px] bg-border-subtle rounded-[1px]"
                style={{ width: `${60 + (i % 3) * 15}%` }}
              />
            ))}
          </div>
        )}

        <div className="font-medium text-[13px] text-text-primary mb-1 flex items-center gap-1.5 truncate">
          <span className="truncate">{props.title}</span>
          {props.organizationId && (
            <span className="text-text-muted flex-shrink-0">
              <OrgIcon size={12} />
            </span>
          )}
        </div>
        <div className="text-[11px] text-text-muted mb-2">
          Updated {props.modifiedAt}
        </div>
      </Link>

      {props.actionsVisible && (
        <div className="flex items-center justify-end gap-1 border-t border-border-subtle pt-2">
          <Link
            to={target}
            target="_blank"
            className="w-[22px] h-[22px] bg-transparent border-none rounded-[2px] cursor-pointer text-text-muted hover:text-text-primary hover:bg-bg-hover flex items-center justify-center no-underline"
            onClick={(e) => e.stopPropagation()}
          >
            <EditIcon />
          </Link>
          <BaseMenu
            trigger={
              <span className="w-[22px] h-[22px] flex items-center justify-center rounded-[2px] text-text-muted hover:text-text-primary hover:bg-bg-hover">
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
};

export default DocumentCard;
