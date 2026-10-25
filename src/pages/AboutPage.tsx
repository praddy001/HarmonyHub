import { Leaf, Target, Eye, BookOpen } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const team = [
  { name: "Dr. Anita Verma", role: "Course Coordinator — UHV", avatar: "👩‍🏫" },
  { name: "Prof. Rajesh Kumar", role: "Module Designer — Ethics", avatar: "👨‍🏫" },
  { name: "Priya Iyer", role: "Student Lead Developer", avatar: "👩‍💻" },
  { name: "Karan Singh", role: "UI/UX Designer", avatar: "🎨" },
];

const values = [
  { icon: "🧘", title: "Self-Awareness", desc: "We believe lasting change begins with understanding oneself — thoughts, feelings, and desires." },
  { icon: "🌱", title: "Growth Mindset", desc: "Values are not fixed. They grow and deepen through reflection, dialogue, and experience." },
  { icon: "🤝", title: "Mutual Fulfilment", desc: "Healthy relationships are built on trust, respect, and genuine care — not transactions." },
  { icon: "🌍", title: "Co-existence", desc: "We are part of a larger natural and social order. Harmony means recognizing our responsibilities." },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7, #faf8f0)", padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg, #16a34a, #15803d)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <Leaf size={34} color="white" strokeWidth={2} />
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#14532d", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            About HarmonyHub
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#374151", lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>
            HarmonyHub is a college project built to make Universal Human Values (UHV) and Professional Ethics meaningful, engaging, and accessible for every student.
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {[
            {
              icon: <Target size={28} color="#16a34a" />,
              title: "Our Mission",
              text: "To make the principles of Universal Human Values tangible and actionable for students — helping them build a foundation for ethical, fulfilling, and harmonious lives.",
            },
            {
              icon: <Eye size={28} color="#16a34a" />,
              title: "Our Vision",
              text: "A world where education nurtures not just skills and knowledge, but wisdom — where graduates are equipped to contribute positively to their families, communities, and the planet.",
            },
          ].map((item) => (
            <div key={item.title} style={{ background: "#f0fdf4", borderRadius: 16, padding: "2rem", border: "1px solid #d1fae5" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "white", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", boxShadow: "0 2px 8px rgba(22,163,74,0.15)" }}>
                {item.icon}
              </div>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#166534", marginBottom: "0.75rem" }}>{item.title}</h2>
              <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.75 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "#fdfdf9" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "1rem" }}>What is UHV?</h2>
          <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto 2.5rem" }}>
            Universal Human Values (UHV) is a subject included in engineering and professional curricula across India, guided by AICTE. It is based on the work of Prof. R.R. Gaur, Prof. R. Asthana, and Prof. G.P. Bagaria.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {[
              "Understanding the human being in its totality",
              "Harmony at the level of self, family, society, and nature",
              "Inculcating ethical competence in professional life",
              "Developing a holistic perspective on reality",
            ].map((point, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", background: "white", borderRadius: 12, padding: "1.25rem", border: "1px solid #dcfce7" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8125rem", flexShrink: 0, marginTop: 2 }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.65 }}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "1rem" }}>Our Core Values</h2>
          <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto 2.5rem" }}>The principles that guide everything we build at HarmonyHub.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {values.map((v) => (
              <div key={v.title} className="card-hover" style={{ background: "#f0fdf4", borderRadius: 16, padding: "1.75rem", border: "1px solid #d1fae5", textAlign: "center" }}>
                <div style={{ fontSize: "2.25rem", marginBottom: "0.75rem" }}>{v.icon}</div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.0625rem", fontWeight: 700, color: "#166534", marginBottom: "0.5rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "#fdfdf9" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "1rem" }}>The Team</h2>
          <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto 2.5rem" }}>Built by students and guided by faculty — a collaborative college project.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1.25rem" }}>
            {team.map((m) => (
              <div key={m.name} className="card-hover" style={{ background: "white", borderRadius: 14, padding: "1.5rem", border: "1px solid #d1fae5", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", margin: "0 auto 0.75rem" }}>
                  {m.avatar}
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#1a2e1a", marginBottom: "0.25rem" }}>{m.name}</div>
                <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #166534, #14532d)", padding: "3.5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <BookOpen size={36} color="#86efac" style={{ marginBottom: "1rem" }} />
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.75rem", fontWeight: 800, color: "white", marginBottom: "0.75rem" }}>
            Aligned with AICTE UHV Guidelines
          </h2>
          <p style={{ color: "#bbf7d0", fontSize: "1rem", lineHeight: 1.8 }}>
            All module content is developed in alignment with the AICTE-mandated Universal Human Values curriculum and the standard textbook "Human Values and Professional Ethics" by Gaur, Asthana and Bagaria.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}