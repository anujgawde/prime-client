import { useEffect, useState } from "react";
import { formatDate } from "../../utils/utils";
import { useAuthContext } from "../../context/AuthContext";
import { deleteReport, getAllReports } from "../../api/reports";
import CreateReport from "../../components/dialogs/reports/CreateReport";
import DocumentCard from "../../components/DocumentCard";
import AppShell from "../../components/layout/AppShell";
import { PlusIcon, SearchIcon } from "../../components/base/Icons";

export default function ReportsPage() {
  const auth = useAuthContext();
  const [reports, setReports] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState("");

  const fetchReports = async () => {
    const response = await getAllReports(auth.currentUser._id);
    setReports(response || []);
  };

  const deleteHandler = async (reportId) => {
    await deleteReport(reportId);
    setReports(reports.filter((r) => r._id !== reportId));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filtered = reports.filter((r) =>
    (r.name || "").toLowerCase().includes(search.toLowerCase())
  );
  const orgName = auth.currentUser?.organization?.name;

  return (
    <AppShell>
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
          <div>
            <div className="text-xl font-semibold text-text-primary tracking-tight">
              Reports
            </div>
            <div className="text-xs text-text-muted mt-0.5">
              {reports.length} report{reports.length === 1 ? "" : "s"}
              {orgName ? ` · ${orgName}` : ""}
            </div>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-base border-none rounded-xs font-sans text-[13px] font-semibold text-white cursor-pointer hover:bg-primary-hover"
          >
            <PlusIcon /> New Report
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <div className="flex items-center gap-1.5 bg-bg-surface border border-border-default rounded-xs px-2.5 py-1.5 w-60">
            <SearchIcon className="text-text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports…"
              className="flex-1 outline-none text-xs text-text-primary bg-transparent border-none"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((report) => (
            <DocumentCard
              key={report._id}
              id={report._id}
              organizationId={report.organizationId}
              navigate={`${report.templateId}/${report._id}`}
              title={report.name}
              basePath="reports"
              modifiedAt={formatDate(report.modifiedAt)}
              actionsVisible={true}
              deleteDocumentHandler={() => deleteHandler(report._id)}
              identifier="report"
            />
          ))}
          {/* New report card */}
          <button
            onClick={() => setCreateOpen(true)}
            className="border-[1.5px] border-dashed border-border-default rounded-xs p-4 cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[180px] bg-transparent hover:bg-bg-subtle transition-colors"
          >
            <div className="w-7 h-7 rounded-xs bg-bg-subtle flex items-center justify-center text-text-muted">
              <PlusIcon size={14} />
            </div>
            <span className="text-xs text-text-muted font-medium">New Report</span>
          </button>
        </div>

        {filtered.length === 0 && reports.length > 0 && (
          <div className="text-center py-12 text-text-muted text-sm">
            No reports match "{search}"
          </div>
        )}
      </div>

      {createOpen && (
        <CreateReport
          user={auth.currentUser}
          documents={reports}
          isOpen={createOpen}
          toggleDialog={() => setCreateOpen(false)}
        />
      )}
    </AppShell>
  );
}
