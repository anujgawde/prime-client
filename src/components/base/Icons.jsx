export const Icon = ({ children, size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    {children}
  </svg>
);

export const HomeIcon = ({ size = 16, className }) => (
  <Icon size={size} className={className}>
    <path
      d="M2 6.5L8 2l6 4.5V14H10v-3.5H6V14H2V6.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </Icon>
);

export const ReportsIcon = ({ size = 16, className }) => (
  <Icon size={size} className={className}>
    <rect
      x="3"
      y="1.5"
      width="10"
      height="13"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <line x1="5.5" y1="5" x2="10.5" y2="5" stroke="currentColor" strokeWidth="1.1" />
    <line x1="5.5" y1="7.5" x2="10.5" y2="7.5" stroke="currentColor" strokeWidth="1.1" />
    <line x1="5.5" y1="10" x2="8.5" y2="10" stroke="currentColor" strokeWidth="1.1" />
  </Icon>
);

export const TemplatesIcon = ({ size = 16, className }) => (
  <Icon size={size} className={className}>
    <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <rect x="2" y="2" width="12" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <line x1="8" y1="6.5" x2="8" y2="14" stroke="currentColor" strokeWidth="1.1" />
  </Icon>
);

export const OrgIcon = ({ size = 16, className }) => (
  <Icon size={size} className={className}>
    <rect x="6" y="1.5" width="4" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="1" y="11" width="4" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    <rect x="11" y="11" width="4" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    <line x1="8" y1="5" x2="8" y2="8" stroke="currentColor" strokeWidth="1.2" />
    <line x1="3" y1="11" x2="3" y2="8" stroke="currentColor" strokeWidth="1.2" />
    <line x1="13" y1="11" x2="13" y2="8" stroke="currentColor" strokeWidth="1.2" />
    <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.2" />
  </Icon>
);

export const PlusIcon = ({ size = 12, className }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={className}>
    <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SearchIcon = ({ size = 13, className }) => (
  <svg width={size} height={size} viewBox="0 0 13 13" fill="none" className={className}>
    <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2" />
    <line x1="8.5" y1="8.5" x2="11.5" y2="11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const ChevronDown = ({ size = 10, className }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className}>
    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EditIcon = ({ size = 12, className }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={className}>
    <path d="M9 1.5l1.5 1.5L4 9.5H2.5V8L9 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
);

export const MoreIcon = ({ size = 12, className }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" className={className}>
    <circle cx="2.5" cy="6" r="1" fill="currentColor" />
    <circle cx="6" cy="6" r="1" fill="currentColor" />
    <circle cx="9.5" cy="6" r="1" fill="currentColor" />
  </svg>
);

export const HelpIcon = ({ size = 14, className }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M5 5.5C5 4.7 5.9 4 7 4s2 .7 2 1.5c0 1-1 1.5-2 2v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="7" cy="10" r="0.6" fill="currentColor" />
  </svg>
);

export const SettingsIcon = ({ size = 14, className }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
    <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M7 1v1.5M7 11.5V13M11.2 2.8l-1.1 1.1M3.9 10.1l-1.1 1.1M13 7h-1.5M2.5 7H1M11.2 11.2l-1.1-1.1M3.9 3.9L2.8 2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const PrimeLogo = ({ size = 22 }) => (
  <div
    className="bg-primary-base rounded-[3px] flex items-center justify-center"
    style={{ width: size, height: size }}
  >
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 12 12" fill="none">
      <rect x="1" y="1" width="8" height="10" rx="0.5" stroke="white" strokeWidth="1.2" />
      <line x1="3" y1="4" x2="7" y2="4" stroke="white" strokeWidth="1" />
      <line x1="3" y1="6" x2="7" y2="6" stroke="white" strokeWidth="1" />
      <line x1="3" y1="8" x2="5.5" y2="8" stroke="white" strokeWidth="1" />
    </svg>
  </div>
);
