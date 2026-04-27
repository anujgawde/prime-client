/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"DM Mono"', '"JetBrains Mono"', "monospace"],
      },
      colors: {
        // Backgrounds
        "bg-base": "#F8F6FC",
        "bg-surface": "#ffffff",
        "bg-subtle": "#f1eff8",
        "bg-hover": "#E4E0EC",
        // Borders
        "border-subtle": "#E4E0EC",
        "border-default": "#CCCAD2",
        "border-strong": "#8E8A9C",
        // Text
        "text-primary": "#353148",
        "text-secondary": "#8E8A9C",
        "text-muted": "#CCCAD2",
        "text-disabled": "#d8d6de",
        // Primary (Purple Anemone)
        primary: {
          DEFAULT: "#8C60F3",
          base: "#8C60F3",
          hover: "#7A4EE0",
          active: "#6A3ECE",
          subtle: "#F8F6FC",
          border: "#c8b5f5",
          text: "#6A3ECE",
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
        xs: "8px",
        sm: "6px",
        md: "10px",
      },
      boxShadow: {
        "ds-xs": "0 1px 2px rgba(0,0,0,0.05)",
        "ds-sm": "0 1px 3px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)",
        "ds-md": "0 3px 10px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        "ds-lg": "0 8px 24px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)",
        "ds-xl": "0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
        "ds-focus": "0 0 0 3px #c8b5f5",
      },
      keyframes: {
        spin: { to: { transform: "rotate(360deg)" } },
        blink: { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0 } },
        "glow-pulse": {
          "0%": { opacity: 0.6, transform: "translateX(-50%) scale(1)" },
          "100%": { opacity: 1, transform: "translateX(-50%) scale(1.15)" },
        },
        "badge-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(140,96,243,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(140,96,243,0)" },
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
