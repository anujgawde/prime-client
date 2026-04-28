import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getTemplates } from "../../../api/templates";
import DialogShell, {
  CancelButton,
  dialogFieldWrap,
  dialogLabelCls,
} from "../../base/DialogShell";
import BaseButton from "../../base/BaseButton";

export default function CreateReport({ toggleDialog, user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [templates, setTemplates] = useState({ personal: [], organization: [] });
  const [isOrg, setIsOrg] = useState(!!user.organization);

  const fetchTemplates = async () => {
    if (isOrg) {
      if (templates.organization.length) return;
      const orgTemplates = await getTemplates({
        organizationId: user.organization.id,
      });
      setTemplates((s) => ({ ...s, organization: orgTemplates || [] }));
    } else {
      if (templates.personal.length) return;
      const personal = await getTemplates({ createdBy: user._id });
      setTemplates((s) => ({ ...s, personal: personal || [] }));
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [isOrg]);

  const createDocument = () => {
    if (activeTemplate?._id) {
      toggleDialog();
      navigate(`/reports/${activeTemplate._id}/${uuidv4()}?collab=yjs`, {
        state: { organizationId: isOrg ? user.organization.id : null },
      });
    }
  };

  const list = isOrg ? templates.organization : templates.personal;

  return (
    <DialogShell
      title="Create Report"
      subtitle="Name your report and choose a starting template."
      toggleDialog={toggleDialog}
      width="max-w-md"
      footer={
        <>
          <CancelButton onClick={toggleDialog} />
          <BaseButton onClick={createDocument} disabled={!activeTemplate?._id}>
            Create Report
          </BaseButton>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {location.pathname !== "/organization" && user.organization && (
          <div className={dialogFieldWrap}>
            <label className={dialogLabelCls}>Report Type</label>
            <div className="flex gap-2">
              {[
                { val: true, label: "Organization" },
                { val: false, label: "Personal" },
              ].map((opt) => (
                <label
                  key={opt.label}
                  className={`flex-1 px-3 py-2.5 border-[1.5px] rounded-xs cursor-pointer ${
                    isOrg === opt.val
                      ? "border-primary-base bg-primary-subtle"
                      : "border-border-default bg-bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
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
                </label>
              ))}
            </div>
          </div>
        )}

        <div className={dialogFieldWrap}>
          <label className={dialogLabelCls}>Template</label>
          <select
            value={activeTemplate?._id || ""}
            onChange={(e) => {
              const t = list.find((x) => x._id === e.target.value);
              setActiveTemplate(t || null);
            }}
            className="font-sans text-[13px] text-text-primary bg-bg-surface border border-border-default rounded-xs px-2.5 py-[7px] outline-none w-full focus:border-primary-base focus:shadow-ds-focus cursor-pointer"
          >
            <option value="">Select a template…</option>
            {list.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {activeTemplate && (
          <div className="px-3 py-2.5 bg-bg-subtle rounded-xs border border-border-subtle">
            <div className="text-xs font-medium text-text-primary mb-1">
              {activeTemplate.name}
            </div>
            {activeTemplate.description && (
              <div className="text-[11px] text-text-muted leading-relaxed">
                {activeTemplate.description}
              </div>
            )}
          </div>
        )}
      </div>
    </DialogShell>
  );
}
