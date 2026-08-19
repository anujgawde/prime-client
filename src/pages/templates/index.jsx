import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { deleteTemplate, getTemplates } from "../../api/templates";
import { useAuthContext } from "../../context/AuthContext";
import CreateTemplate from "../../components/dialogs/templates/CreateTemplate";
import DocumentCard, { DocumentListRow } from "../../components/DocumentCard";
import AppShell from "../../components/layout/AppShell";
import { formatDate } from "../../utils/utils";
import { PlusIcon, SearchIcon } from "../../components/base/Icons";

function GridIcon({ active }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={active ? "text-text-primary" : "text-text-muted"}
    >
      <rect
        x="1"
        y="1"
        width="5"
        height="5"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="8"
        y="1"
        width="5"
        height="5"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="1"
        y="8"
        width="5"
        height="5"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="8"
        y="8"
        width="5"
        height="5"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function ListIcon({ active }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={active ? "text-text-primary" : "text-text-muted"}
    >
      <line
        x1="1"
        y1="3"
        x2="13"
        y2="3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="7"
        x2="13"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="11"
        x2="13"
        y2="11"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TemplatesPage() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [templates, setTemplates] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const fetchTemplates = async () => {
    const response = await getTemplates({ createdBy: auth.currentUser._id });
    setTemplates(response || []);
  };

  const deleteHandler = async (templateId) => {
    await deleteTemplate(templateId, auth.currentUser);
    setTemplates(templates.filter((t) => t._id !== templateId));
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleCreate = () => {
    const org = auth.currentUser?.organization;
    if (org && (org.roles === "super-admin" || org.roles === "admin")) {
      setCreateOpen(true);
    } else {
      navigate(`/templates/${uuidv4()}?collab=yjs`);
    }
  };

  const filtered = templates.filter((t) =>
    (t.name || "").toLowerCase().includes(search.toLowerCase()),
  );
  const orgName = auth.currentUser?.organization?.name;

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-7xl">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[20px] font-semibold text-text-primary tracking-tight">
              Templates
            </h1>
            <p className="text-[12px] text-text-muted mt-0.5">
              {templates.length} template{templates.length !== 1 ? "s" : ""}
              {orgName ? ` · ${orgName}` : ""}
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary-base border-none rounded-xs font-sans text-[13px] font-semibold text-white cursor-pointer hover:bg-primary-hover transition-colors duration-100"
          >
            <PlusIcon /> New Template
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-1.5 bg-bg-surface border border-border-default rounded-xs px-2.5 py-1.5 w-64">
            <SearchIcon className="text-text-muted flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates…"
              className="flex-1 outline-none text-[13px] text-text-primary bg-transparent border-none"
            />
          </div>
          <div className="ml-auto flex items-center gap-0.5 bg-bg-surface border border-border-subtle rounded-xs p-0.5">
            <button
              onClick={() => setView("grid")}
              className={`w-7 h-7 flex items-center justify-center rounded-xs border-none cursor-pointer transition-colors duration-100 ${view === "grid" ? "bg-bg-hover" : "bg-transparent"}`}
              title="Grid view"
            >
              <GridIcon active={view === "grid"} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`w-7 h-7 flex items-center justify-center rounded-xs border-none cursor-pointer transition-colors duration-100 ${view === "list" ? "bg-bg-hover" : "bg-transparent"}`}
              title="List view"
            >
              <ListIcon active={view === "list"} />
            </button>
          </div>
        </div>

        {filtered.length === 0 && templates.length > 0 && (
          <div className="text-center py-16 text-text-muted text-[13px]">
            No templates match "{search}"
          </div>
        )}

        {/* Grid view */}
        {view === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map((template) => (
              <DocumentCard
                key={template._id}
                id={template._id}
                organizationId={template.organizationId}
                navigate={template._id}
                title={template.name}
                basePath="templates"
                modifiedAt={formatDate(template.modifiedAt)}
                actionsVisible={true}
                deleteDocumentHandler={deleteHandler}
                identifier="template"
              />
            ))}
          </div>
        )}

        {/* List view */}
        {view === "list" && (
          <div className="bg-bg-surface border border-border-subtle rounded-xs overflow-hidden">
            <div className="hidden sm:grid grid-cols-[1fr_140px_80px] px-4 py-2 border-b border-border-subtle bg-bg-subtle">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-text-muted">
                Name
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-text-muted">
                Modified
              </span>
              <span />
            </div>
            {filtered.length === 0 && templates.length === 0 && (
              <div className="text-center py-12 text-[13px] text-text-muted">
                No templates yet.{" "}
                <span
                  className="text-primary-base cursor-pointer font-medium"
                  onClick={handleCreate}
                >
                  Create one
                </span>
              </div>
            )}
            {filtered.map((template) => (
              <DocumentListRow
                key={template._id}
                id={template._id}
                organizationId={template.organizationId}
                navigate={template._id}
                title={template.name}
                basePath="templates"
                modifiedAt={formatDate(template.modifiedAt)}
                actionsVisible={true}
                deleteDocumentHandler={deleteHandler}
                identifier="template"
              />
            ))}
          </div>
        )}
      </div>

      {createOpen && (
        <CreateTemplate
          user={auth.currentUser}
          toggleDialog={() => setCreateOpen(false)}
        />
      )}
    </AppShell>
  );
}
