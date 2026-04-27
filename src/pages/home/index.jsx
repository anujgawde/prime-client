import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getRecentReports } from "../../api/reports";
import { getMostUsedTemplates } from "../../api/templates";
import { getUserDocsAggregate } from "../../api/users";
import { useAuthContext } from "../../context/AuthContext";
import { formatDate } from "../../utils/utils";
import AppShell from "../../components/layout/AppShell";
import { ReportsIcon, TemplatesIcon, OrgIcon, PlusIcon } from "../../components/base/Icons";
import CreateReport from "../../components/dialogs/reports/CreateReport";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatCard({ label, value, Icon }) {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xs p-4 flex-1 min-w-0">
      <div className="flex items-start justify-between mb-2.5">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-text-muted">
          {label}
        </span>
        <div className="w-[26px] h-[26px] bg-primary-subtle rounded-xs flex items-center justify-center text-primary-base">
          <Icon size={13} />
        </div>
      </div>
      <div className="text-[26px] font-bold text-text-primary tracking-tight leading-none">
        {value ?? "—"}
      </div>
    </div>
  );
}

export default function HomePage() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [recentReports, setRecentReports] = useState([]);
  const [topTemplates, setTopTemplates] = useState([]);
  const [chartData, setChartData] = useState();
  const [chartOptions, setChartOptions] = useState();
  const [createReportOpen, setCreateReportOpen] = useState(false);

  const firstName = auth.currentUser?.basicInformation?.firstName || "there";

  const fetchAggregate = async (userId) => {
    const aggregate = await getUserDocsAggregate(userId);
    const labels = aggregate?.data.map((i) => i.month);
    const documentCounts = aggregate?.data.map((i) => i.documentCount);
    const templateCounts = aggregate?.data.map((i) => i.templateCount);

    setChartData({
      labels,
      datasets: [
        {
          label: "Reports",
          data: documentCounts,
          backgroundColor: "#8C60F350",
          borderColor: "#8C60F3",
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: "Templates",
          data: templateCounts,
          backgroundColor: "#c8b5f550",
          borderColor: "#c8b5f5",
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    });
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top", labels: { font: { family: "DM Sans", size: 11 } } },
        title: { display: false },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: "DM Sans", size: 11 } } },
        y: { ticks: { font: { family: "DM Sans", size: 11 } } },
      },
    });
  };

  useEffect(() => {
    if (!auth.currentUser?._id) return;
    const userId = auth.currentUser._id;
    getRecentReports(userId).then(setRecentReports).catch(() => {});
    getMostUsedTemplates(userId).then(setTopTemplates).catch(() => {});
    fetchAggregate(userId).catch(() => {});
  }, [auth.currentUser]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const orgName = auth.currentUser?.organization?.name;

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="text-[22px] font-semibold text-text-primary tracking-tight mb-1">
            Welcome back, {firstName}
          </div>
          <div className="text-[13px] text-text-muted">
            {today}{orgName ? ` · ${orgName}` : ""}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <StatCard label="Total Reports" value={recentReports?.length} Icon={ReportsIcon} />
          <StatCard label="Templates" value={topTemplates?.length} Icon={TemplatesIcon} />
          <StatCard label="Team Members" value={auth.currentUser?.organization?.memberCount} Icon={OrgIcon} />
          <StatCard label="This Month" value={chartData?.datasets?.[0]?.data?.slice(-1)[0]} Icon={ReportsIcon} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          {/* Recent Reports */}
          <div className="bg-bg-surface border border-border-subtle rounded-xs">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
              <div className="font-semibold text-[13px] text-text-primary">Recent Reports</div>
            </div>
            <div className="overflow-y-auto max-h-[400px]">
              {recentReports?.length === 0 && (
                <div className="text-center py-12 text-text-muted text-[13px]">No reports yet</div>
              )}
              {recentReports?.map((r) => (
                <div
                  key={r._id}
                  onClick={() => navigate(`/reports/${r.templateId}/${r._id}`)}
                  className="px-5 py-3 hover:bg-bg-hover cursor-pointer border-b border-border-subtle last:border-b-0"
                >
                  <div className="font-medium text-[13px] text-text-primary flex items-center gap-2">
                    <span>{r.name}</span>
                    {r.organizationId && (
                      <span className="text-text-muted">
                        <OrgIcon size={12} />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Updated {formatDate(r.modifiedAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Most Used Templates */}
          <div className="bg-bg-surface border border-border-subtle rounded-xs">
            <div className="px-5 py-4 border-b border-border-subtle">
              <div className="font-semibold text-[13px] text-text-primary">Most Used Templates</div>
            </div>
            <div className="overflow-y-auto max-h-[400px]">
              {topTemplates?.length === 0 && (
                <div className="text-center py-12 text-text-muted text-[13px]">No templates yet</div>
              )}
              {topTemplates?.map((t) => (
                <div
                  key={t._id}
                  onClick={() => navigate(`/templates/${t._id}`)}
                  className="px-5 py-3 hover:bg-bg-hover cursor-pointer border-b border-border-subtle last:border-b-0"
                >
                  <div className="font-medium text-[13px] text-text-primary flex items-center gap-2">
                    <span>{t.name}</span>
                    {t.organizationId && (
                      <span className="text-text-muted">
                        <OrgIcon size={12} />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Updated {formatDate(t.modifiedAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        {chartData && chartOptions && (
          <div className="mt-4 bg-bg-surface border border-border-subtle rounded-xs p-5">
            <div className="font-semibold text-[13px] text-text-primary mb-4">
              Activity · Past 12 months
            </div>
            <div className="h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="mt-4 bg-bg-surface border border-border-subtle rounded-xs p-5">
          <div className="font-semibold text-xs text-text-muted uppercase tracking-wider mb-3">
            Quick Actions
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCreateReportOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-primary-base bg-primary-base text-white font-sans text-xs font-medium cursor-pointer hover:bg-primary-hover"
            >
              <PlusIcon /> New Report
            </button>
            <button
              onClick={() => navigate(`/templates/new-${Date.now()}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-border-default bg-bg-surface text-text-secondary font-sans text-xs font-medium cursor-pointer hover:bg-bg-hover"
            >
              <PlusIcon /> New Template
            </button>
            <button
              onClick={() => navigate("/organization")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-border-default bg-bg-surface text-text-secondary font-sans text-xs font-medium cursor-pointer hover:bg-bg-hover"
            >
              Invite Member
            </button>
          </div>
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
