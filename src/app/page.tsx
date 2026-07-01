"use client";

import { motion } from "framer-motion";
import StarryBackground from "@/components/StarryBackground";
import FloatingEgg from "@/components/FloatingEgg";
import ScrollIndicator from "@/components/ScrollIndicator";
import BirthForm, { BirthFormData } from "@/components/BirthForm";
import EggLoadingAnimation from "@/components/EggLoadingAnimation";
import ResultView from "@/components/ResultView";
import { GuardianResult } from "@/lib/types";
import { useState } from "react";

type AppState = "input" | "loading" | "result";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("input");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GuardianResult | null>(null);
  const [resultId, setResultId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: BirthFormData) => {
    setIsLoading(true);
    setError(null);
    setAppState("loading");

    try {
      const res = await fetch("/api/generate-guardian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "수호알 생성에 실패했습니다.");
      }

      setResult(json.result);
      setResultId(json.id || null);
      setAppState("result");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setError(msg);
      setAppState("input");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setResultId(null);
    setError(null);
    setAppState("input");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading state
  if (appState === "loading") {
    return <EggLoadingAnimation />;
  }

  // Result state
  if (appState === "result" && result) {
    return (
      <main className="relative min-h-screen">
        <StarryBackground />
        <ResultView result={result} resultId={resultId} onReset={handleReset} />
      </main>
    );
  }

  // Input state (default)
  return (
    <main className="relative min-h-screen">
      <StarryBackground />

      {/* ============================================ */}
      {/*  HERO SECTION - 나의 마음알 만들기             */}
      {/* ============================================ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Floating eggs decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] opacity-30">
            <FloatingEgg
              size={60}
              delay={0}
              colors={{ main: "#f8bbd0", sub1: "#e1bee7", sub2: "#b2ebf2" }}
            />
          </div>
          <div className="absolute top-[20%] right-[8%] opacity-25">
            <FloatingEgg
              size={45}
              delay={1}
              colors={{ main: "#ce93d8", sub1: "#80deea", sub2: "#f48fb1" }}
            />
          </div>
          <div className="absolute bottom-[25%] left-[10%] opacity-20">
            <FloatingEgg
              size={50}
              delay={2}
              colors={{ main: "#80deea", sub1: "#f48fb1", sub2: "#ffd54f" }}
            />
          </div>
          <div className="absolute bottom-[30%] right-[5%] opacity-25">
            <FloatingEgg
              size={55}
              delay={1.5}
              colors={{ main: "#ffccbc", sub1: "#f48fb1", sub2: "#ce93d8" }}
            />
          </div>
        </div>

        {/* Main Title Area */}
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" as const }}
        >
          {/* Sparkle decoration above title */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            <div className="relative">
              <FloatingEgg
                size={100}
                delay={0}
                colors={{ main: "#f48fb1", sub1: "#ce93d8", sub2: "#80deea" }}
              />
              {/* Sparkle particles around egg */}
              <motion.div
                className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-gold-300"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                style={{ boxShadow: "0 0 8px 2px rgba(255,213,79,0.6)" }}
              />
              <motion.div
                className="absolute top-4 -left-4 w-2 h-2 rounded-full bg-pink-300"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                style={{ boxShadow: "0 0 6px 2px rgba(244,143,177,0.6)" }}
              />
              <motion.div
                className="absolute -bottom-1 right-4 w-2.5 h-2.5 rounded-full bg-lavender-300"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}
                style={{ boxShadow: "0 0 6px 2px rgba(206,147,216,0.6)" }}
              />
            </div>
          </motion.div>

          {/* Main title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="title-gradient block">나의</span>
            <span
              className="block mt-1 animate-gradient-shift"
              style={{
                background:
                  "linear-gradient(270deg, #ec407a, #ab47bc, #7c4dff, #448aff, #ab47bc, #ec407a)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              마음알 만들기
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg font-light mt-5 leading-relaxed max-w-md mx-auto"
            style={{ color: "rgba(74, 25, 66, 0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            내 마음속 <span className="font-medium" style={{ color: "#ec407a" }}>&lsquo;되고 싶은 나&rsquo;</span>에서 태어나는
            <br />
            나만의 수호알을 만나보세요
          </motion.p>

          {/* Decorative sparkle line */}
          <motion.div
            className="flex justify-center items-center gap-2 mt-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300/50" />
            <motion.span
              className="text-xl"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-lavender-300/50" />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <ScrollIndicator targetId="input-section" />
        </motion.div>
      </section>

      {/* ============================================ */}
      {/*  INPUT SECTION - 정보 입력                    */}
      {/* ============================================ */}
      <section
        id="input-section"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20"
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(244,143,177,0.2)",
            }}
          >
            <span className="text-sm">🌟</span>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "rgba(171,71,188,0.7)" }}
            >
              My Guardian Egg
            </span>
            <span className="text-sm">🌟</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold title-gradient mb-3">
            당신의 이야기를 들려주세요
          </h2>
          <p
            className="text-sm max-w-sm mx-auto leading-relaxed"
            style={{ color: "rgba(74, 25, 66, 0.45)" }}
          >
            생년월일을 알려주시면, 당신의 마음속에 잠들어 있는
            <br />
            수호알을 찾아드릴게요
          </p>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            className="w-full max-w-xl mb-6 p-4 rounded-2xl text-center text-sm"
            style={{
              background: "rgba(244,67,54,0.08)",
              border: "1px solid rgba(244,67,54,0.2)",
              color: "#c62828",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Form Card */}
        <motion.div
          className="glass-card-strong w-full max-w-xl p-8 sm:p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Corner decorations */}
          <div className="absolute top-4 right-4 opacity-30">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.span>
          </div>
          <div className="absolute bottom-4 left-4 opacity-20">
            <motion.span
              className="text-xl"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              ❋
            </motion.span>
          </div>

          {/* Background shimmer */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none animate-shimmer"
            style={{
              background:
                "linear-gradient(90deg, transparent 40%, rgba(244,143,177,0.5) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
          />

          <BirthForm onSubmit={handleSubmit} isLoading={isLoading} />
        </motion.div>

        {/* Bottom decorative text */}
        <motion.p
          className="mt-8 text-xs text-center"
          style={{ color: "rgba(171, 71, 188, 0.35)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          ✨ 자미두수적 기질을 참고하여 나만의 수호알을 만들어요 ✨
        </motion.p>
      </section>
    </main>
  );
}
