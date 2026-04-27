import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadInvites,
  responseToInvitation,
} from "../../../state/invites/inviteSlice";
import DialogShell, { CancelButton } from "../../base/DialogShell";
import BaseButton from "../../base/BaseButton";

export default function ViewInvitations({ user, isOpen, toggleDialog }) {
  const dispatch = useDispatch();
  const invites = useSelector((state) => state.invites.invites);

  const respondToInviteHandler = async (data) => {
    dispatch(responseToInvitation(data));
    if (data.action) window.location.reload();
  };

  useEffect(() => {
    dispatch(loadInvites(user._id));
  }, [dispatch]);

  return (
    <DialogShell
      title="Pending Invitations"
      subtitle="Manage outstanding invitations to organizations."
      toggleDialog={toggleDialog}
      width="max-w-lg"
      footer={<CancelButton onClick={toggleDialog}>Close</CancelButton>}
    >
      <div className="flex flex-col gap-2">
        {invites.length === 0 && (
          <div className="text-center py-6 text-text-muted text-[13px]">
            No pending invitations.
          </div>
        )}
        {invites.map((invite) => {
          const initial = (invite.organization?.name || "?")[0].toUpperCase();
          return (
            <div
              key={invite._id}
              className="flex items-center gap-3 px-3 py-2.5 bg-bg-subtle rounded-xs border border-border-subtle"
            >
              <div className="w-8 h-8 rounded-full bg-bg-hover border border-border-default flex items-center justify-center text-xs text-text-secondary font-semibold flex-shrink-0">
                {initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-text-primary truncate">
                  {invite.organization.name}
                </div>
                {invite.organization.address && (
                  <div className="text-[10px] text-text-muted truncate mt-0.5">
                    {invite.organization.address}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {invite.status === "pending" ? (
                  <>
                    <BaseButton
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        respondToInviteHandler({
                          invitationId: invite._id,
                          action: false,
                          inviteeUserId: user._id,
                          organizationId: invite.organization._id,
                        })
                      }
                    >
                      Reject
                    </BaseButton>
                    <BaseButton
                      size="sm"
                      onClick={() =>
                        respondToInviteHandler({
                          invitationId: invite._id,
                          action: true,
                          inviteeUserId: user._id,
                          organizationId: invite.organization._id,
                        })
                      }
                    >
                      Accept
                    </BaseButton>
                  </>
                ) : invite.status === "rejected" ? (
                  <span className="text-[11px] text-error-text font-medium">Rejected</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </DialogShell>
  );
}
