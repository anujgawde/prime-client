/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        // Backgrounds
        "bg-base": "#ffffff",
        "bg-sidebar": "#F9F8F7",
        "bg-surface": "#ffffff",
        "bg-subtle": "#EEF0F3",
        "bg-hover": "#F0EFED",
        "bg-sidebar-active": "#EAE9E5",
        // Borders
        "border-subtle": "#E4E7EC",
        "border-default": "#D0D5DD",
        "border-strong": "#98A2B3",
        // Text
        "text-primary": "#2C2C2B",
        "text-secondary": "#5F5E59",
        "text-muted": "#8E8B86",
        "text-disabled": "#D0D5DD",
        // Primary (Coda Blue)
        primary: {
          DEFAULT: "#2B6CB0",
          base: "#2B6CB0",
          hover: "#2563A8",
          active: "#1D4ED8",
          subtle: "#EFF6FF",
          border: "#BFDBFE",
          text: "#1E40AF",
        },
        // Semantic (CSS vars defined in index.css for OKLCH)
        success: {
          DEFAULT: "var(--color-success-base)",
          base: "var(--color-success-base)",
          subtle: "var(--color-success-subtle)",
          text: "var(--color-success-text)",
          border: "var(--color-success-border)",
        },
        warning: {
          DEFAULT: "var(--color-warning-base)",
          base: "var(--color-warning-base)",
          subtle: "var(--color-warning-subtle)",
          text: "var(--color-warning-text)",
          border: "var(--color-warning-border)",
        },
        error: {
          DEFAULT: "var(--color-error-base)",
          base: "var(--color-error-base)",
          subtle: "var(--color-error-subtle)",
          text: "var(--color-error-text)",
          border: "var(--color-error-border)",
        },
        info: {
          DEFAULT: "var(--color-info-base)",
          base: "var(--color-info-base)",
          subtle: "var(--color-info-subtle)",
          text: "var(--color-info-text)",
          border: "var(--color-info-border)",
        },
        "super-admin": {
          base: "var(--color-super-admin-base)",
          subtle: "var(--color-super-admin-subtle)",
          border: "var(--color-super-admin-border)",
        },
        admin: {
          base: "var(--color-admin-base)",
          subtle: "var(--color-admin-subtle)",
          border: "var(--color-admin-border)",
        },
        member: {
          base: "var(--color-member-base)",
          subtle: "var(--color-member-subtle)",
          border: "var(--color-member-border)",
        },
        // Legacy
        lavender: "#788BFF",
        danger: "#CC0000",
        "lavender-light": "#BFD7FF",
        "background-grey": "#E7E7E7",
        "document-primary": "#4285F4",
        "template-primary": "#ff5005",
      },
      borderRadius: {
        xs: "6px",
        sm: "4px",
        md: "8px",
      },
      boxShadow: {
        "ds-xs": "0 1px 2px rgba(0,0,0,0.05)",
        "ds-sm": "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
        "ds-md": "0 4px 12px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.03)",
        "ds-lg": "0 8px 24px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.03)",
        "ds-xl": "0 16px 48px rgba(0,0,0,0.11), 0 0 0 1px rgba(0,0,0,0.03)",
        "ds-focus": "0 0 0 3px #BFDBFE",
      },
      keyframes: {
        spin: { to: { transform: "rotate(360deg)" } },
        blink: { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0 } },
        "glow-pulse": {
          "0%": { opacity: 0.6, transform: "translateX(-50%) scale(1)" },
          "100%": { opacity: 1, transform: "translateX(-50%) scale(1.15)" },
        },
        "badge-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(43,108,176,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(43,108,176,0)" },
        },
      },
      animation: {
        spin: "spin 0.7s linear infinite",
        blink: "blink 1.2s step-end infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite alternate",
        "badge-pulse": "badge-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
