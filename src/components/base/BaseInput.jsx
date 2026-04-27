export default function BaseInput({
  placeHolder,
  label,
  errorText = "",
  type = "text",
  isHidden,
  name,
  onChange,
  value,
  disabled = false,
}) {
  const hasError = errorText && errorText.length > 0;

  return (
    <div className={`w-full ${isHidden ? "hidden" : ""}`}>
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-medium text-text-secondary">
            {label}
          </label>
        )}
        <input
          value={value ?? ""}
          onChange={onChange}
          name={name}
          type={type}
          disabled={disabled}
          placeholder={placeHolder}
          className={`font-sans text-[13px] text-text-primary bg-bg-surface border rounded-xs px-2.5 py-[7px] outline-none w-full transition-colors duration-100 ${
            hasError
              ? "border-error-base focus:shadow-[0_0_0_3px_var(--color-error-border)]"
              : "border-border-default focus:border-primary-base focus:shadow-ds-focus"
          } ${disabled ? "bg-bg-subtle text-text-disabled cursor-not-allowed" : ""}`}
        />
        {hasError && (
          <span className="text-[11px] text-error-text">{errorText}</span>
        )}
      </div>
    </div>
  );
}
