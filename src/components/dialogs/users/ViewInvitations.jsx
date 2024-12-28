import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadInvites,
  responseToInvitation,
} from "../../../state/invites/inviteSlice";
import BaseInput from "../../base/BaseInput";

export default function ViewInvitations({ user, isOpen, toggleDialog }) {
  const dispatch = useDispatch();
  const invites = useSelector((state) => state.invites.invites);
  console.log(invites);

  const respondToInviteHandler = async (data) => {
    dispatch(responseToInvitation(data));
    if (data.action) {
      window.location.reload();
    }
  };

  useEffect(() => {
    dispatch(loadInvites(user._id));
  }, [dispatch]);

  console.log(invites);
  return (
    <div
      onClick={toggleDialog}
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 relative  justify-between flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        <div className="font-medium text-2xl border-b p-4">Invitations</div>
        {/* Dialog Content  */}
        <div className=" flex-1 flex flex-col justify-between">
          {invites.map((invite) => (
            <div key={invite._id} className="flex justify-between p-4">
              <div>
                <p className="text-">{invite.organization.name}</p>
                <p className="text-sm">{invite.organization.address}</p>
              </div>

              <div className="flex items-center text-sm">
                {invite.status === "pending" ? (
                  <div className="space-x-2 ">
                    <button
                      onClick={() =>
                        respondToInviteHandler({
                          invitationId: invite._id,
                          action: false,
                          inviteeUserId: user._id,
                          organizationId: invite.organization._id,
                        })
                      }
                      className="border-none bg-gray-300 text-black font-medium rounded-md"
                    >
                      <img src="/icons/base/cancel.svg" className="md:hidden" />
                      <p className="md:block hidden">Reject</p>
                    </button>
                    <button
                      onClick={() =>
                        respondToInviteHandler({
                          invitationId: invite._id,
                          action: true,
                          inviteeUserId: user._id,
                          organizationId: invite.organization._id,
                        })
                      }
                      className="border-none bg-primary text-white font-medium rounded-md"
                    >
                      <img src="/icons/base/check.svg" className="md:hidden" />
                      <p className="md:block hidden">Accept</p>
                    </button>
                  </div>
                ) : invite.status === "rejected" ? (
                  <div className="text-red-600 font-medium">Rejected</div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
