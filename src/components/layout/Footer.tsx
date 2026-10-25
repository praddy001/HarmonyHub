import { Link } from "react-router-dom";
import { Leaf, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#14532d", color: "#bbf7d0", padding: "3rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Leaf size={18} color="#86efac" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.125rem", color: "white" }}>HarmonyHub</span>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#86efac", maxWidth: 240 }}>
              An educational platform for Universal Human Values and Professional Ethics — for a thoughtful, purposeful life.
            </p>
          </div>

          <div>
            <h4 style={{ color: "white", fontFamily: "Outfit, sans-serif", fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.9375rem" }}>Explore</h4>
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About HarmonyHub" },
              { to: "/dashboard", label: "Student Dashboard" },
            ].map((l) => (
              <Link key={l.to} to={l.to} style={{ display: "block", color: "#86efac", fontSize: "0.875rem", marginBottom: "0.4rem", transition: "color 0.2s" }}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ color: "white", fontFamily: "Outfit, sans-serif", fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.9375rem" }}>Modules</h4>
            {[
              { to: "/modules/harmony-human-being", label: "Harmony in Human Being" },
              { to: "/modules/harmony-family-society", label: "Family & Society" },
              { to: "/modules/harmony-nature-existence", label: "Nature & Existence" },
              { to: "/modules/professional-ethics", label: "Professional Ethics" },
            ].map((l) => (
              <Link key={l.to} to={l.to} style={{ display: "block", color: "#86efac", fontSize: "0.875rem", marginBottom: "0.4rem" }}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ color: "white", fontFamily: "Outfit, sans-serif", fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.9375rem" }}>Account</h4>
            {[
              { to: "/login", label: "Log In" },
              { to: "/register", label: "Register" },
            ].map((l) => (
              <Link key={l.to} to={l.to} style={{ display: "block", color: "#86efac", fontSize: "0.875rem", marginBottom: "0.4rem" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(134,239,172,0.2)", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem", color: "#86efac", fontSize: "0.8125rem" }}>
          <span>Made with</span>
          <Heart size={13} color="#4ade80" fill="#4ade80" />
          <span>for the UHV course · HarmonyHub © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
