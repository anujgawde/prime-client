import DialogShell, { CancelButton } from "../../base/DialogShell";
import BaseButton from "../../base/BaseButton";

export default function BaseConfirmation({
  primaryAction,
  secondaryAction,
  title,
  content,
  primaryButtonText,
  secondaryButtonText,
  destructive = false,
}) {
  return (
    <DialogShell
      title={title}
      toggleDialog={secondaryAction}
      width="max-w-sm"
      footer={
        <>
          <CancelButton onClick={secondaryAction}>
            {secondaryButtonText}
          </CancelButton>
          <BaseButton
            variant={destructive ? "destructive" : "primary"}
            onClick={primaryAction}
          >
            {primaryButtonText}
          </BaseButton>
        </>
      }
    >
      <div className="flex gap-3 items-start">
        <div
          className={`w-8 h-8 rounded-xs flex items-center justify-center flex-shrink-0 ${
            destructive
              ? "bg-error-subtle text-error-base"
              : "bg-primary-subtle text-primary-base"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2L14 13H2L8 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <line x1="8" y1="6" x2="8" y2="9.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
          </svg>
        </div>
        <div className="text-[13px] text-text-secondary leading-relaxed">
          {content}
        </div>
      </div>
    </DialogShell>
  );
}
