import { useNavigate } from "react-router-dom";
import BaseButton from "../../components/base/BaseButton";
import { PrimeLogo } from "../../components/base/Icons";

export default function ComingSoonPage() {
  const navigate = useNavigate();
  const navigateToDashboard = () => navigate("/dashboard");

  const upcomingFeatures = [
    {
      title: "Collaborative Contributions",
      desc: "Work on the same document simultaneously with teammates.",
    },
    {
      title: "Document History Tracking",
      desc: "See every change, who made it, and roll back to any version.",
    },
    {
      title: "Resource Permissions",
      desc: "Fine-grained access control for templates and reports.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-base font-sans flex items-center justify-center p-6">
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <PrimeLogo size={22} />
        <span className="font-bold text-sm tracking-tight">Prime</span>
      </div>

      <div className="w-full max-w-lg bg-bg-surface border border-border-subtle rounded-md p-8 md:p-10">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary-subtle border border-primary-border rounded-full text-[11px] font-semibold text-primary-text uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-base animate-badge-pulse" />
            Coming Soon
          </div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight mb-1.5">
            What's coming next
          </h1>
          <p className="text-sm text-text-secondary">
            We are working hard on bringing new features soon!
          </p>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          {upcomingFeatures.map((f) => (
            <div
              key={f.title}
              className="flex gap-3 items-start p-3 bg-bg-subtle rounded-xs border border-border-subtle"
            >
              <div className="w-7 h-7 rounded-xs bg-primary-subtle border border-primary-border flex items-center justify-center text-primary-base flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M4.5 7l1.8 1.8L9.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-text-primary">{f.title}</div>
                <div className="text-xs text-text-muted leading-relaxed mt-0.5">
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <BaseButton onClick={navigateToDashboard}>Go to Dashboard</BaseButton>
      </div>
    </div>
  );
}
