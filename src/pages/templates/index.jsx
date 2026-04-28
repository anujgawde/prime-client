import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { deleteTemplate, getTemplates } from "../../api/templates";
import { useAuthContext } from "../../context/AuthContext";
import CreateTemplate from "../../components/dialogs/templates/CreateTemplate";
import DocumentCard from "../../components/DocumentCard";
import AppShell from "../../components/layout/AppShell";
import { formatDate } from "../../utils/utils";
import { PlusIcon, SearchIcon } from "../../components/base/Icons";

export default function TemplatesPage() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [templates, setTemplates] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState("");

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
    (t.name || "").toLowerCase().includes(search.toLowerCase())
  );
  const orgName = auth.currentUser?.organization?.name;

  return (
    <AppShell>
      <div className="p-6 md:p-8">
        <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
          <div>
            <div className="text-xl font-semibold text-text-primary tracking-tight">
              Templates
            </div>
            <div className="text-xs text-text-muted mt-0.5">
              {templates.length} template{templates.length === 1 ? "" : "s"}
              {orgName ? ` · ${orgName}` : ""}
            </div>
          </div>
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-base border-none rounded-xs font-sans text-[13px] font-semibold text-white cursor-pointer hover:bg-primary-hover"
          >
            <PlusIcon /> New Template
          </button>
        </div>

        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <div className="flex items-center gap-1.5 bg-bg-surface border border-border-default rounded-xs px-2.5 py-1.5 w-60">
            <SearchIcon className="text-text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates…"
              className="flex-1 outline-none text-xs text-text-primary bg-transparent border-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
          <button
            onClick={handleCreate}
            className="border-[1.5px] border-dashed border-border-default rounded-xs p-4 cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[180px] bg-transparent hover:bg-bg-subtle transition-colors"
          >
            <div className="w-7 h-7 rounded-xs bg-bg-subtle flex items-center justify-center text-text-muted">
              <PlusIcon size={14} />
            </div>
            <span className="text-xs text-text-muted font-medium">New Template</span>
          </button>
        </div>

        {filtered.length === 0 && templates.length > 0 && (
          <div className="text-center py-12 text-text-muted text-sm">
            No templates match "{search}"
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
