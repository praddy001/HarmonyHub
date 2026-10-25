import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Leaf, Star, ChevronDown } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ModuleCard from "../components/ui/ModuleCard";
import { modules } from "../data/modules";

const stats = [
  { label: "Modules", value: "4", icon: "📚" },
  { label: "Topics", value: "32", icon: "🎯" },
  { label: "Students", value: "500+", icon: "🎓" },
  { label: "Universities", value: "12", icon: "🏛️" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "B.Tech CSE, Year 3",
    text: "HarmonyHub completely changed the way I think about my relationships. The module on Family & Society helped me reconnect with my parents.",
    avatar: "🧑‍🎓",
  },
  {
    name: "Arjun Mehta",
    role: "MBA Student",
    text: "Professional Ethics used to feel abstract. Now I have real frameworks for the dilemmas I face in my internship. Highly recommended.",
    avatar: "👨‍💼",
  },
  {
    name: "Sneha Patel",
    role: "B.Com, Year 2",
    text: "I never thought an online course could make me introspect this deeply. The self-paced format is perfect for busy college life.",
    avatar: "👩‍💻",
  },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* HERO */}
      <section className="bg-hero" style={{ padding: "5rem 1.5rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(134,239,172,0.25)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(187,247,208,0.3)", filter: "blur(50px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div
            className="badge"
            style={{ background: "#dcfce7", color: "#16a34a", margin: "0 auto 1.5rem", display: "inline-flex" }}
          >
            <Leaf size={13} /> Universal Human Values · Professional Ethics
          </div>

          <h1
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              fontWeight: 800,
              color: "#14532d",
              marginBottom: "1.25rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Understand Yourself.{" "}
            <span className="text-gradient">Build Better Relationships.</span>{" "}
            Live in Harmony.
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.1875rem)", color: "#374151", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 600, margin: "0 auto 2.5rem" }}>
            HarmonyHub is an interactive learning platform that brings Universal Human Values and Professional Ethics to life — through guided modules, reflective exercises, and practical wisdom for college students.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" className="btn-primary" style={{ fontSize: "1rem", padding: "0.75rem 2rem" }}>
              <BookOpen size={18} /> Start Learning — It's Free
            </Link>
            <Link to="/about" className="btn-secondary" style={{ fontSize: "1rem", padding: "0.75rem 2rem" }}>
              Learn More <ArrowRight size={16} />
            </Link>
          </div>

          {/* scroll cue */}
          <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", color: "#6b7280", fontSize: "0.8125rem" }}>
            <span>Scroll to explore</span>
            <ChevronDown size={18} style={{ animation: "bounce 2s infinite" }} />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "white", padding: "2.5rem 1.5rem", borderBottom: "1px solid #d1fae5" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.5rem", textAlign: "center" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>{s.icon}</div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "2rem", fontWeight: 800, color: "#16a34a", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MODULES */}
      <section style={{ padding: "5rem 1.5rem", background: "#fdfdf9" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-title">Four Paths to Harmony</h2>
            <p className="section-subtitle" style={{ margin: "0.75rem auto 0", textAlign: "center" }}>
              Each module is a self-contained journey — grounded in the UHV curriculum and enriched with interactive content.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {modules.map((m) => <ModuleCard key={m.id} module={m} />)}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section style={{ background: "linear-gradient(135deg, #166534, #14532d)", padding: "5rem 1.5rem", color: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "1rem", color: "white" }}>
            Why HarmonyHub?
          </h2>
          <p style={{ color: "#bbf7d0", fontSize: "1.0625rem", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 3rem" }}>
            Most UHV courses feel dry and theoretical. HarmonyHub makes these timeless values tangible, relatable, and actionable for today's students.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", textAlign: "left" }}>
            {[
              { icon: "🎯", title: "Structured Learning", desc: "32 well-organized topics across 4 modules, aligned with UHV course syllabus." },
              { icon: "💡", title: "Reflective Exercises", desc: "Activities designed to help you examine your own values and assumptions." },
              { icon: "🌐", title: "Self-Paced", desc: "Learn at your own speed — revisit lessons anytime, anywhere." },
              { icon: "🤝", title: "Community-Driven", desc: "Discuss ideas with peers, share reflections, grow together." },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(134,239,172,0.2)",
                  borderRadius: 16,
                  padding: "1.5rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.0625rem", fontWeight: 700, color: "white", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#86efac", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "5rem 1.5rem", background: "#f0fdf4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-title">What Students Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="card-hover"
                style={{ background: "white", borderRadius: 16, padding: "1.75rem", border: "1px solid #d1fae5", boxShadow: "0 2px 10px rgba(22,163,74,0.07)" }}
              >
                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} color="#16a34a" fill="#16a34a" />)}
                </div>
                <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.7, marginBottom: "1.25rem", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#1a2e1a" }}>{t.name}</div>
                    <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: "#16a34a", padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 800, color: "white", marginBottom: "0.75rem" }}>
            Ready to Begin Your Journey?
          </h2>
          <p style={{ color: "#bbf7d0", fontSize: "1.0625rem", marginBottom: "2rem", lineHeight: 1.7 }}>
            Join hundreds of students exploring values-based living through HarmonyHub.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" style={{ background: "white", color: "#16a34a", fontWeight: 700, padding: "0.75rem 2rem", borderRadius: 10, display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", textDecoration: "none", transition: "all 0.2s" }}>
              <Users size={18} /> Create Free Account
            </Link>
            <Link to="/about" style={{ background: "transparent", color: "white", fontWeight: 600, padding: "0.75rem 2rem", borderRadius: 10, display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", textDecoration: "none", border: "2px solid rgba(255,255,255,0.6)", transition: "all 0.2s" }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .hidden-mobile { display: flex !important; }
        .show-mobile { display: none !important; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
