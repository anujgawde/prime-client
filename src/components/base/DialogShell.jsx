import BaseButton from "./BaseButton";

export const dialogInputCls =
  "font-sans text-[13px] text-text-primary bg-bg-surface border border-border-default rounded-xs px-2.5 py-[7px] outline-none w-full focus:border-primary-base focus:shadow-ds-focus transition-all";

export const dialogLabelCls = "text-xs font-medium text-text-secondary";

export const dialogFieldWrap = "flex flex-col gap-1.5";

export default function DialogShell({
  title,
  subtitle,
  toggleDialog,
  width = "max-w-md",
  children,
  footer,
}) {
  return (
    <div
      onClick={toggleDialog}
      className="z-50 fixed inset-0 bg-text-primary/40 backdrop-blur-sm flex justify-center items-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${width} bg-bg-surface rounded-md shadow-ds-xl border border-border-subtle overflow-hidden font-sans flex flex-col max-h-[90vh]`}
      >
        {(title || subtitle) && (
          <div className="px-5 pt-4 pb-3.5 border-b border-border-subtle flex-shrink-0">
            <div className="flex items-center justify-between">
              {title && (
                <span className="font-semibold text-[15px] text-text-primary">
                  {title}
                </span>
              )}
              <button
                onClick={toggleDialog}
                className="w-6 h-6 bg-transparent border-none cursor-pointer text-text-muted text-lg flex items-center justify-center rounded-xs hover:bg-bg-hover hover:text-text-primary"
              >
                ×
              </button>
            </div>
            {subtitle && (
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="p-5 overflow-y-auto">{children}</div>
        {footer && (
          <div className="px-5 pt-3 pb-4 border-t border-border-subtle flex justify-end gap-2 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function CancelButton({ onClick, children = "Cancel" }) {
  return (
    <BaseButton variant="secondary" onClick={onClick}>
      {children}
    </BaseButton>
  );
}
