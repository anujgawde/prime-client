import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import DialogShell, {
  CancelButton,
  dialogFieldWrap,
  dialogLabelCls,
} from "../../base/DialogShell";
import BaseButton from "../../base/BaseButton";

export default function CreateTemplate({ toggleDialog, user }) {
  const navigate = useNavigate();
  const [isOrg, setIsOrg] = useState(null);

  const buildTemplate = () => {
    navigate(`/templates/${uuidv4()}`, {
      state: { organizationId: isOrg ? user.organization.id : null },
    });
  };

  return (
    <DialogShell
      title="New Template"
      subtitle="Templates can be reused to create many reports."
      toggleDialog={toggleDialog}
      width="max-w-md"
      footer={
        <>
          <CancelButton onClick={toggleDialog} />
          <BaseButton onClick={buildTemplate} disabled={isOrg === null}>
            Build Template
          </BaseButton>
        </>
      }
    >
      <div className={dialogFieldWrap}>
        <label className={dialogLabelCls}>
          Is this template for your organization?
        </label>
        <div className="flex gap-2">
          {[
            { val: true, label: "Yes — Organization", desc: "Visible to all members" },
            { val: false, label: "No — Personal", desc: "Only you can see it" },
          ].map((opt) => (
            <label
              key={opt.label}
              className={`flex-1 px-3 py-2.5 border-[1.5px] rounded-xs cursor-pointer ${
                isOrg === opt.val
                  ? "border-primary-base bg-primary-subtle"
                  : "border-border-default bg-bg-surface"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <input
                  type="radio"
                  checked={isOrg === opt.val}
                  onChange={() => setIsOrg(opt.val)}
                  className="accent-primary-base"
                />
                <span
                  className={`text-xs font-semibold ${
                    isOrg === opt.val ? "text-primary-text" : "text-text-primary"
                  }`}
                >
                  {opt.label}
                </span>
              </div>
              <div className="text-[10px] text-text-muted leading-tight">
                {opt.desc}
              </div>
            </label>
          ))}
        </div>
      </div>
    </DialogShell>
  );
}
