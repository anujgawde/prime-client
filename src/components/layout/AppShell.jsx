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
  ChevronDown,
  SearchIcon,
  HelpIcon,
  SettingsIcon,
} from "../base/Icons";
import ViewProfile from "../dialogs/profile/ViewProfile";
import ViewInvitations from "../dialogs/users/ViewInvitations";

const NAV_ITEMS = [
  { id: "dashboard", label: "Home", path: "/dashboard", Icon: HomeIcon },
  { id: "reports", label: "Reports", path: "/reports", Icon: ReportsIcon },
  { id: "templates", label: "Templates", path: "/templates", Icon: TemplatesIcon },
  { id: "organization", label: "Organization", path: "/organization", Icon: OrgIcon },
];

export default function AppShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [viewInvitationsOpen, setViewInvitationsOpen] = useState(false);
  const menuRef = useRef(null);
  const mobileRef = useRef(null);

  const user = auth.currentUser;
  const firstName = user?.basicInformation?.firstName || "";
  const lastName = user?.basicInformation?.lastName || "";
  const initials = getInitials(firstName, lastName);
  const orgName = user?.organization?.name || "Personal";

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target)) setMobileNavOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOutHandler();
    navigate("/auth");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="w-full h-screen flex flex-col bg-bg-base font-sans overflow-hidden">
      {/* Top Nav */}
      <header className="h-12 bg-bg-surface border-b border-border-subtle flex items-center px-4 gap-0 flex-shrink-0 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        {/* Mobile menu toggle */}
        <button
          className="md:hidden mr-2 p-1.5 hover:bg-bg-hover rounded-xs border-none bg-transparent cursor-pointer"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line x1="3" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-1.5 mr-6 no-underline">
          <PrimeLogo size={22} />
          <span className="font-bold text-sm text-text-primary tracking-tight">Prime</span>
        </Link>

        {/* Org selector */}
        <button className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-xs border border-border-subtle bg-transparent cursor-pointer font-sans hover:bg-bg-hover">
          <span className="text-xs text-text-secondary font-medium">{orgName}</span>
          <ChevronDown className="text-text-muted" />
        </button>

        <div className="flex-1" />

        {/* Search */}
        <div className="hidden md:flex items-center gap-1.5 bg-bg-subtle border border-border-subtle rounded-xs px-2.5 py-1 w-52 mr-3">
          <SearchIcon className="text-text-muted" />
          <span className="text-xs text-text-muted">Search…</span>
          <span className="ml-auto text-[10px] text-text-disabled font-mono">⌘K</span>
        </div>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <div
            className="flex items-center gap-2 cursor-pointer px-1.5 py-1 rounded-xs hover:bg-bg-hover"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <UserAvatar initials={initials} size={26} role={user?.role} />
            <span className="hidden md:block text-xs font-medium text-text-primary">
              {firstName || "User"}
            </span>
            <ChevronDown className="text-text-muted" />
          </div>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-bg-surface border border-border-subtle shadow-ds-md z-20 rounded-xs overflow-hidden">
              <button
                onClick={() => { setMenuOpen(false); setViewProfileOpen(true); }}
                className="block w-full text-left px-3 py-2 text-[13px] text-text-primary hover:bg-bg-hover border-none bg-transparent cursor-pointer"
              >
                View Profile
              </button>
              <button
                onClick={() => { setMenuOpen(false); setViewInvitationsOpen(true); }}
                className="block w-full text-left px-3 py-2 text-[13px] text-text-primary hover:bg-bg-hover border-none bg-transparent cursor-pointer"
              >
                Invitations
              </button>
              <Link
                to="/info"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-[13px] text-text-primary hover:bg-bg-hover no-underline"
              >
                What's Prime?
              </Link>
              <Link
                to="/coming-soon"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-[13px] text-text-primary hover:bg-bg-hover no-underline"
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
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - desktop */}
        <nav className="hidden md:flex w-[200px] bg-bg-surface border-r border-border-subtle px-2 py-2.5 flex-col gap-px flex-shrink-0">
          <div className="px-2 pt-1 pb-1.5 mb-0.5">
            <span className="text-[10px] font-semibold tracking-[0.07em] uppercase text-text-muted">
              Workspace
            </span>
          </div>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-xs no-underline text-[13px] transition-all duration-100 ${
                  active
                    ? "bg-primary-subtle text-primary-text font-medium"
                    : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
                }`}
              >
                <span className={active ? "text-primary-base" : "opacity-70"}>
                  <item.Icon />
                </span>
                {item.label}
              </Link>
            );
          })}
          <div className="flex-1" />
          <div className="border-t border-border-subtle pt-2 mt-2">
            <Link
              to="/info"
              className="flex items-center gap-2 w-full px-2 py-1.5 rounded-xs no-underline text-xs text-text-muted hover:text-text-primary hover:bg-bg-hover"
            >
              <HelpIcon /> Help & Support
            </Link>
            <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-xs border-none bg-transparent text-xs text-text-muted hover:text-text-primary hover:bg-bg-hover cursor-pointer text-left">
              <SettingsIcon /> Settings
            </button>
          </div>
        </nav>

        {/* Sidebar - mobile drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 md:hidden bg-text-primary/30" onClick={() => setMobileNavOpen(false)}>
            <nav
              ref={mobileRef}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg-surface w-72 h-full px-3 py-4 flex flex-col gap-px"
            >
              <div className="px-2 pt-1 pb-3 flex justify-between items-center">
                <span className="text-base font-semibold">Menu</span>
                <button onClick={() => setMobileNavOpen(false)} className="border-none bg-transparent text-xl text-text-muted">×</button>
              </div>
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-xs no-underline text-sm ${
                      active ? "bg-primary-subtle text-primary-text font-medium" : "text-text-secondary hover:bg-bg-hover"
                    }`}
                  >
                    <item.Icon /> {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

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
