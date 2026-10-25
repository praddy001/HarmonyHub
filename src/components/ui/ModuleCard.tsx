import type { Module } from "../../types";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link
      to={`/modules/${module.id}`}
      className="card-hover"
      style={{
        display: "block",
        background: "white",
        borderRadius: "1.25rem",
        border: `1.5px solid ${module.colorLight}`,
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ height: 5, background: `linear-gradient(90deg, ${module.color}, ${module.colorLight})` }} />
      <div style={{ padding: "1.5rem" }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: module.colorLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", marginBottom: "1rem" }}>
          {module.icon}
        </div>
        <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.125rem", fontWeight: 700, color: "#1a2e1a", marginBottom: "0.25rem", lineHeight: 1.3 }}>
          {module.title}
        </h3>
        <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: module.color, marginBottom: "0.75rem" }}>
          {module.subtitle}
        </p>
        <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.65, marginBottom: "1.25rem" }}>
          {module.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "#6b7280" }}>
            <Clock size={13} />{module.duration}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "#6b7280" }}>
            <BookOpen size={13} />{module.units} units
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", fontWeight: 600, color: module.color }}>
          Explore module <ArrowRight size={15} />
        </div>
      </div>
    </Link>
  );
}