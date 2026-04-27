import { useEffect, useState } from "react";
import { updateUserProfile } from "../../../api/users";
import DialogShell, {
  CancelButton,
  dialogFieldWrap,
  dialogInputCls,
  dialogLabelCls,
} from "../../base/DialogShell";
import BaseButton from "../../base/BaseButton";
import UserAvatar, { getInitials } from "../../base/UserAvatar";
import { RoleBadge } from "../../base/Badge";

const ROLE_LABEL = {
  "super-admin": "Super-Admin",
  admin: "Admin",
  member: "Member",
};

export default function ViewProfile({ user, isOpen, toggleDialog }) {
  const [userData, setUserData] = useState({});
  const [saving, setSaving] = useState(false);

  const update = (event, key) =>
    setUserData((s) => ({ ...s, [key]: event.target.value }));

  const updateProfile = async () => {
    setSaving(true);
    await updateUserProfile({ ...userData, _id: user._id });
    window.location.reload();
  };

  useEffect(() => {
    setUserData({
      firstName: user.basicInformation.firstName,
      lastName: user.basicInformation.lastName,
      email: user.basicInformation.email,
      address: user.contactInformation?.address,
      phoneNumber: user.contactInformation?.phoneNumber,
    });
  }, []);

  const initials = getInitials(userData.firstName, userData.lastName);
  const role = ROLE_LABEL[user.organization?.roles] || null;

  return (
    <DialogShell
      title="Your Profile"
      toggleDialog={toggleDialog}
      width="max-w-md"
      footer={
        <>
          <CancelButton onClick={toggleDialog} />
          <BaseButton onClick={updateProfile} loading={saving}>
            Save Profile
          </BaseButton>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <UserAvatar initials={initials} size={52} role={role} />
          <div>
            <div className="text-sm font-semibold text-text-primary">
              {userData.firstName} {userData.lastName}
            </div>
            <div className="text-xs text-text-muted">{userData.email}</div>
            {role && (
              <div className="mt-1">
                <RoleBadge role={role} />
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border-subtle pt-3.5 flex flex-col gap-3">
          <div className="flex gap-2.5">
            <div className={`${dialogFieldWrap} flex-1`}>
              <label className={dialogLabelCls}>First Name</label>
              <input
                value={userData.firstName ?? ""}
                onChange={(e) => update(e, "firstName")}
                className={dialogInputCls}
              />
            </div>
            <div className={`${dialogFieldWrap} flex-1`}>
              <label className={dialogLabelCls}>Last Name</label>
              <input
                value={userData.lastName ?? ""}
                onChange={(e) => update(e, "lastName")}
                className={dialogInputCls}
              />
            </div>
          </div>

          <div className={dialogFieldWrap}>
            <label className={dialogLabelCls}>Email</label>
            <input
              value={userData.email ?? ""}
              onChange={(e) => update(e, "email")}
              className={`${dialogInputCls} bg-bg-subtle text-text-muted cursor-not-allowed`}
              readOnly
            />
          </div>

          <div className={dialogFieldWrap}>
            <label className={dialogLabelCls}>Address</label>
            <input
              value={userData.address ?? ""}
              onChange={(e) => update(e, "address")}
              placeholder="1234 SW 48th Blvd, Jacksonville, FL 12345"
              className={dialogInputCls}
            />
          </div>

          <div className={dialogFieldWrap}>
            <label className={dialogLabelCls}>Phone</label>
            <input
              value={userData.phoneNumber ?? ""}
              onChange={(e) => update(e, "phoneNumber")}
              className={dialogInputCls}
            />
          </div>
        </div>
      </div>
    </DialogShell>
  );
}
