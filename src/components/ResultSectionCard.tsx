"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ResultSectionCardProps {
  icon: string;
  title: string;
  children: ReactNode;
  delay?: number;
}

export default function ResultSectionCard({
  icon,
  title,
  children,
  delay = 0,
}: ResultSectionCardProps) {
  return (
    <motion.div
      className="glass-card-strong p-6 sm:p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: "easeOut" as const }}
    >
      {/* Decorative corner */}
      <div className="absolute top-3 right-3 opacity-20">
        <motion.span
          className="text-lg"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.span>
      </div>

      {/* Title */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg sm:text-xl font-bold title-gradient">{title}</h3>
      </div>

      {/* Content */}
      <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: "rgba(74, 25, 66, 0.8)" }}>
        {children}
      </div>
    </motion.div>
  );
}

interface ResultFieldProps {
  label: string;
  value: string;
  emoji?: string;
}

export function ResultField({ label, value, emoji = "✧" }: ResultFieldProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        <span className="text-xs">{emoji}</span>
        <span className="text-xs font-semibold uppercase tracking-wider title-gradient-soft">
          {label}
        </span>
      </div>
      <p className="pl-5 leading-relaxed">{value}</p>
    </div>
  );
}

interface ColorSwatchProps {
  label: string;
  color: string;
}

export function ColorSwatch({ label, color }: ColorSwatchProps) {
  // Try to extract hex color from string like "로즈 핑크 #F48FB1"
  const hexMatch = color.match(/#[0-9A-Fa-f]{6}/);
  const bgColor = hexMatch ? hexMatch[0] : "#f48fb1";

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-full border-2 border-white/80 shadow-md"
        style={{ background: bgColor }}
      />
      <div>
        <span className="text-xs font-medium" style={{ color: "rgba(74,25,66,0.5)" }}>
          {label}
        </span>
        <p className="text-sm font-medium">{color}</p>
      </div>
    </div>
  );
}

interface KeywordBadgeProps {
  keyword: string;
}

export function KeywordBadge({ keyword }: KeywordBadgeProps) {
  return (
    <span
      className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold"
      style={{
        background: "linear-gradient(135deg, rgba(244,143,177,0.15), rgba(206,147,216,0.15))",
        border: "1px solid rgba(244,143,177,0.25)",
        color: "#ab47bc",
      }}
    >
      {keyword}
    </span>
  );
}

interface QuoteBubbleProps {
  text: string;
}

export function QuoteBubble({ text }: QuoteBubbleProps) {
  return (
    <div
      className="relative px-5 py-3 rounded-2xl text-sm italic"
      style={{
        background: "linear-gradient(135deg, rgba(244,143,177,0.1), rgba(206,147,216,0.1))",
        border: "1px solid rgba(244,143,177,0.2)",
        color: "#7b1fa2",
      }}
    >
      <span className="absolute -top-2 left-4 text-lg" style={{ color: "#f48fb1" }}>
        &ldquo;
      </span>
      {text}
      <span className="absolute -bottom-2 right-4 text-lg" style={{ color: "#f48fb1" }}>
        &rdquo;
      </span>
    </div>
  );
}
