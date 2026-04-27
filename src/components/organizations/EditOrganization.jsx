import { useEffect, useState } from "react";
import BaseButton from "../base/BaseButton";
import { editOrganization } from "../../api/organizations";
import {
  dialogFieldWrap,
  dialogInputCls,
  dialogLabelCls,
} from "../base/DialogShell";

export default function EditOrganization({ organization, editorId, editorRole }) {
  const [organizationData, setOrganizationData] = useState();

  const update = (event, key) =>
    setOrganizationData((s) => ({ ...s, [key]: event.target.value }));

  const editOrganizationHandler = async () => {
    await editOrganization({
      editorRole,
      editorId,
      data: { ...organizationData, _id: organization._id },
    });
    window.location.reload();
  };

  useEffect(() => {
    setOrganizationData({
      name: organization.name,
      address: organization.address,
      emailDomain: organization.emailDomain,
    });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2.5">
        <div className={`${dialogFieldWrap} flex-1`}>
          <label className={dialogLabelCls}>Organization Name</label>
          <input
            value={organizationData?.name ?? ""}
            onChange={(e) => update(e, "name")}
            className={dialogInputCls}
          />
        </div>
        <div className={`${dialogFieldWrap} flex-1`}>
          <label className={dialogLabelCls}>Email Domain</label>
          <input
            value={organizationData?.emailDomain ?? ""}
            onChange={(e) => update(e, "emailDomain")}
            className={dialogInputCls}
          />
        </div>
      </div>
      <div className={dialogFieldWrap}>
        <label className={dialogLabelCls}>Address</label>
        <input
          value={organizationData?.address ?? ""}
          onChange={(e) => update(e, "address")}
          className={dialogInputCls}
        />
      </div>
      <div>
        <BaseButton onClick={editOrganizationHandler} size="sm">
          Update Organization
        </BaseButton>
      </div>
    </div>
  );
}
