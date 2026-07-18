import bspLogo from "@/imports/bsp-logonew.png"
import headerBg from "@/imports/Header.png"

const NAV_LINKS = ["Space", "Score", "Sign in"]

const CARDS = [
  {
    id: "space",
    tag: "SPACE",
    aiLabel: "AI-enabled",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#6366f1" opacity="0.15" />
        <path d="M10 22 C10 16 14 10 16 10 C18 10 22 16 22 22" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="16" cy="10" r="2.5" fill="#6366f1"/>
        <path d="M8 22 h16" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#6366f1",
    bgAccent: "#ede9fe",
    title: "Privacy Assessment Copilot",
    desc: "Guides PIA completion and generates a secure, review-ready report.",
    features: [
      {
        icon: "⚙️",
        label: "Regulatory-ready workflow",
        detail: "Built around BSP standards and requirements.",
      },
      {
        icon: "🛡️",
        label: "Secure by design",
        detail: "Your data is protected at every step.",
      },
    ],
    cta: "Open Space",
  },
  {
    id: "score",
    tag: "SCORE",
    aiLabel: "AI-enabled",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#0d9488" opacity="0.15" />
        <path d="M10 20 L14 15 L18 17 L22 11" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="22" cy="11" r="2" fill="#0d9488"/>
      </svg>
    ),
    color: "#0d9488",
    bgAccent: "#d1fae5",
    title: "Supplier Risk Review",
    desc: "Uploads vendor documents and checks compliance against policy and regulation.",
    features: [
      {
        icon: "⚙️",
        label: "Regulatory-ready workflow",
        detail: "Standardized checks aligned with BSP rules.",
      },
      {
        icon: "🛡️",
        label: "Secure by design",
        detail: "End-to-end encryption and access controls.",
      },
    ],
    cta: "Open Score",
  },
  {
    id: "sign",
    tag: "SIGN",
    aiLabel: "AI-enabled",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#7c3aed" opacity="0.15" />
        <path d="M11 21 L14 18 M16 10 C16 10 22 13 20 18 C19 21 15 23 12 21" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M10 24 L13 21" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#7c3aed",
    bgAccent: "#ede9fe",
    title: "ISMS Governance Assistant",
    desc: "Returns questions, context answers from trusted BSP information security standards.",
    features: [
      {
        icon: "⚙️",
        label: "Regulatory-ready workflow",
        detail: "Returns contextual answers from trusted BSP information security standards.",
      },
      {
        icon: "🛡️",
        label: "Secure by design",
        detail: "Verified sources. Private and compliant.",
      },
    ],
    cta: "Open Sign",
  },
]

function GovSeal() {
  return (
    <img
      src={bspLogo}
      alt="Bangko Sentral ng Pilipinas seal"
      style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
    />
  )
}

function Card({ card }: { card: (typeof CARDS)[0] }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: "28px 28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        boxShadow: "0 2px 16px rgba(15,23,42,0.08)",
        border: "1px solid rgba(226,232,240,0.8)",
      }}
    >
      {/* Tag + AI badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {card.icon}
          <span
            style={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.12em",
              color: card.color,
              textTransform: "uppercase",
            }}
          >
            {card.tag}
          </span>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "#64748b",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: "2px 8px",
            textTransform: "uppercase",
          }}
        >
          {card.aiLabel}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: "#0f172a",
          margin: "0 0 8px",
          lineHeight: 1.3,
        }}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          color: "#64748b",
          lineHeight: 1.6,
          margin: "0 0 20px",
        }}
      >
        {card.desc}
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: "#f1f5f9", marginBottom: 18 }} />

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
        {card.features.map((f) => (
          <div key={f.label} style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: card.bgAccent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                flexShrink: 0,
              }}
            >
              {f.icon}
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", margin: "0 0 2px" }}>
                {f.label}
              </p>
              <p style={{ fontSize: 11.5, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                {f.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          padding: "11px 0",
          borderRadius: 8,
          border: "none",
          background: card.color,
          color: "white",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.02em",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {card.cta}
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header / Hero */}
      <header
        style={{
          position: "relative",
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        {/* Dark overlay so text stays legible over the background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(5,15,40,0.82) 0%, rgba(5,15,40,0.55) 60%, rgba(5,15,40,0.2) 100%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Header: logo left, text center-left, nav right */}
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "space-between",
              minHeight: 110,
            }}
          >
            {/* Logo + text block */}
            <div style={{ display: "flex", alignItems: "stretch" }}>
              {/* Logo fills full header height */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 20px 14px 32px",
                  borderRight: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <GovSeal />
              </div>

              {/* Org label + title + subtitle */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "14px 32px 14px 20px",
                  gap: 4,
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  Technology and Digital Innovation Office
                </p>
                <h1
                  style={{
                    fontSize: "clamp(20px, 2.8vw, 32px)",
                    fontWeight: 800,
                    color: "white",
                    lineHeight: 1.15,
                    margin: 0,
                    letterSpacing: "-0.02em",
                    textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                  }}
                >
                  Digital Compliance Experience
                </h1>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.5 }}>
                  AI-enabled tools that make compliance simpler, smarter, and secure.
                </p>
              </div>
            </div>

            {/* Nav links */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, paddingRight: 36 }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 16,
                    fontWeight: 500,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    whiteSpace: "nowrap",
                  }}
                >
                  {link === "Space" && (
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                      <circle cx="7" cy="7" r="2" fill="currentColor" />
                    </svg>
                  )}
                  {link === "Score" && (
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                      <path d="M2 10 L5 7 L8 9 L12 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                    </svg>
                  )}
                  {link === "Sign in" && (
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                      <path d="M2 12 C2 9.5 4 8 7 8 C10 8 12 9.5 12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                    </svg>
                  )}
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Cards */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 32px 64px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {CARDS.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #e2e8f0",
          padding: "18px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={bspLogo}
            alt="Bangko Sentral ng Pilipinas"
            style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }}
          />
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Technology and Digital Innovation Office &bull; Bangko Sentral ng Pilipinas
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path d="M7 1 L9 5 L13 5.5 L10 8.5 L10.5 13 L7 11 L3.5 13 L4 8.5 L1 5.5 L5 5 Z" fill="#0d9488" />
          </svg>
          <span style={{ fontSize: 11.5, color: "#64748b", letterSpacing: "0.08em" }}>
            Secure &bull; Trusted &bull; Compliant
          </span>
        </div>
      </footer>
    </div>
  )
}
