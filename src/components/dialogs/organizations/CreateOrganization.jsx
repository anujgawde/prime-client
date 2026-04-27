import { useState } from "react";
import { createOrganization } from "../../../api/organizations";
import DialogShell, {
  CancelButton,
  dialogFieldWrap,
  dialogInputCls,
  dialogLabelCls,
} from "../../base/DialogShell";
import BaseButton from "../../base/BaseButton";

export default function CreateOrganization({ user, toggleDialog }) {
  const [organizationData, setOrganizationData] = useState(user.organization || {});
  const [saving, setSaving] = useState(false);

  const saveOrganization = async () => {
    setSaving(true);
    await createOrganization({
      ...organizationData,
      owners: [
        {
          _id: user._id,
          basicInformation: user.basicInformation,
          contactInformation: user.contactInformation,
        },
      ],
      settings: {},
      status: "",
      createdAt: Date.now(),
    });
    window.location.reload();
  };

  const update = (event, key) =>
    setOrganizationData((s) => ({ ...s, [key]: event.target.value }));

  return (
    <DialogShell
      title="Create Organization"
      subtitle="Set up your workspace for your team."
      toggleDialog={toggleDialog}
      width="max-w-md"
      footer={
        <>
          <CancelButton onClick={toggleDialog} />
          <BaseButton onClick={saveOrganization} loading={saving}>
            Create Organization
          </BaseButton>
        </>
      }
    >
      <div className="flex flex-col gap-3.5">
        <div className={dialogFieldWrap}>
          <label className={dialogLabelCls}>Organization Name</label>
          <input
            value={organizationData?.name ?? ""}
            onChange={(e) => update(e, "name")}
            placeholder="e.g. Acme Corp"
            className={dialogInputCls}
          />
        </div>
        <div className={dialogFieldWrap}>
          <label className={dialogLabelCls}>Email Domain</label>
          <input
            value={organizationData?.emailDomain ?? ""}
            onChange={(e) => update(e, "emailDomain")}
            placeholder="@primeco.in"
            className={dialogInputCls}
          />
        </div>
        <div className={dialogFieldWrap}>
          <label className={dialogLabelCls}>Address</label>
          <input
            value={organizationData?.address ?? ""}
            onChange={(e) => update(e, "address")}
            placeholder="1234 SW 48th Blvd, Jacksonville, FL 12345"
            className={dialogInputCls}
          />
        </div>
      </div>
    </DialogShell>
  );
}
