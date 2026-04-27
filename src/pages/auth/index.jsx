import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPasswordHandler,
  createUserWithEmailAndPasswordHandler,
  signInWithGoogleHandler,
} from "../../firebase/auth";
import { createUser } from "../../api/users";
import BaseDialog from "../../components/base/BaseDialog";
import BaseLoader from "../../components/base/BaseLoader";
import { PrimeLogo } from "../../components/base/Icons";

const FEATURES = [
  "Reusable report templates",
  "Role-based team access",
  "Usage analytics",
];

export default function AuthPage() {
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);
  const [dialog, setDialog] = useState({ state: false, content: "", title: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [existingUserData, setExistingUserData] = useState({
    email: "",
    password: "",
  });

  const showError = (content) =>
    setDialog({ state: true, content, title: "Something went wrong!" });

  const signupHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (newUserData.confirmPassword !== newUserData.password) {
        showError("Passwords don't match");
        setIsLoading(false);
        return;
      }
      const signupResponse = await createUserWithEmailAndPasswordHandler(
        newUserData.email,
        newUserData.password
      );
      await createUser({
        _id: signupResponse.user.uid,
        basicInformation: {
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          email: newUserData.email,
        },
        contactInformation: {
          address: null,
          phoneNumber: newUserData.phone,
        },
      });
      navigate("/info", { state: { newUser: true } });
    } catch (e) {
      console.log("Error Occurred: ", e);
      showError("Please check if all the fields entered are correct!");
    }
    setIsLoading(false);
  };

  const signInHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPasswordHandler(
        existingUserData.email,
        existingUserData.password
      );
      window.location.reload();
      navigate("/dashboard");
    } catch (e) {
      console.log("Error Occurred: ", e);
      showError("Please check if all the fields entered are correct!");
    }
    setIsLoading(false);
  };

  const googleHandler = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogleHandler();
      window.location.reload();
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      showError("Google sign-in failed.");
    }
    setIsLoading(false);
  };

  const updateField = (event, key) => {
    if (isNewUser) {
      setNewUserData((s) => ({ ...s, [key]: event.target.value }));
    } else {
      setExistingUserData((s) => ({ ...s, [key]: event.target.value }));
    }
  };

  const toggleDialog = () =>
    setDialog((s) => ({ ...s, state: !s.state }));

  const inputCls =
    "font-sans text-[13px] text-text-primary bg-bg-surface border border-border-default rounded-xs px-2.5 py-2 outline-none w-full focus:border-primary-base focus:shadow-ds-focus transition-all";
  const labelCls = "text-xs font-medium text-text-secondary";

  return (
    <div className="w-full h-screen flex font-sans bg-bg-base">
      {/* LEFT — branding */}
      <div className="hidden md:flex md:w-[44%] bg-primary-base p-12 flex-col relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="flex items-center gap-2 z-10">
          <div className="w-7 h-7 bg-white/15 rounded border border-white/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="9" height="12" rx="0.5" stroke="white" strokeWidth="1.3" />
              <line x1="3.5" y1="4.5" x2="8" y2="4.5" stroke="white" strokeWidth="1.1" />
              <line x1="3.5" y1="7" x2="8" y2="7" stroke="white" strokeWidth="1.1" />
              <line x1="3.5" y1="9.5" x2="6" y2="9.5" stroke="white" strokeWidth="1.1" />
            </svg>
          </div>
          <span className="font-bold text-base text-white tracking-tight">Prime</span>
        </div>
        <div className="flex-1 flex flex-col justify-center z-10">
          <div className="font-semibold text-3xl text-white leading-tight tracking-tight mb-4">
            Document workflows,<br />built for teams.
          </div>
          <div className="text-sm text-white/70 leading-relaxed max-w-xs">
            Create reports from templates, manage your organization, and track usage — all in one place.
          </div>
          <div className="flex flex-col gap-2.5 mt-8">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[13px] text-white/80">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-[11px] text-white/40 z-10">© 2025 Prime Reports</div>
      </div>

      {/* RIGHT — form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        {isLoading ? (
          <BaseLoader />
        ) : (
          <div className="w-full max-w-sm">
            {/* Mobile logo */}
            <div className="md:hidden mb-8 flex items-center gap-2">
              <PrimeLogo size={28} />
              <span className="font-bold text-base text-text-primary tracking-tight">Prime</span>
            </div>

            <div className="mb-8">
              <div className="font-semibold text-2xl text-text-primary tracking-tight mb-1.5">
                {isNewUser ? "Create your account" : "Sign in to Prime"}
              </div>
              <div className="text-[13px] text-text-muted">
                {isNewUser ? "Already a user? " : "Don't have an account? "}
                <span
                  className="text-primary-base cursor-pointer font-medium"
                  onClick={() => setIsNewUser(!isNewUser)}
                >
                  {isNewUser ? "Sign in" : "Sign up"}
                </span>
              </div>
            </div>

            {/* Google SSO */}
            <button
              onClick={googleHandler}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-bg-surface border border-border-default rounded-xs font-sans text-[13px] font-medium text-text-primary cursor-pointer mb-5 shadow-ds-xs hover:bg-bg-hover transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15.5 8.2c0-.6-.1-1.1-.2-1.7H8v3.2h4.2a3.6 3.6 0 0 1-1.5 2.4v2h2.4c1.4-1.3 2.4-3.2 2.4-5.9Z" fill="#4285F4" />
                <path d="M8 16c2.2 0 4-.7 5.3-2l-2.4-2a5 5 0 0 1-7.4-2.6H1v2.1A8 8 0 0 0 8 16Z" fill="#34A853" />
                <path d="M3.5 9.4A5 5 0 0 1 3.5 6.6V4.5H1A8 8 0 0 0 1 11.5l2.5-2.1Z" fill="#FBBC05" />
                <path d="M8 3.2a4.3 4.3 0 0 1 3 1.2l2.3-2.3A7.7 7.7 0 0 0 8 0 8 8 0 0 0 1 4.5l2.5 2.1A4.8 4.8 0 0 1 8 3.2Z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-border-subtle" />
              <span className="text-[11px] text-text-muted font-medium">or</span>
              <div className="flex-1 h-px bg-border-subtle" />
            </div>

            <form
              onSubmit={isNewUser ? signupHandler : signInHandler}
              className="flex flex-col gap-3.5 mb-5"
            >
              {isNewUser && (
                <div className="flex gap-2.5">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className={labelCls}>First Name</label>
                    <input
                      value={newUserData.firstName}
                      onChange={(e) => updateField(e, "firstName")}
                      placeholder="John"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className={labelCls}>Last Name</label>
                    <input
                      value={newUserData.lastName}
                      onChange={(e) => updateField(e, "lastName")}
                      placeholder="Doe"
                      className={inputCls}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  value={isNewUser ? newUserData.email : existingUserData.email}
                  onChange={(e) => updateField(e, "email")}
                  placeholder="you@company.com"
                  className={inputCls}
                />
              </div>

              {isNewUser && (
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Phone</label>
                  <input
                    value={newUserData.phone}
                    onChange={(e) => updateField(e, "phone")}
                    placeholder="Enter your primary contact"
                    className={inputCls}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className={labelCls}>Password</label>
                  {!isNewUser && (
                    <span className="text-[11px] text-primary-base cursor-pointer font-medium">
                      Forgot?
                    </span>
                  )}
                </div>
                <input
                  type="password"
                  value={isNewUser ? newUserData.password : existingUserData.password}
                  onChange={(e) => updateField(e, "password")}
                  placeholder={isNewUser ? "At least 6 characters" : "••••••••"}
                  className={inputCls}
                />
              </div>

              {isNewUser && (
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Confirm Password</label>
                  <input
                    type="password"
                    value={newUserData.confirmPassword}
                    onChange={(e) => updateField(e, "confirmPassword")}
                    placeholder="••••••••"
                    className={inputCls}
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center py-2.5 px-4 bg-primary-base border-none rounded-xs font-sans text-[13px] font-semibold text-white cursor-pointer hover:bg-primary-hover transition-colors"
              >
                {isNewUser ? "Create Account" : "Sign in"}
              </button>
            </form>

            <p className="text-[11px] text-text-muted text-center mt-5 leading-relaxed">
              By signing in, you agree to our{" "}
              <span className="text-primary-base cursor-pointer">Terms</span> and{" "}
              <span className="text-primary-base cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        )}
      </div>

      <BaseDialog
        title={dialog.title}
        toggleDialog={toggleDialog}
        isOpen={dialog.state}
        text={dialog.content}
      />
    </div>
  );
}
