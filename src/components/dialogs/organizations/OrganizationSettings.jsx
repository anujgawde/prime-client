import { useState } from "react";
import BaseButton from "../../base/BaseButton";
import BaseInput from "../../base/BaseInput";
import {
  deleteOrganization,
  leaveOrganization,
} from "../../../api/organizations";
import EditOrganization from "../../organizations/EditOrganization";

export default function OrganizationSettings({
  user,
  toggleDialog,
  organization,
}) {
  const [error, setError] = useState({
    name: null,
    message: null,
  });

  const [editOrganizationOpen, setEditOrganizationOpen] = useState(false);
  const [confirmState, setConfirmState] = useState({
    name: "",
  });

  const leaveOrganizationHandler = async () => {
    if (error.name) {
      setError({
        name: "",
        message: "",
      });
    }
    if (
      user.organization.roles === "super-admin" &&
      !organization.owners.length <= 1
    ) {
      setError({
        name: "leave-org",
        message:
          "This organization has only one super admin. To leave this organization, you will need to add another.",
      });
      return;
    }

    await leaveOrganization(user);
    window.location.reload();
  };

  const deleteOrganizationHandler = async () => {
    if (error.name) {
      setError({
        name: "",
        message: "",
      });
    }

    await deleteOrganization(user.organization.id);
    window.location.reload();
  };

  return (
    <div
      onClick={toggleDialog}
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 p-4 relative h-3/4 max-h-[75%] justify-between flex flex-col space-y-8 overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        <div className="font-medium  text-2xl ">Settings</div>
        {/* Dialog Content  */}
        <div className="space-y-2 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            {user.organization.roles === "super-admin" && (
              <div>
                {" "}
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="font-bold">Edit Organization</p>
                  </div>
                  <div className="">
                    <button
                      onClick={() =>
                        setEditOrganizationOpen(!editOrganizationOpen)
                      }
                      className="bg-gray-300 text-sm rounded-md text-black font-medium py-1 px-4 border-none"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                {editOrganizationOpen && (
                  <EditOrganization
                    organization={organization}
                    editorId={user._id}
                    editorRole={user.organization.roles}
                  />
                )}
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="">
                <p className="font-bold">Leave Organization</p>
                <p className="text-xs">
                  You won't be able to join back until invited again.
                </p>
                {error.name === "leave-org" && (
                  <p className="text-xs text-danger">{error.message}</p>
                )}
              </div>
              <div className="">
                {confirmState.name === "leave-org" ? (
                  <button
                    onClick={() => leaveOrganizationHandler()}
                    className="bg-danger text-sm rounded-md text-white font-medium py-1 px-4 border-none"
                  >
                    Yes, I'm Sure
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setConfirmState({
                        name: "leave-org",
                      })
                    }
                    className="bg-gray-300 text-sm rounded-md text-black font-medium py-1 px-4 border-none"
                  >
                    Leave
                  </button>
                )}
              </div>
            </div>

            {/* Only if super-admin */}
            {user.organization.roles === "super-admin" && (
              <div className="flex justify-between items-center">
                <div className="">
                  <p className="font-bold">Delete Organization</p>
                  <p className="text-xs">
                    This action is irreversible, all of your data will be lost.
                  </p>
                </div>
                <div className="">
                  {confirmState.name === "delete-org" ? (
                    <button
                      onClick={() => deleteOrganizationHandler()}
                      className="bg-danger text-sm rounded-md text-white font-medium py-1 px-4 border-none"
                    >
                      Yes, I'm Sure
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setConfirmState({
                          name: "delete-org",
                        })
                      }
                      className="bg-gray-300 text-sm rounded-md text-black font-medium py-1 px-4 border-none"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* CTAs */}
          {/* <div className="flex justify-center space-x-4 items-center">
            <div className="">
              <button
                onClick={toggleDialog}
                className="border-none bg-gray-300 text-black font-medium rounded-md"
              >
                <img src="/icons/base/cancel.svg" className="md:hidden" />
                <p className="md:block hidden">Close</p>
              </button>
            </div>

            <BaseButton
              onClick={() => {}}
              buttonText={"Save"}
              customClasses={"my-2"}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
