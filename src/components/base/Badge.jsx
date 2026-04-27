const variantClasses = {
  default: "bg-bg-subtle text-text-muted border-border-default",
  primary: "bg-primary-subtle text-primary-text border-primary-border",
  success: "bg-success-subtle text-success-base border-success-border",
  warning: "bg-warning-subtle text-warning-text border-warning-border",
  error: "bg-error-subtle text-error-text border-error-border",
  info: "bg-info-subtle text-info-text border-info-border",
};

export default function Badge({
  children,
  variant = "default",
  withDot = false,
  className = "",
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[11px] font-semibold leading-tight border ${variantClasses[variant]} ${className}`}
    >
      {withDot && (
        <span className="w-1 h-1 rounded-full bg-current inline-block" />
      )}
      {children}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    Final: "success",
    Draft: "default",
    Review: "warning",
    Active: "success",
    Pending: "warning",
    Inactive: "default",
  };
  return <Badge variant={map[status] || "default"}>{status}</Badge>;
}

export function RoleBadge({ role }) {
  const map = {
    "Super-Admin": {
      cls: "bg-super-admin-subtle text-super-admin-base border-super-admin-border",
      dot: true,
    },
    Admin: {
      cls: "bg-admin-subtle text-admin-base border-admin-border",
      dot: true,
    },
    Member: {
      cls: "bg-member-subtle text-member-base border-member-border",
      dot: false,
    },
  };
  const r = map[role] || map.Member;
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-semibold leading-tight border ${r.cls}`}
    >
      {r.dot && (
        <span className="w-1 h-1 rounded-full bg-current inline-block" />
      )}
      {role}
    </span>
  );
}
