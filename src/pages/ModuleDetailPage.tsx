import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen, CheckCircle, Circle, ChevronRight, Lock } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { modules } from "../data/modules";

export default function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = modules.find((m) => m.id === moduleId);

  if (!module) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🔍</div>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.5rem", color: "#166534" }}>Module Not Found</h2>
          <p style={{ color: "#6b7280" }}>The module you are looking for does not exist.</p>
          <Link to="/dashboard" className="btn-primary">← Back to Dashboard</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const completedCount = 3;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fdfdf9" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${module.color}dd, ${module.color}aa)`, padding: "3rem 1.5rem 2.5rem", color: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Link to="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", marginBottom: "1.5rem", textDecoration: "none" }}>
            <ArrowLeft size={15} /> Back to Dashboard
          </Link>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ width: 72, height: 72, borderRadius: 18, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.25rem", flexShrink: 0 }}>
              {module.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 999, padding: "0.2rem 0.75rem", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                {module.subtitle}
              </div>
              <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 800, color: "white", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
                {module.title}
              </h1>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, maxWidth: 580, marginBottom: "1.5rem" }}>
                {module.description}
              </p>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {[
                  { icon: <Clock size={15} />, label: module.duration },
                  { icon: <BookOpen size={15} />, label: `${module.units} units` },
                  { icon: <CheckCircle size={15} />, label: `${completedCount}/${module.topics.length} completed` },
                ].map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.9)" }}>
                    {m.icon} {m.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: "2rem", background: "rgba(255,255,255,0.2)", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "white", borderRadius: 99, width: `${(completedCount / module.topics.length) * 100}%`, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ textAlign: "right", fontSize: "0.8125rem", color: "rgba(255,255,255,0.8)", marginTop: "0.375rem" }}>
            {Math.round((completedCount / module.topics.length) * 100)}% complete
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ padding: "3rem 1.5rem", maxWidth: 1000, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>

          {/* TOPICS LIST */}
          <div>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#166534", marginBottom: "1.25rem" }}>
              Course Topics
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {module.topics.map((topic, index) => {
                const done = index < completedCount;
                const unlocked = index <= completedCount;

                return (
                  <div
                    key={topic.id}
                    className={unlocked ? "card-hover" : ""}
                    style={{
                      background: done ? "#f0fdf4" : "white",
                      border: `1.5px solid ${done ? "#86efac" : "#e5e7eb"}`,
                      borderRadius: 14,
                      padding: "1.25rem",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      opacity: unlocked ? 1 : 0.6,
                      cursor: unlocked ? "pointer" : "not-allowed",
                    }}
                  >
                    <div style={{ flexShrink: 0, marginTop: 2 }}>
                      {done ? (
                        <CheckCircle size={22} color="#16a34a" fill="#dcfce7" />
                      ) : unlocked ? (
                        <Circle size={22} color="#d1d5db" />
                      ) : (
                        <Lock size={22} color="#d1d5db" />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#9ca3af" }}>Unit {index + 1}</span>
                        {done && <span style={{ fontSize: "0.7rem", background: "#dcfce7", color: "#16a34a", borderRadius: 999, padding: "0.1rem 0.5rem", fontWeight: 600 }}>Completed</span>}
                      </div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: done ? "#16a34a" : "#1a2e1a", marginBottom: "0.375rem" }}>{topic.title}</h3>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.6 }}>{topic.description}</p>
                    </div>
                    {unlocked && <ChevronRight size={18} color="#9ca3af" style={{ flexShrink: 0, marginTop: 4 }} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", position: "sticky", top: 80 }}>
            {/* Start button */}
            <div style={{ background: "white", borderRadius: 16, padding: "1.5rem", border: "1px solid #d1fae5", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{module.icon}</div>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#166534", marginBottom: "0.5rem" }}>Continue Learning</h3>
              <p style={{ fontSize: "0.8125rem", color: "#6b7280", marginBottom: "1.25rem" }}>
                Pick up from Unit {completedCount + 1}: <em>{module.topics[completedCount]?.title}</em>
              </p>
              <button
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => alert("Lesson player coming in Phase 2!")}
              >
                Continue Module
              </button>
            </div>

            {/* Module Info */}
            <div style={{ background: "#f0fdf4", borderRadius: 16, padding: "1.25rem", border: "1px solid #d1fae5" }}>
              <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.9375rem", fontWeight: 700, color: "#166534", marginBottom: "0.875rem" }}>Module Info</h4>
              {[
                { label: "Duration", value: module.duration },
                { label: "Total Units", value: `${module.units}` },
                { label: "Completed", value: `${completedCount} units` },
                { label: "Remaining", value: `${module.topics.length - completedCount} units` },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", padding: "0.4rem 0", borderBottom: "1px solid #dcfce7" }}>
                  <span style={{ color: "#6b7280" }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: "#166534" }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Other Modules */}
            <div style={{ background: "white", borderRadius: 16, padding: "1.25rem", border: "1px solid #d1fae5" }}>
              <h4 style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.9375rem", fontWeight: 700, color: "#166534", marginBottom: "0.875rem" }}>Other Modules</h4>
              {modules.filter((m) => m.id !== module.id).map((m) => (
                <Link key={m.id} to={`/modules/${m.id}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0", borderBottom: "1px solid #f3f4f6", textDecoration: "none", color: "inherit" }}>
                  <span style={{ fontSize: "1.25rem" }}>{m.icon}</span>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#374151", lineHeight: 1.4 }}>{m.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
