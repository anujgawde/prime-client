import React from "react";
import { Link } from "react-router-dom";
import BaseMenu from "./base/BaseMenu";

const DocumentCard = (props) => {
  const documentLineHex =
    props.identifier === "template" ? "#FED8B1" : "#D2E5F6";

  const basePath = props.basePath;

  return (
    <div className="bg-white rounded-2xl flex flex-col">
      <Link to={`/${basePath}/${props.navigate}`}>
        <div className="py-10 px-8 space-y-4">
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-full h-1 rounded-full"
          ></div>
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-3/4 h-1 rounded-full"
          ></div>
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-full h-1 rounded-full"
          ></div>
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-3/4 h-1 rounded-full"
          ></div>
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-full h-1 rounded-full"
          ></div>
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-3/4 h-1 rounded-full"
          ></div>
        </div>
      </Link>
      <div className="py-3 border-t pl-6 pr-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium flex items-center">
            {props.title}{" "}
            {props.organizationId && (
              <span className="ml-2">
                <img
                  src="/icons/base/organization/building.svg"
                  className="h-4 w-4"
                />
              </span>
            )}
          </div>
          <p className="text-xs">Updated on {props.modifiedAt}</p>
        </div>

        {props.actionsVisible && (
          <div className="flex items-center">
            <BaseMenu iconSrc="/icons/base/ellipsis.svg">
              <Link
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none"
                to={props.navigate}
                target="_blank"
              >
                Open in New Tab
              </Link>

              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none text-red-600"
                onClick={() => props.deleteDocumentHandler(props.id)}
              >
                Remove
              </button>
            </BaseMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
