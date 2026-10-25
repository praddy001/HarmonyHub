import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, BookOpen } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #d1fae5",
        boxShadow: "0 1px 12px rgba(22,163,74,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Leaf size={20} color="white" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "#166534",
              letterSpacing: "-0.02em",
            }}
          >
            HarmonyHub
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden-mobile">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 8,
                fontWeight: 500,
                fontSize: "0.9375rem",
                color: pathname === l.href ? "#16a34a" : "#374151",
                background: pathname === l.href ? "#dcfce7" : "transparent",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="hidden-mobile">
          <Link to="/login" className="btn-secondary" style={{ padding: "0.45rem 1.1rem", fontSize: "0.875rem" }}>
            Log In
          </Link>
          <Link to="/register" className="btn-primary" style={{ padding: "0.45rem 1.1rem", fontSize: "0.875rem" }}>
            <BookOpen size={15} />
            Get Started
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            borderRadius: 8,
            color: "#166534",
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            background: "white",
            borderTop: "1px solid #d1fae5",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              style={{
                padding: "0.6rem 1rem",
                borderRadius: 8,
                fontWeight: 500,
                color: pathname === l.href ? "#16a34a" : "#374151",
                background: pathname === l.href ? "#dcfce7" : "transparent",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center", fontSize: "0.875rem" }}>Log In</Link>
            <Link to="/register" onClick={() => setOpen(false)} className="btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "0.875rem" }}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
