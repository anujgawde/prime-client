import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { signOutHandler } from "../../firebase/auth";
import UserAvatar, { getInitials } from "../base/UserAvatar";
import {
  HomeIcon,
  ReportsIcon,
  TemplatesIcon,
  OrgIcon,
  PrimeLogo,
  SearchIcon,
  HelpIcon,
  SettingsIcon,
  ChevronDown,
} from "../base/Icons";
import ViewProfile from "../dialogs/profile/ViewProfile";
import ViewInvitations from "../dialogs/users/ViewInvitations";

const NAV_ITEMS = [
  { id: "dashboard", label: "Home", path: "/dashboard", Icon: HomeIcon },
  { id: "reports", label: "Reports", path: "/reports", Icon: ReportsIcon },
  {
    id: "templates",
    label: "Templates",
    path: "/templates",
    Icon: TemplatesIcon,
  },
  {
    id: "organization",
    label: "Organization",
    path: "/organization",
    Icon: OrgIcon,
  },
];

function CollapseIcon({ collapsed }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      className="flex-shrink-0"
    >
      {collapsed ? (
        <>
          <path
            d="M4.5 2.5l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 2.5l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M8.5 2.5l-4 4 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 2.5l-4 4 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

export default function AppShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [viewInvitationsOpen, setViewInvitationsOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileRef = useRef(null);

  const user = auth.currentUser;
  const firstName = user?.basicInformation?.firstName || "";
  const lastName = user?.basicInformation?.lastName || "";
  const initials = getInitials(firstName, lastName);
  const orgName = user?.organization?.name || "Personal";

  useEffect(() => {
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target))
        setMobileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOutHandler();
    navigate("/auth");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const sidebarContent = (isMobile = false) => (
    <div className={`flex flex-col h-full ${isMobile ? "w-64" : ""}`}>
      {/* Workspace header */}
      <div
        className={`flex items-center gap-2 px-3 py-3 text-2xl ${collapsed || !isMobile ? "justify-center" : ""}`}
      >
        {!collapsed || isMobile ? (
          <div className="flex-1 min-w-0 flex w-full justify-between items-center">
            <div className=" font-semibold text-text-primary truncate leading-tight">
              Prime
            </div>
            {/* <div className="text-[11px] text-text-muted truncate leading-tight">{orgName}</div> */}
            {/* Collapse toggle — desktop only */}
            {!isMobile && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                className={`flex items-center gap-2 px-2 py-1.5  border-none bg-transparent text-text-muted hover:text-text-primary  cursor-pointer transition-colors duration-100 mt-0.5 ${collapsed ? "justify-center" : ""}`}
              >
                <CollapseIcon collapsed={collapsed} />
              </button>
            )}
          </div>
        ) : (
          <Link
            to="/dashboard"
            className="flex items-center gap-2 no-underline flex-shrink-0 font-bold"
          >
            Pr
          </Link>
        )}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto border-none bg-transparent text-text-muted cursor-pointer hover:text-text-primary text-lg leading-none p-1"
          >
            ×
          </button>
        )}
      </div>

      {/* Search */}
      {(!collapsed || isMobile) && (
        <div className="px-2 pt-2">
          <div className="flex items-center gap-1.5 bg-bg-subtle border border-border-subtle rounded-xs px-2.5 py-1.5 cursor-text">
            <SearchIcon className="text-text-muted flex-shrink-0" />
            <span className="text-[12px] text-text-muted flex-1">Search…</span>
            <span className="text-[10px] text-text-muted font-mono">⌘K</span>
          </div>
        </div>
      )}
      {collapsed && !isMobile && (
        <div className="px-2 pt-2 flex justify-center">
          <button className="w-8 h-8 flex items-center justify-center rounded-xs hover:bg-bg-hover text-text-muted border-none bg-transparent cursor-pointer">
            <SearchIcon />
          </button>
        </div>
      )}

      {/* Section label */}
      {(!collapsed || isMobile) && (
        <div className="px-3 pt-4 pb-1">
          <span className="text-[10px] font-semibold tracking-[0.07em] uppercase text-text-muted">
            Workspace
          </span>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-1 flex flex-col gap-px overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => isMobile && setMobileOpen(false)}
              title={collapsed && !isMobile ? item.label : undefined}
              className={`flex items-center gap-2.5 px-2 py-1.5 rounded-xs no-underline text-[13px] transition-all duration-100 ${
                collapsed && !isMobile ? "justify-center" : ""
              } ${
                active
                  ? "bg-bg-sidebar-active text-text-primary font-medium"
                  : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
              }`}
            >
              <span className="flex-shrink-0 text-text-muted">
                <item.Icon />
              </span>
              {(!collapsed || isMobile) && item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div
        className={` border-border-subtle px-2 py-2 flex flex-col gap-px ${collapsed && !isMobile ? "items-center" : ""}`}
      >
        {/* {(!collapsed || isMobile) && (
          <>
            <Link
              to="/info"
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-xs no-underline text-[12px] text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors duration-100"
            >
              <HelpIcon /> Help & Support
            </Link>
            <button className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded-xs border-none bg-transparent text-[12px] text-text-muted hover:text-text-primary hover:bg-bg-hover cursor-pointer text-left transition-colors duration-100">
              <SettingsIcon /> Settings
            </button>
          </>
        )} */}

        {/* User row */}
        <div className="relative mt-1" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-xs border-none bg-transparent cursor-pointer hover:bg-bg-hover transition-colors duration-100 ${collapsed && !isMobile ? "justify-center" : ""}`}
          >
            <UserAvatar initials={initials} size={22} role={user?.role} />
            {(!collapsed || isMobile) && (
              <>
                <span className="text-[12px] font-medium text-text-primary flex-1 text-left truncate">
                  {firstName || "User"}
                </span>
                <ChevronDown className="text-text-muted flex-shrink-0 -rotate-90" />
              </>
            )}
          </button>
          {userMenuOpen && (
            <div
              className={`absolute ${collapsed && !isMobile ? "left-full ml-2 bottom-0" : "bottom-full mb-1 left-0 right-0"} bg-bg-surface border border-border-subtle shadow-ds-md z-20 rounded-xs overflow-hidden w-48`}
            >
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  setViewProfileOpen(true);
                }}
                className="block w-full text-left px-3 py-2 text-[13px] text-text-primary hover:bg-bg-hover border-none bg-transparent cursor-pointer"
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  setViewInvitationsOpen(true);
                }}
                className="block w-full text-left px-3 py-2 text-[13px] text-text-primary hover:bg-bg-hover border-none bg-transparent cursor-pointer"
              >
                Invitations
              </button>
              <Link
                to="/info"
                onClick={() => setUserMenuOpen(false)}
                className="block px-3 py-2 text-[13px] text-text-primary hover:bg-bg-hover no-underline"
              >
                What's Prime?
              </Link>
              <Link
                to="/coming-soon"
                onClick={() => setUserMenuOpen(false)}
                className="block px-3 py-2 text-[13px] text-text-primary hover:bg-bg-hover no-underline"
              >
                Coming Soon!
              </Link>
              <div className="border-t border-border-subtle">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 text-[13px] text-error-text hover:bg-bg-hover border-none bg-transparent cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen flex bg-bg-base font-sans overflow-hidden">
      {/* Sidebar — desktop */}
      <aside
        className={`hidden md:flex flex-col bg-bg-sidebar border-r border-border-subtle flex-shrink-0 transition-all duration-200 ease-in-out overflow-hidden ${
          collapsed ? "w-[52px]" : "w-[220px]"
        }`}
      >
        {sidebarContent(false)}
      </aside>

      {/* Mobile hamburger trigger */}
      {/* <button
        className="md:hidden fixed top-3 left-3 z-50 w-8 h-8 flex items-center justify-center bg-bg-surface border border-border-subtle rounded-xs shadow-ds-sm text-text-secondary cursor-pointer"
        onClick={() => setMobileOpen(true)}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <line
            x1="2"
            y1="4"
            x2="13"
            y2="4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="2"
            y1="7.5"
            x2="13"
            y2="7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="2"
            y1="11"
            x2="13"
            y2="11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button> */}

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-text-primary/20"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            ref={mobileRef}
            onClick={(e) => e.stopPropagation()}
            className="h-full bg-bg-sidebar border-r border-border-subtle"
            style={{ width: 256 }}
          >
            {sidebarContent(true)}
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>

      {viewProfileOpen && user && (
        <ViewProfile
          user={user}
          isOpen={viewProfileOpen}
          toggleDialog={() => setViewProfileOpen(false)}
        />
      )}
      {viewInvitationsOpen && user && (
        <ViewInvitations
          user={user}
          isOpen={viewInvitationsOpen}
          toggleDialog={() => setViewInvitationsOpen(false)}
        />
      )}
    </div>
  );
}
