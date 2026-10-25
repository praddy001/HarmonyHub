import { Link } from "react-router-dom";
import { BookOpen, Clock, Award, TrendingUp, ArrowRight, Bell, User } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ModuleCard from "../components/ui/ModuleCard";
import { modules } from "../data/modules";

const mockProgress = {
  "harmony-human-being": 65,
  "harmony-family-society": 30,
  "harmony-nature-existence": 0,
  "professional-ethics": 12,
};

const recentActivity = [
  { icon: "📖", text: "Completed: Understanding the Self (I)", time: "2 hours ago", module: "harmony-human-being" },
  { icon: "✅", text: "Finished quiz: Desires, Thoughts & Expectations", time: "Yesterday", module: "harmony-human-being" },
  { icon: "🎯", text: "Started: Trust as the Foundation", time: "2 days ago", module: "harmony-family-society" },
];

export default function DashboardPage() {
  const totalProgress = Math.round(
    Object.values(mockProgress).reduce((a, b) => a + b, 0) / Object.keys(mockProgress).length
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fdfdf9" }}>
      <Navbar />

      {/* HEADER */}
      <section style={{ background: "linear-gradient(135deg, #166534, #15803d)", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
              🎓
            </div>
            <div>
              <p style={{ color: "#bbf7d0", fontSize: "0.875rem", marginBottom: "0.25rem" }}>Welcome back,</p>
              <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.01em" }}>Arjun Student</h1>
              <p style={{ color: "#86efac", fontSize: "0.8125rem", marginTop: "0.125rem" }}>B.Tech CSE · Year 3 · AICTE UHV Course</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "0.5rem 0.75rem", color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem" }}>
              <Bell size={15} /> Notifications
            </button>
            <button style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "0.5rem 0.75rem", color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem" }}>
              <User size={15} /> Profile
            </button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem", width: "100%" }}>

        {/* STATS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {[
            { icon: <TrendingUp size={20} color="#16a34a" />, label: "Overall Progress", value: `${totalProgress}%`, bg: "#f0fdf4", border: "#d1fae5" },
            { icon: <BookOpen size={20} color="#0891b2" />, label: "Modules Enrolled", value: "4 / 4", bg: "#f0f9ff", border: "#bae6fd" },
            { icon: <Clock size={20} color="#7c3aed" />, label: "Time Spent", value: "12h 40m", bg: "#f5f3ff", border: "#ddd6fe" },
            { icon: <Award size={20} color="#d97706" />, label: "Topics Completed", value: "10 / 32", bg: "#fffbeb", border: "#fde68a" },
          ].map((s) => (
            <div key={s.label} style={{ background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: 14, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                {s.icon}
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#1a2e1a", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }}>
          {/* MODULES GRID */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#166534" }}>Your Modules</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {modules.map((m) => (
                <div key={m.id}>
                  <ModuleCard module={m} />
                  {/* Progress bar */}
                  <div style={{ marginTop: "0.5rem", padding: "0 0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.3rem" }}>
                      <span>Progress</span>
                      <span style={{ fontWeight: 600, color: m.color }}>{mockProgress[m.id as keyof typeof mockProgress]}%</span>
                    </div>
                    <div style={{ height: 6, background: "#e5e7eb", borderRadius: 99 }}>
                      <div style={{ height: "100%", background: `linear-gradient(90deg, ${m.color}, ${m.colorLight})`, borderRadius: 99, width: `${mockProgress[m.id as keyof typeof mockProgress]}%`, transition: "width 0.4s ease" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Overall progress ring */}
            <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", border: "1px solid #d1fae5", textAlign: "center" }}>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#166534", marginBottom: "1rem" }}>Overall Progress</h3>
              <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 1rem" }}>
                <svg viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }}>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#d1fae5" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#16a34a" strokeWidth="3"
                    strokeDasharray={`${totalProgress} ${100 - totalProgress}`}
                    strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontWeight: 800, color: "#166534", fontFamily: "Outfit, sans-serif" }}>
                  {totalProgress}%
                </div>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "#6b7280" }}>Keep going — you're doing great!</p>
            </div>

            {/* Recent Activity */}
            <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", border: "1px solid #d1fae5" }}>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#166534", marginBottom: "1rem" }}>Recent Activity</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {recentActivity.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", flexShrink: 0 }}>{a.icon}</div>
                    <div>
                      <p style={{ fontSize: "0.8125rem", color: "#1a2e1a", lineHeight: 1.4 }}>{a.text}</p>
                      <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.125rem" }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Learning CTA */}
            <Link
              to="/modules/harmony-human-being"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg, #16a34a, #15803d)", borderRadius: 14, padding: "1.25rem 1.5rem", color: "white", textDecoration: "none" }}
            >
              <div>
                <p style={{ fontSize: "0.75rem", color: "#bbf7d0", marginBottom: "0.25rem" }}>Continue where you left off</p>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "0.9375rem" }}>Harmony in Human Being</p>
              </div>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <Footer />
    </div>
  );
}
