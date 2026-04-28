import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";
import {
  demoteEmployee,
  getEmployeesByOrganization,
  getOrganization,
  inviteEmployee,
  promoteEmployee,
  removeEmployee,
} from "../../api/organizations";
import { deleteTemplate, getTemplates } from "../../api/templates";
import { deleteReport, getReports } from "../../api/reports";
import CreateOrganization from "../../components/dialogs/organizations/CreateOrganization";
import InviteEmployee from "../../components/dialogs/organizations/InviteEmployee";
import OrganizationSettings from "../../components/dialogs/organizations/OrganizationSettings";
import BaseConfirmation from "../../components/dialogs/base/BaseConfirmation";
import CreateReport from "../../components/dialogs/reports/CreateReport";
import BaseMenu from "../../components/base/BaseMenu";
import DocumentCard from "../../components/DocumentCard";
import AppShell from "../../components/layout/AppShell";
import UserAvatar, { getInitials } from "../../components/base/UserAvatar";
import { RoleBadge } from "../../components/base/Badge";
import { MoreIcon, PlusIcon } from "../../components/base/Icons";
import { formatDate } from "../../utils/utils";

const TABS = [
  { id: "directory", label: "Employee Directory" },
  { id: "reports", label: "Reports" },
  { id: "templates", label: "Templates" },
];

const ROLE_LABEL = {
  "super-admin": "Super-Admin",
  admin: "Admin",
  member: "Member",
};

const userLevels = { "super-admin": 3, admin: 2, member: 1 };

