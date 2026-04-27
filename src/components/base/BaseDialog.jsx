import React from "react";
import BaseButton from "./BaseButton";

export default function BaseDialog({
  text,
  isOpen,
  toggleDialog,
  title,
  subtitle,
  children,
  footer,
  width = "w-full max-w-md",
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={toggleDialog}
      className="fixed inset-0 z-50 bg-text-primary/40 backdrop-blur-sm flex justify-center items-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${width} bg-bg-surface rounded-md shadow-ds-xl border border-border-subtle overflow-hidden font-sans`}
      >
        {(title || subtitle) && (
          <div className="px-5 pt-4 pb-3.5 border-b border-border-subtle">
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

        <div className="p-5">{children ?? text}</div>

        {footer !== undefined ? (
          footer && (
            <div className="px-5 pt-3 pb-4 border-t border-border-subtle flex justify-end gap-2">
              {footer}
            </div>
          )
        ) : (
          <div className="px-5 pt-3 pb-4 border-t border-border-subtle flex justify-end gap-2">
            <BaseButton variant="secondary" onClick={toggleDialog}>
              Close
            </BaseButton>
          </div>
        )}
      </div>
    </div>
  );
}
