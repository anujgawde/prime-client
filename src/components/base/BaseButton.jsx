const variantClasses = {
  primary:
    "bg-primary-base text-white border-primary-base hover:bg-primary-hover",
  secondary:
    "bg-bg-surface text-text-primary border-border-default shadow-ds-xs hover:bg-bg-hover",
  ghost:
    "bg-transparent text-text-secondary border-transparent hover:bg-bg-hover hover:text-text-primary",
  destructive:
    "bg-error-subtle text-error-text border-error-base hover:opacity-90",
  disabled:
    "bg-bg-subtle text-text-disabled border-border-subtle cursor-not-allowed",
};

const sizeClasses = {
  sm: "h-[26px] px-2 text-xs",
  md: "h-8 px-3 text-[13px]",
  lg: "h-[38px] px-4 text-sm",
};

export default function BaseButton({
  buttonText,
  children,
  type = "button",
  onClick,
  customClasses = "",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
}) {
  const isDisabled = disabled || loading;
  const variantKey = isDisabled && !loading ? "disabled" : variant;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-1.5 font-medium leading-none rounded-xs border transition-all duration-100 select-none whitespace-nowrap font-sans ${variantClasses[variantKey]} ${sizeClasses[size]} ${loading ? "opacity-80 cursor-wait" : "cursor-pointer"} ${customClasses}`}
    >
      {loading && (
        <span className="inline-block w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      )}
      {!loading && iconLeft}
      {children ?? buttonText}
      {!loading && iconRight}
    </button>
  );
}
