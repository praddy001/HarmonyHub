import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Leaf, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notice] = useState("Supabase authentication is not yet connected. This form is a UI placeholder.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Supabase is not connected yet. Please set up your .env.local credentials to enable authentication.");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0fdf4, #dcfce7, #faf8f0)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #16a34a, #15803d)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Leaf size={22} color="white" strokeWidth={2.5} />
            </div>
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "1.375rem", color: "#166534" }}>HarmonyHub</span>
          </Link>
        </div>

        {/* Card */}
        <div style={{ background: "white", borderRadius: 20, padding: "2.5rem", boxShadow: "0 8px 40px rgba(22,163,74,0.12)", border: "1px solid #d1fae5" }}>
          <h1 style={{ fontSize: "1.625rem", fontWeight: 800, color: "#14532d", marginBottom: "0.375rem", textAlign: "center" }}>Welcome back</h1>
          <p style={{ fontSize: "0.9375rem", color: "#6b7280", textAlign: "center", marginBottom: "1.75rem" }}>Log in to continue your learning journey</p>

          {/* Notice */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", background: "#fef9c3", border: "1px solid #fde047", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1.5rem" }}>
            <AlertCircle size={16} color="#a16207" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: "0.8125rem", color: "#a16207", lineHeight: 1.5 }}>{notice}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>Email address</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} color="#9ca3af" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input
                  id="login-email"
                  type="email"
                  className="input-field"
                  placeholder="you@university.edu"
                  style={{ paddingLeft: "2.5rem" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#9ca3af" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="input-field"
                  placeholder="Enter your password"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.75rem" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "0.75rem", fontSize: "1rem" }}
            >
              Log In
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#6b7280", marginTop: "1.5rem" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#16a34a", fontWeight: 600 }}>Create one free</Link>
          </p>
        </div>

        <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.8125rem", color: "#9ca3af" }}>
          <Link to="/" style={{ color: "#6b7280" }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