export default function MyOrganizationPage() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [tab, setTab] = useState("directory");
  const [organizationData, setOrganizationData] = useState();
  const [createOrganizationOpen, setCreateOrganizationOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isInviteEmployeeOpen, setIsInviteEmployeeOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState({});
  const [organizationTemplates, setOrganizationTemplates] = useState([]);
  const [organizationReports, setOrganizationReports] = useState([]);
  const [createReportOpen, setCreateReportOpen] = useState(false);

  const userRole = auth.currentUser?.organization?.roles;
  const canManage = userLevels[userRole] > 1;

  const deleteTemplateHandler = async (templateId) => {
    await deleteTemplate(templateId, auth.currentUser);
    setOrganizationTemplates(organizationTemplates.filter((e) => e._id !== templateId));
  };

  const deleteReportHandler = async (reportId) => {
    await deleteReport(reportId);
    setOrganizationReports(organizationReports.filter((e) => e._id !== reportId));
  };

  const fetchData = async () => {
    if (!auth.currentUser?.organization) return;
    const orgId = auth.currentUser.organization.id;
    const userOrg = await getOrganization(orgId);
    setOrganizationData(userOrg);
    setEmployees(
      await getEmployeesByOrganization({ organizationId: orgId, userId: auth.currentUser._id })
    );
    setOrganizationTemplates(await getTemplates({ organizationId: orgId }));
    setOrganizationReports(await getReports({ organizationId: orgId }));
  };

  const inviteEmployeeHandler = async (employeeEmail) => {
    try {
      await inviteEmployee({
        organizationId: auth.currentUser.organization.id,
        inviterUserId: auth.currentUser._id,
        email: employeeEmail,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeEmployeeHandler = async (id, employeeOrg, removerOrg) => {
    await removeEmployee({
      employeeId: id,
      employeeOrganization: employeeOrg,
      removerOrganization: removerOrg,
    });
    setEmployees(employees.filter((e) => e._id !== id));
  };

  const promoteEmployeeHandler = async (id, employeeOrg, promoterOrg) => {
    const newRole = employeeOrg.roles === "member" ? "admin" : "super-admin";
    await promoteEmployee({
      employeeId: id,
      employeeOrganization: employeeOrg,
      promoterOrganization: promoterOrg,
      newRole,
    });
    setEmployees((prev) =>
      prev.map((e) =>
        e._id === id ? { ...e, organization: { ...e.organization, roles: newRole } } : e
      )
    );
  };

  const demoteEmployeeHandler = async (id, employeeOrg, demoterOrg) => {
    const newRole = employeeOrg.roles === "super-admin" ? "admin" : "member";
    await demoteEmployee({
      employeeId: id,
      employeeOrganization: employeeOrg,
      demoterOrganization: demoterOrg,
      newRole,
    });
    setEmployees((prev) =>
      prev.map((e) =>
        e._id === id ? { ...e, organization: { ...e.organization, roles: newRole } } : e
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!organizationData) {
    return (
      <AppShell>
        <div className="h-full flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-14 h-14 mx-auto mb-4 bg-primary-subtle border border-primary-border rounded-md flex items-center justify-center text-primary-base">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="3" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="2" y="16" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="16" y="16" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="5" y1="16" x2="5" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="19" y1="16" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="font-semibold text-base text-text-primary mb-2">No organization yet</div>
            <div className="text-[13px] text-text-secondary mb-5 leading-relaxed">
              You're not part of an organization. Create one to invite team members and share templates.
            </div>
            <button
              onClick={() => setCreateOrganizationOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary-base border-none rounded-xs font-sans text-[13px] font-semibold text-white cursor-pointer hover:bg-primary-hover"
            >
              <PlusIcon /> Create Organization
            </button>
          </div>
        </div>
        {createOrganizationOpen && (
          <CreateOrganization
            user={auth.currentUser}
            toggleDialog={() => setCreateOrganizationOpen(false)}
          />
        )}
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="p-6 md:p-8">
        <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="text-xl font-semibold text-text-primary tracking-tight">
                {organizationData.name}
              </div>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-1.5 hover:bg-bg-hover rounded-xs border-none bg-transparent cursor-pointer text-text-muted"
                title="Organization settings"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 1v1.5M7 11.5V13M11.2 2.8l-1.1 1.1M3.9 10.1l-1.1 1.1M13 7h-1.5M2.5 7H1M11.2 11.2l-1.1-1.1M3.9 3.9L2.8 2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="text-xs text-text-muted mt-0.5">
              {employees.length} member{employees.length === 1 ? "" : "s"}
            </div>
          </div>
          {canManage && (
            <button
              onClick={() => setIsInviteEmployeeOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-base border-none rounded-xs font-sans text-[13px] font-semibold text-white cursor-pointer hover:bg-primary-hover"
            >
              <PlusIcon /> Invite Member
            </button>
          )}
        </div>

        <div className="flex gap-0 border-b border-border-subtle mb-5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 border-none bg-transparent cursor-pointer font-sans text-[13px] -mb-px ${
                tab === t.id
                  ? "border-b-2 border-primary-base font-semibold text-primary-base"
                  : "border-b-2 border-transparent text-text-secondary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "directory" && (
          <div className="bg-bg-surface border border-border-subtle rounded-xs overflow-hidden">
            <div className="hidden md:grid grid-cols-[2fr_1.2fr_0.7fr_80px] px-4 py-2 border-b border-border-subtle bg-bg-subtle">
              {["Member", "Role", "Joined", ""].map((h) => (
                <div key={h} className="text-[10px] font-semibold tracking-wider uppercase text-text-muted">
                  {h}
                </div>
              ))}
            </div>
            {employees.map((emp, i) => {
              const role = ROLE_LABEL[emp.organization.roles] || "Member";
              const initials = getInitials(
                emp.basicInformation?.firstName,
                emp.basicInformation?.lastName
              );
              const canModify = userLevels[userRole] >= userLevels[emp.organization.roles];
              return (
                <div
                  key={emp._id}
                  className={`grid grid-cols-[1fr_auto] md:grid-cols-[2fr_1.2fr_0.7fr_80px] px-4 py-3 items-center gap-3 ${
                    i < employees.length - 1 ? "border-b border-border-subtle" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <UserAvatar initials={initials} size={28} role={role} />
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium text-text-primary truncate">
                        {emp.basicInformation.firstName} {emp.basicInformation.lastName}
                      </div>
                      <div className="text-[11px] text-text-muted truncate">
                        {emp.basicInformation.email}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <RoleBadge role={role} />
                  </div>
                  <div className="hidden md:block text-xs text-text-muted">
                    {emp.organization.joinedAt ? formatDate(emp.organization.joinedAt) : "—"}
                  </div>
                  <div className="flex justify-end">
                    {canModify && (
                      <BaseMenu
                        trigger={
                          <span className="w-7 h-7 flex items-center justify-center rounded-xs text-text-muted hover:text-text-primary hover:bg-bg-hover">
                            <MoreIcon />
                          </span>
                        }
                      >
                        <button
                          disabled={emp.organization.roles === "super-admin"}
                          className="block w-full text-left px-3 py-2 text-[13px] hover:bg-bg-hover border-none bg-transparent cursor-pointer text-text-primary disabled:opacity-40 disabled:cursor-not-allowed"
                          onClick={() =>
                            setConfirmationDialog({
                              title: "Promote Employee",
                              content: `Promote ${emp.basicInformation.firstName} to a higher role?`,
                              primaryAction: () => {
                                promoteEmployeeHandler(emp._id, emp.organization, auth.currentUser.organization);
                                setConfirmationDialog({});
                              },
                              secondaryAction: () => setConfirmationDialog({}),
                              primaryButtonText: "Promote",
                              secondaryButtonText: "Cancel",
                            })
                          }
                        >
                          Promote
                        </button>
                        <button
                          disabled={emp.organization.roles === "member"}
                          className="block w-full text-left px-3 py-2 text-[13px] hover:bg-bg-hover border-none bg-transparent cursor-pointer text-text-primary disabled:opacity-40 disabled:cursor-not-allowed"
                          onClick={() =>
                            setConfirmationDialog({
                              title: "Demote Employee",
                              content: `Demote ${emp.basicInformation.firstName}?`,
                              primaryAction: () => {
                                demoteEmployeeHandler(emp._id, emp.organization, auth.currentUser.organization);
                                setConfirmationDialog({});
                              },
                              secondaryAction: () => setConfirmationDialog({}),
                              primaryButtonText: "Demote",
                              secondaryButtonText: "Cancel",
                            })
                          }
                        >
                          Demote
                        </button>
                        <button
                          className="block w-full text-left px-3 py-2 text-[13px] hover:bg-bg-hover border-none bg-transparent cursor-pointer text-error-text"
                          onClick={() =>
                            setConfirmationDialog({
                              title: "Remove Employee",
                              content: `Remove ${emp.basicInformation.firstName} from the organization?`,
                              primaryAction: () => {
                                removeEmployeeHandler(emp._id, emp.organization, auth.currentUser.organization);
                                setConfirmationDialog({});
                              },
                              secondaryAction: () => setConfirmationDialog({}),
                              primaryButtonText: "Remove",
                              secondaryButtonText: "Cancel",
                            })
                          }
                        >
                          Remove
                        </button>
                      </BaseMenu>
                    )}
                  </div>
                </div>
              );
            })}
            {employees.length === 0 && (
              <div className="text-center py-12 text-text-muted text-sm">No members yet</div>
            )}
          </div>
        )}

        {tab === "templates" && (
          <div>
            {canManage && (
              <div className="mb-4">
                <button
                  onClick={() =>
                    navigate(`/templates/${uuidv4()}?collab=yjs`, {
                      state: { organizationId: auth.currentUser.organization.id },
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-default bg-bg-surface text-text-primary rounded-xs text-xs font-medium cursor-pointer hover:bg-bg-hover"
                >
                  <PlusIcon /> Build Template
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {organizationTemplates.map((t) => (
                <DocumentCard
                  id={t._id}
                  navigate={t._id}
                  title={t.name}
                  actionsVisible={canManage}
                  basePath="templates"
                  modifiedAt={formatDate(t.modifiedAt)}
                  deleteDocumentHandler={() => deleteTemplateHandler(t._id)}
                  key={t._id}
                  identifier="template"
                />
              ))}
              {organizationTemplates.length === 0 && (
                <div className="col-span-full text-center py-12 text-text-muted text-sm">
                  No templates yet
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "reports" && (
          <div>
            {canManage && (
              <div className="mb-4">
                <button
                  onClick={() => setCreateReportOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-default bg-bg-surface text-text-primary rounded-xs text-xs font-medium cursor-pointer hover:bg-bg-hover"
                >
                  <PlusIcon /> Create Report
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {organizationReports.map((r) => (
                <DocumentCard
                  id={r._id}
                  navigate={`${r.templateId}/${r._id}`}
                  title={r.name}
                  actionsVisible={canManage}
                  basePath="reports"
                  modifiedAt={formatDate(r.modifiedAt)}
                  deleteDocumentHandler={() => deleteReportHandler(r._id)}
                  key={r._id}
                  identifier="report"
                />
              ))}
              {organizationReports.length === 0 && (
                <div className="col-span-full text-center py-12 text-text-muted text-sm">
                  No reports yet
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isInviteEmployeeOpen && (
        <InviteEmployee
          inviteEmployee={inviteEmployeeHandler}
          toggleDialog={() => setIsInviteEmployeeOpen(false)}
        />
      )}
      {createReportOpen && (
        <CreateReport
          user={auth.currentUser}
          isOpen={createReportOpen}
          toggleDialog={() => setCreateReportOpen(false)}
        />
      )}
      {isSettingsOpen && (
        <OrganizationSettings
          user={auth.currentUser}
          organization={organizationData}
          toggleDialog={() => setIsSettingsOpen(false)}
        />
      )}
      {confirmationDialog.title && (
        <BaseConfirmation
          primaryAction={confirmationDialog.primaryAction}
          secondaryAction={() => setConfirmationDialog({})}
          primaryButtonText={confirmationDialog.primaryButtonText}
          secondaryButtonText={confirmationDialog.secondaryButtonText}
          content={confirmationDialog.content}
          title={confirmationDialog.title}
        />
      )}
    </AppShell>
  );
}
