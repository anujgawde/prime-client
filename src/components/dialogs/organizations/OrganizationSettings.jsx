import { useState } from "react";
import {
  deleteOrganization,
  leaveOrganization,
} from "../../../api/organizations";
import EditOrganization from "../../organizations/EditOrganization";
import DialogShell, { CancelButton } from "../../base/DialogShell";
import BaseButton from "../../base/BaseButton";

export default function OrganizationSettings({ user, toggleDialog, organization }) {
  const [error, setError] = useState({ name: null, message: null });
  const [editOrganizationOpen, setEditOrganizationOpen] = useState(false);
  const [confirmState, setConfirmState] = useState({ name: "" });

  const isSuperAdmin = user.organization?.roles === "super-admin";

  const leaveOrganizationHandler = async () => {
    if (error.name) setError({ name: "", message: "" });
    if (isSuperAdmin && !organization.owners.length <= 1) {
      setError({
        name: "leave-org",
        message:
          "This organization has only one super admin. Add another before leaving.",
      });
      return;
    }
    await leaveOrganization(user);
    window.location.reload();
  };

  const deleteOrganizationHandler = async () => {
    if (error.name) setError({ name: "", message: "" });
    await deleteOrganization(user.organization.id);
    window.location.reload();
  };

  return (
    <DialogShell
      title="Organization Settings"
      toggleDialog={toggleDialog}
      width="max-w-lg"
      footer={<CancelButton onClick={toggleDialog}>Close</CancelButton>}
    >
      <div className="flex flex-col gap-4">
        {isSuperAdmin && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold text-[13px] text-text-primary">
                  Edit Organization
                </p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Update name, email domain, and address.
                </p>
              </div>
              <BaseButton
                variant="secondary"
                size="sm"
                onClick={() => setEditOrganizationOpen(!editOrganizationOpen)}
              >
                {editOrganizationOpen ? "Hide" : "Edit"}
              </BaseButton>
            </div>
            {editOrganizationOpen && (
              <div className="bg-bg-subtle p-3 rounded-xs border border-border-subtle">
                <EditOrganization
                  organization={organization}
                  editorId={user._id}
                  editorRole={user.organization.roles}
                />
              </div>
            )}
          </div>
        )}

        <div className="border-t border-border-subtle pt-4">
          <p className="font-semibold text-xs text-text-primary mb-2">Danger Zone</p>

          <div className="p-3 border border-warning-border rounded-xs bg-warning-subtle flex items-center justify-between mb-2">
            <div>
              <p className="text-xs font-medium text-warning-text">Leave Organization</p>
              <p className="text-[10px] text-warning-text opacity-80 mt-0.5">
                You won't be able to rejoin without an invite.
              </p>
              {error.name === "leave-org" && (
                <p className="text-[10px] text-error-text mt-1">{error.message}</p>
              )}
            </div>
            {confirmState.name === "leave-org" ? (
              <BaseButton variant="destructive" size="sm" onClick={leaveOrganizationHandler}>
                Yes, Leave
              </BaseButton>
            ) : (
              <BaseButton
                variant="secondary"
                size="sm"
                onClick={() => setConfirmState({ name: "leave-org" })}
              >
                Leave
              </BaseButton>
            )}
          </div>

          {isSuperAdmin && (
            <div className="p-3 border border-error-border rounded-xs bg-error-subtle flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-error-text">Delete Organization</p>
                <p className="text-[10px] text-error-text opacity-80 mt-0.5">
                  Permanently removes all data. This cannot be undone.
                </p>
              </div>
              {confirmState.name === "delete-org" ? (
                <BaseButton variant="destructive" size="sm" onClick={deleteOrganizationHandler}>
                  Yes, Delete
                </BaseButton>
              ) : (
                <BaseButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setConfirmState({ name: "delete-org" })}
                >
                  Delete
                </BaseButton>
              )}
            </div>
          )}
        </div>
      </div>
    </DialogShell>
  );
}
