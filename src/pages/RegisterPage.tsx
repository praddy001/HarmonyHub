import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Leaf, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match.");
      return;
    }
    alert("Supabase is not connected yet. Please set up your .env.local credentials to enable registration.");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0fdf4, #dcfce7, #faf8f0)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
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
          <h1 style={{ fontSize: "1.625rem", fontWeight: 800, color: "#14532d", marginBottom: "0.375rem", textAlign: "center" }}>Create your account</h1>
          <p style={{ fontSize: "0.9375rem", color: "#6b7280", textAlign: "center", marginBottom: "1.75rem" }}>Join HarmonyHub and start your journey</p>

          {/* Notice */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", background: "#fef9c3", border: "1px solid #fde047", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1.5rem" }}>
            <AlertCircle size={16} color="#a16207" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: "0.8125rem", color: "#a16207", lineHeight: 1.5 }}>Authentication is not yet connected. Connect your Supabase project to enable registration.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: "1.125rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>Full name</label>
              <div style={{ position: "relative" }}>
                <User size={16} color="#9ca3af" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input id="reg-name" type="text" className="input-field" placeholder="Your full name" style={{ paddingLeft: "2.5rem" }} value={form.name} onChange={update("name")} required />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1.125rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>Email address</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} color="#9ca3af" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input id="reg-email" type="email" className="input-field" placeholder="you@university.edu" style={{ paddingLeft: "2.5rem" }} value={form.email} onChange={update("email")} required />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.125rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#9ca3af" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input id="reg-password" type={showPassword ? "text" : "password"} className="input-field" placeholder="At least 8 characters" style={{ paddingLeft: "2.5rem", paddingRight: "2.75rem" }} value={form.password} onChange={update("password")} required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0 }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "1.75rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>Confirm password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#9ca3af" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input id="reg-confirm" type={showPassword ? "text" : "password"} className="input-field" placeholder="Repeat your password" style={{ paddingLeft: "2.5rem" }} value={form.confirm} onChange={update("confirm")} required />
              </div>
            </div>

            <button id="reg-submit" type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.75rem", fontSize: "1rem" }}>
              Create Account
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#6b7280", marginTop: "1.5rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#16a34a", fontWeight: 600 }}>Log in</Link>
          </p>
        </div>

        <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.8125rem" }}>
          <Link to="/" style={{ color: "#6b7280" }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
