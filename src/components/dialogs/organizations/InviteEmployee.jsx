import { useState } from "react";
import DialogShell, {
  CancelButton,
  dialogFieldWrap,
  dialogInputCls,
  dialogLabelCls,
} from "../../base/DialogShell";
import BaseButton from "../../base/BaseButton";

export default function InviteEmployee({ inviteEmployee, toggleDialog }) {
  const [employeeEmail, setEmployeeEmail] = useState("");

  const handleSend = () => {
    inviteEmployee(employeeEmail);
    setEmployeeEmail("");
    toggleDialog();
  };

  return (
    <DialogShell
      title="Invite Team Member"
      subtitle="They'll receive an email invitation to join."
      toggleDialog={toggleDialog}
      width="max-w-md"
      footer={
        <>
          <CancelButton onClick={toggleDialog} />
          <BaseButton onClick={handleSend} disabled={!employeeEmail}>
            Send Invitation
          </BaseButton>
        </>
      }
    >
      <div className="flex flex-col gap-3.5">
        <div className={dialogFieldWrap}>
          <label className={dialogLabelCls}>Email Address</label>
          <input
            type="email"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            placeholder="colleague@company.com"
            className={dialogInputCls}
          />
        </div>
        <div className="px-3 py-2 bg-primary-subtle border border-primary-border rounded-xs text-[11px] text-primary-text leading-relaxed">
          An invitation link will be sent. It expires in 72 hours.
        </div>
      </div>
    </DialogShell>
  );
}
