const roleStyle = {
  "Super-Admin": {
    bg: "bg-super-admin-subtle",
    border: "border-super-admin-base",
    color: "text-super-admin-base",
  },
  Admin: {
    bg: "bg-admin-subtle",
    border: "border-admin-base",
    color: "text-admin-base",
  },
  Member: {
    bg: "bg-primary-subtle",
    border: "border-primary-border",
    color: "text-primary-text",
  },
};

export default function UserAvatar({ initials = "U", size = 28, role }) {
  const s = roleStyle[role] || roleStyle.Member;
  return (
    <div
      className={`rounded-full border-[1.5px] flex items-center justify-center font-semibold flex-shrink-0 tracking-tight ${s.bg} ${s.border} ${s.color}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  );
}

export function getInitials(firstName, lastName) {
  const f = (firstName || "").charAt(0).toUpperCase();
  const l = (lastName || "").charAt(0).toUpperCase();
  return (f + l) || "U";
}
