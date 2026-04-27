import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import BaseButton from "../../components/base/BaseButton";
import { PrimeLogo } from "../../components/base/Icons";

export default function InfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToDashboard = () => navigate("/dashboard");

  useEffect(() => {
    if (location.state?.newUser) {
      const updatedState = { ...location.state, newUser: false };
      window.history.replaceState(updatedState, "");
      window.location.reload();
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg-base font-sans">
      <header className="h-12 bg-bg-surface border-b border-border-subtle flex items-center px-6">
        <div className="flex items-center gap-2">
          <PrimeLogo size={22} />
          <span className="font-bold text-sm tracking-tight">Prime</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          About Prime
        </h1>
        <p className="text-text-secondary text-sm mb-10">
          Document workflows, built for teams.
        </p>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-text-primary">Welcome</h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Prime is a powerful tool designed to simplify and optimize the
            creation and management of document templates used in everyday
            business operations. With a user-friendly interface and powerful
            features, we aim to make your daily tasks easier and more efficient.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-text-primary">Key Features</h2>
          <ul className="space-y-2 text-sm text-text-secondary">
            {[
              "Real-Time Document Generation",
              "Capture and Attach Live Images",
              "Comprehensive Dashboard Analytics",
              "Customizable Document Templates",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-base" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3 text-text-primary">Getting Started</h2>
          <ul className="space-y-2 text-sm text-text-secondary">
            {[
              "Sign up for a new account (if you aren't already!)",
              "Build your first template — a base structure for your documents",
              "Create reports using your templates",
              "Analyze your usage on the dashboard",
            ].map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-base mt-2 flex-shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>

        <BaseButton onClick={navigateToDashboard}>Go to Dashboard</BaseButton>
      </div>
    </div>
  );
}
