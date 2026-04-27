import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import EditorComponent from "../../../components/editor/Editor";
import { PrimeLogo } from "../../../components/base/Icons";

export default function TemplateEditorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [socketIdentifier, setSocketIdentifier] = useState();
  const [customButtonClicked, setCustomButtonClicked] = useState();
  const [templateName, setTemplateName] = useState("Untitled");

  const onTitleBlur = () => {
    if (!templateName || !templateName.length > 0) setTemplateName("Untitled");
  };

  useEffect(() => {
    const pathName = location.pathname;
    if (pathName.includes("templates") && id) setSocketIdentifier("template");
    else if (pathName.includes("documents") && id) setSocketIdentifier("document");
  }, [location.pathname, id]);

  const updateTemplateName = (updatedName) => setTemplateName(updatedName);
  const handleCustomButtonClick = (buttonData) => setCustomButtonClicked(buttonData);

  return (
    <div className="w-full h-screen flex flex-col bg-bg-base font-sans">
      <div className="h-12 bg-bg-surface border-b border-border-subtle flex items-center px-4 gap-3 flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="border-none bg-transparent cursor-pointer p-1 rounded-xs hover:bg-bg-hover"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <Link to="/dashboard" className="flex items-center gap-1.5 no-underline">
          <PrimeLogo size={20} />
          <span className="font-bold text-[13px] text-text-primary tracking-tight">Prime</span>
        </Link>
        <div className="w-px h-4 bg-border-subtle" />
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <Link to="/templates" className="no-underline text-text-muted hover:text-text-primary">Templates</Link>
          <span>›</span>
          <input
            className="text-text-primary font-medium bg-transparent border-none outline-none px-1 rounded-xs hover:bg-bg-hover focus:bg-bg-hover min-w-0"
            value={templateName ?? "Untitled"}
            onBlur={onTitleBlur}
            onChange={(e) => setTemplateName(e.target.value ?? "")}
            style={{ width: `${Math.max((templateName || "").length, 8)}ch` }}
          />
        </div>
        <div className="flex-1" />
        <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-warning-subtle text-warning-text border border-warning-border">
          Template
        </span>
        <div className="flex items-center gap-1.5 ml-2">
          <button
            onClick={() => handleCustomButtonClick({ type: "print" })}
            title="Print"
            className="w-8 h-8 border-none bg-transparent cursor-pointer rounded-xs hover:bg-bg-hover flex items-center justify-center"
          >
            <img src="/icons/editor/printer.svg" alt="Print" className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCustomButtonClick({ type: "table" })}
            title="Insert Table"
            className="w-8 h-8 border-none bg-transparent cursor-pointer rounded-xs hover:bg-bg-hover flex items-center justify-center"
          >
            <img src="/icons/editor/table.svg" alt="Table" className="h-4 w-4" />
          </button>
          <label
            htmlFor="camera-input"
            title="Insert Image"
            className="w-8 h-8 border-none bg-transparent cursor-pointer rounded-xs hover:bg-bg-hover flex items-center justify-center"
          >
            <input
              className="hidden"
              type="file"
              accept="image/*"
              capture="camera"
              onChange={(event) => handleCustomButtonClick({ type: "picture", data: event })}
              id="camera-input"
            />
            <img src="/icons/editor/camera.svg" alt="Camera" className="h-4 w-4" />
          </label>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <EditorComponent
          organizationId={location?.state?.organizationId}
          socketIdentifier={socketIdentifier}
          documentName={templateName}
          updateDocumentName={updateTemplateName}
          customButtonClicked={customButtonClicked}
        />
      </div>
    </div>
  );
}
