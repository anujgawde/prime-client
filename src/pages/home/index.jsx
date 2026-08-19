import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecentReports } from "../../api/reports";
import { getMostUsedTemplates } from "../../api/templates";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../utils/utils";
import AppShell from "../../components/layout/AppShell";
import {
  ReportsIcon,
  TemplatesIcon,
  OrgIcon,
  PlusIcon,
} from "../../components/base/Icons";
import CreateReport from "../../components/dialogs/reports/CreateReport";

function DocRow({ icon: Icon, title, meta, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 hover:bg-bg-hover cursor-pointer rounded-xs group transition-colors duration-100"
    >
      <div className="w-7 h-7 rounded-xs bg-bg-subtle border border-border-subtle flex items-center justify-center text-text-muted flex-shrink-0">
        <Icon size={13} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-text-primary truncate">
          {title}
        </div>
      </div>
      <div className="text-[11px] text-text-muted whitespace-nowrap flex-shrink-0">
        {meta}
      </div>
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between px-4 pt-6 pb-1.5">
      <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted">
        {title}
      </span>
      {action}
    </div>
  );
}

export default function HomePage() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [recentReports, setRecentReports] = useState([]);
  const [topTemplates, setTopTemplates] = useState([]);
  const [createReportOpen, setCreateReportOpen] = useState(false);

  const firstName = auth.currentUser?.basicInformation?.firstName || "there";
  const orgName = auth.currentUser?.organization?.name;

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (!auth.currentUser?._id) return;
    const userId = auth.currentUser._id;
    getRecentReports(userId)
      .then(setRecentReports)
      .catch(() => {});
    getMostUsedTemplates(userId)
      .then(setTopTemplates)
      .catch(() => {});
  }, [auth.currentUser]);

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-10">
        {/* Greeting */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[22px] font-semibold text-text-primary tracking-tight leading-tight">
              {getGreeting()}, {firstName}
            </h1>
            <p className="text-[13px] text-text-muted mt-1">
              {today}
              {orgName ? ` · ${orgName}` : ""}
            </p>
          </div>
          <button
            onClick={() => setCreateReportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary-base border-none rounded-xs font-sans text-[13px] font-semibold text-white cursor-pointer hover:bg-primary-hover transition-colors duration-100 flex-shrink-0"
          >
            <PlusIcon /> New Report
          </button>
        </div>

        {/* Quick actions row */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => navigate("/templates")}
            className="flex-1 flex items-center gap-2.5 px-4 py-3 bg-bg-surface border border-border-subtle rounded-xs text-left hover:bg-bg-hover cursor-pointer transition-colors duration-100"
          >
            <div className="w-7 h-7 bg-bg-subtle rounded-xs flex items-center justify-center text-text-muted flex-shrink-0">
              <TemplatesIcon size={13} />
            </div>
            <div>
              <div className="text-[13px] font-medium text-text-primary">
                Templates
              </div>
              <div className="text-[11px] text-text-muted">
                Browse and manage
              </div>
            </div>
          </button>
          <button
            onClick={() => navigate("/organization")}
            className="flex-1 flex items-center gap-2.5 px-4 py-3 bg-bg-surface border border-border-subtle rounded-xs text-left hover:bg-bg-hover cursor-pointer transition-colors duration-100"
          >
            <div className="w-7 h-7 bg-bg-subtle rounded-xs flex items-center justify-center text-text-muted flex-shrink-0">
              <OrgIcon size={13} />
            </div>
            <div>
              <div className="text-[13px] font-medium text-text-primary">
                Organization
              </div>
              <div className="text-[11px] text-text-muted">
                Members & shared docs
              </div>
            </div>
          </button>
        </div>

        {/* Recent Reports */}
        <div className="bg-bg-surface border border-border-subtle rounded-xs overflow-hidden">
          <SectionHeader
            title="Recent Reports"
            action={
              <button
                onClick={() => navigate("/reports")}
                className="text-[12px] text-text-muted hover:text-text-primary border-none bg-transparent cursor-pointer transition-colors duration-100"
              >
                View all →
              </button>
            }
          />
          {recentReports.length === 0 ? (
            <div className="px-4 py-10 text-center text-[13px] text-text-muted">
              No reports yet.{" "}
              <span
                className="text-primary-base cursor-pointer font-medium"
                onClick={() => setCreateReportOpen(true)}
              >
                Create your first report
              </span>
            </div>
          ) : (
            <div className="py-1">
              {recentReports.slice(0, 8).map((r) => (
                <DocRow
                  key={r._id}
                  icon={ReportsIcon}
                  title={r.name}
                  meta={`Reports · ${formatDate(r.modifiedAt)}`}
                  onClick={() =>
                    navigate(`/reports/${r.templateId}/${r._id}?collab=yjs`)
                  }
                />
              ))}
            </div>
          )}

          {/* Top Templates below a divider */}
          {topTemplates.length > 0 && (
            <>
              <div className="border-t border-border-subtle" />
              <SectionHeader
                title="Most Used Templates"
                action={
                  <button
                    onClick={() => navigate("/templates")}
                    className="text-[12px] text-text-muted hover:text-text-primary border-none bg-transparent cursor-pointer transition-colors duration-100"
                  >
                    View all →
                  </button>
                }
              />
              <div className="py-1 pb-2">
                {topTemplates.slice(0, 5).map((t) => (
                  <DocRow
                    key={t._id}
                    icon={TemplatesIcon}
                    title={t.name}
                    meta={`Templates · ${formatDate(t.modifiedAt)}`}
                    onClick={() => navigate(`/templates/${t._id}?collab=yjs`)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {createReportOpen && (
        <CreateReport
          user={auth.currentUser}
          isOpen={createReportOpen}
          toggleDialog={() => setCreateReportOpen(false)}
        />
      )}
    </AppShell>
  );
}
