import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

import CreateOrganization from "../../components/dialogs/organizations/CreateOrganization";
import {
  demoteEmployee,
  getEmployeesByOrganization,
  getOrganization,
  inviteEmployee,
  promoteEmployee,
  removeEmployee,
} from "../../api/organizations";
import { deleteTemplate, getTemplates } from "../../api/templates";
import InviteEmployee from "../../components/dialogs/organizations/InviteEmployee";
import OrganizationSettings from "../../components/dialogs/organizations/OrganizationSettings";
import BaseMenu from "../../components/base/BaseMenu";
import BaseConfirmation from "../../components/dialogs/base/BaseConfirmation";
import DocumentCard from "../../components/DocumentCard";
import { formatDate } from "../../utils/utils";
import { deleteReport, getReports } from "../../api/reports";
import CreateReport from "../../components/dialogs/reports/CreateReport";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function MyOrganizationPage() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [organizationData, setOrganizationData] = useState();
  const [createOrganizationOpen, setCreateOrganizationOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isInviteEmployeeOpen, setIsInviteEmployeeOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState({
    title: "",
    primaryButtonText: "",
    secondaryButtonText: "",
    content: "",
    primaryAction: () => {},
    secondaryAction: () => {},
  });
  const [organizationTemplates, setOrganizationTemplates] = useState([]);
  const [organizationReports, setOrganizationReports] = useState([]);
  const [createReportOpen, setCreateReportOpen] = useState();

  const userLevels = {
    "super-admin": 3,
    admin: 2,
    member: 1,
  };

  const deleteTemplateHandler = async (templateId) => {
    await deleteTemplate(templateId, auth.currentUser);
    setOrganizationTemplates(
      organizationTemplates.filter((element) => element._id !== templateId)
    );
  };

  const deletReportHandler = async (reportId) => {
    await deleteReport(reportId);
    setOrganizationReports(
      organizationReports.filter((element) => element._id !== reportId)
    );
  };

  const getOrganizationEmployees = async () => {
    if (!auth.currentUser.organization) return;
    const organizationEmployees = await getEmployeesByOrganization({
      organizationId: auth.currentUser.organization.id,
      userId: auth.currentUser._id,
    });
    setEmployees(organizationEmployees);
  };

  const getOrganizationTemplates = async () => {
    const fetchedOrganizationTemplates = await getTemplates({
      organizationId: auth.currentUser.organization.id,
    });
    setOrganizationTemplates(fetchedOrganizationTemplates);
  };

  const getOrganizationReports = async () => {
    const fetchedOrganizationReports = await getReports({
      organizationId: auth.currentUser.organization.id,
    });
    setOrganizationReports(fetchedOrganizationReports);
  };

  const getUserOrganization = async () => {
    // Fetching user's organization
    if (!auth.currentUser.organization) return;
    const userOrganization = await getOrganization(
      auth.currentUser.organization.id
    );
    setOrganizationData(userOrganization);

    // Get employees associated with the organization
    getOrganizationEmployees();

    // Get templates associated with the organization
    getOrganizationTemplates();

    // Get reports associated with the organization
    getOrganizationReports();
  };

  const inviteEmployeeHandler = async (employeeEmail) => {
    try {
      await inviteEmployee({
        organizationId: auth.currentUser.organization.id,
        inviterUserId: auth.currentUser._id,
        email: employeeEmail,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeEmployeeHandler = async (
    employeeId,
    employeeOrganization,
    removerOrganization
  ) => {
    await removeEmployee({
      employeeId,
      employeeOrganization,
      removerOrganization,
    });

    setEmployees(employees.filter((element) => element._id !== employeeId));
  };

  const promoteEmployeeHandler = async (
    employeeId,
    employeeOrganization,
    promoterOrganization
  ) => {
    const newRole =
      employeeOrganization.roles === "member" ? "admin" : "super-admin";

    await promoteEmployee({
      employeeId,
      employeeOrganization,
      promoterOrganization,
      newRole,
    });

    setEmployees((prevData) =>
      prevData.map((employeeData) =>
        employeeData._id === employeeId
          ? {
              ...employeeData,
              organization: {
                ...employeeData.organization,
                roles: newRole,
              },
            }
          : employeeData
      )
    );
  };

  const demoteEmployeeHandler = async (
    employeeId,
    employeeOrganization,
    demoterOrganization
  ) => {
    const newRole =
      employeeOrganization.roles === "super-admin" ? "admin" : "member";

    await demoteEmployee({
      employeeId,
      employeeOrganization,
      demoterOrganization,
      newRole,
    });

    setEmployees((prevData) =>
      prevData.map((employeeData) =>
        employeeData._id === employeeId
          ? {
              ...employeeData,
              organization: {
                ...employeeData.organization,
                roles: newRole,
              },
            }
          : employeeData
      )
    );
  };

  useEffect(() => {
    getUserOrganization();
  }, []);

  {
    return organizationData ? (
      <div className=" py-8">
        <div className="flex px-8 items-center space-x-4">
          <p className="text-4xl leading-none text-primary font-black">
            {organizationData.name}
          </p>
          <button
            onClick={() => {
              setIsSettingsOpen(true);
            }}
            className="border-none outline-none bg-white p-2 rounded-full"
          >
            <img src="/icons/base/settings.svg" className="h-6 w-6" />
          </button>
        </div>
        {/* Title */}
        <div className="px-8 space-y-2 py-4">
          <div className="flex items-center space-x-4">
            <p className="text-2xl">Employees</p>
            {userLevels[auth.currentUser.organization.roles] > 1 && (
              <button
                onClick={() => setIsInviteEmployeeOpen(true)}
                className="font-semibold text-primary text-xs outline-none border-primary rounded-full"
              >
                Invite
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {employees.map((employee) => (
              <div
                key={employee._id}
                className="bg-white rounded-xl p-4 shrink-0"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold">
                    {employee.basicInformation.lastName},{" "}
                    {employee.basicInformation.firstName}
                  </p>

                  {userLevels[auth.currentUser.organization.roles] >=
                    userLevels[employee.organization.roles] && (
                    <BaseMenu iconSrc="/icons/base/ellipsis.svg">
                      <button
                        disabled={employee.organization.roles === "super-admin"}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none text-black disabled:opacity-40 disabled:hover:bg-white"
                        onClick={() => {
                          setConfirmationDialog({
                            title: "Promote Employee",
                            content:
                              "Are you sure you want to promote this employee?",
                            primaryAction: () => {
                              promoteEmployeeHandler(
                                employee._id,
                                employee.organization,
                                auth.currentUser.organization
                              );
                              setConfirmationDialog({});
                            },
                            secondaryAction: () => {
                              setConfirmationDialog({});
                            },
                            primaryButtonText: "Confirm",
                            secondaryButtonText: "Cancel",
                          });
                        }}
                      >
                        Promote
                      </button>
                      <button
                        disabled={employee.organization.roles === "member"}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none text-black disabled:opacity-40 disabled:hover:bg-white"
                        onClick={() => {
                          setConfirmationDialog({
                            title: "Demote Employee",
                            content:
                              "Are you sure you want to demote this employee?",
                            primaryAction: () => {
                              demoteEmployeeHandler(
                                employee._id,
                                employee.organization,
                                auth.currentUser.organization
                              );
                              setConfirmationDialog({});
                            },
                            secondaryAction: () => {
                              setConfirmationDialog({});
                            },
                            primaryButtonText: "Confirm",
                            secondaryButtonText: "Cancel",
                          });
                        }}
                      >
                        Demote
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none text-danger"
                        onClick={() =>
                          setConfirmationDialog({
                            title: "Remove Employee",
                            content:
                              "Are you sure you want to remove this employee?",
                            primaryAction: () => {
                              removeEmployeeHandler(
                                employee._id,
                                employee.organization,
                                auth.currentUser.organization
                              );
                              setConfirmationDialog({});
                            },
                            secondaryAction: () => {
                              setConfirmationDialog({});
                            },
                            primaryButtonText: "Confirm",
                            secondaryButtonText: "Cancel",
                          })
                        }
                      >
                        Remove
                      </button>
                    </BaseMenu>
                  )}
                </div>
                <p className="text-sm font-semibold">
                  {employee.organization.roles === "super-admin"
                    ? "Owner"
                    : employee.organization.roles === "admin"
                    ? "Manager"
                    : "Employee"}
                </p>

                <div className="py-2">
                  <div></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 space-y-2 py-4">
          <div className="flex items-center space-x-4">
            <p className="text-2xl">Templates</p>
            {userLevels[auth.currentUser.organization.roles] > 1 && (
              <button
                onClick={() => {
                  navigate(`/templates/${uuidv4()}`, {
                    state: {
                      organizationId: auth.currentUser.organization.id,
                    },
                  });
                }}
                className="font-semibold text-primary text-xs outline-none border-primary rounded-full"
              >
                Build
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {organizationTemplates.map((organizationTemplate) => (
              <DocumentCard
                id={organizationTemplate._id}
                navigate={`${organizationTemplate._id}`}
                title={organizationTemplate.name}
                actionsVisible={
                  userLevels[auth.currentUser.organization.roles] > 1
                }
                basePath="templates"
                modifiedAt={formatDate(organizationTemplate.modifiedAt)}
                deleteDocumentHandler={() =>
                  deleteTemplateHandler(organizationTemplate._id)
                }
                key={organizationTemplate._id}
                identifier="template"
              />
            ))}
          </div>
        </div>

        <div className="px-8 space-y-2 py-4">
          <div className="flex items-center space-x-4">
            <p className="text-2xl">Reports</p>
            {userLevels[auth.currentUser.organization.roles] > 1 && (
              <button
                onClick={() => setCreateReportOpen(true)}
                className="font-semibold text-primary text-xs outline-none border-primary rounded-full"
              >
                Create
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {organizationReports.map((organizationReport) => (
              <DocumentCard
                id={organizationReport._id}
                navigate={`${organizationReport.templateId}/${organizationReport._id}`}
                title={organizationReport.name}
                actionsVisible={
                  userLevels[auth.currentUser.organization.roles] > 1
                }
                basePath="reports"
                modifiedAt={formatDate(organizationReport.modifiedAt)}
                deleteDocumentHandler={() =>
                  deletReportHandler(organizationReport._id)
                }
                key={organizationReport._id}
                identifier="report"
              />
            ))}
          </div>
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
      </div>
    ) : (
      // This section will only be displayed when there is no organization associated with user. This also include dialogs.
      <div className="h-full items-center flex justify-center">
        <div className="">
          <p className="text-center">
            You are not a part of any organization yet. Do you want to{" "}
            <span
              onClick={() => setCreateOrganizationOpen(true)}
              className="text-primary font-semibold hover: cursor-pointer"
            >
              create an organization
            </span>
            ?
          </p>
        </div>
        {createOrganizationOpen && (
          <CreateOrganization
            user={auth.currentUser}
            toggleDialog={() => setCreateOrganizationOpen(false)}
          />
        )}
      </div>
    );
  }
}
