"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const loadingMessages = [
  "당신의 마음을 읽고 있어요... 💭",
  "별자리 속에서 알을 찾고 있어요... ⭐",
  "자미두수의 기운을 해석하고 있어요... 🔮",
  "마음의 알이 모양을 갖추고 있어요... 🥚",
  "수호캐릭터가 눈을 뜨려 하고 있어요... ✨",
];

export default function EggLoadingAnimation() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg, #fdf2f8 0%, #fce7f3 30%, #f3e8ff 60%, #ede9fe 100%)",
      }}
    >
      {/* Background particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: ["#f48fb1", "#ce93d8", "#80deea", "#ffd54f", "#ffccbc"][
              Math.floor(Math.random() * 5)
            ],
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="flex flex-col items-center gap-8">
        {/* Animated egg */}
        <div className="relative">
          <motion.div
            animate={{
              y: [-5, -20, -5],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              width="140"
              height="182"
              viewBox="0 0 120 156"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="load-egg-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f48fb1" />
                  <stop offset="50%" stopColor="#ce93d8" />
                  <stop offset="100%" stopColor="#80deea" />
                </linearGradient>
                <radialGradient id="load-egg-s" cx="35%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <filter id="load-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Shadow */}
              <ellipse cx="60" cy="150" rx="30" ry="4" fill="rgba(0,0,0,0.04)" />

              {/* Egg body */}
              <ellipse
                cx="60"
                cy="82"
                rx="48"
                ry="62"
                fill="url(#load-egg-g)"
                filter="url(#load-glow)"
                className="animate-pulse-glow"
              />

              {/* Shine */}
              <ellipse cx="60" cy="82" rx="48" ry="62" fill="url(#load-egg-s)" />

              {/* Crack line */}
              <motion.path
                d="M 15 82 L 30 78 L 45 85 L 60 76 L 75 84 L 90 79 L 105 82"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {/* Decorative band */}
              <path
                d="M 18 90 Q 60 80 102 90"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />

              {/* Heart in center */}
              <g transform="translate(48, 60) scale(0.5)">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="rgba(255,255,255,0.8)"
                  className="animate-twinkle"
                />
              </g>

              {/* Stars */}
              <circle cx="35" cy="50" r="2" fill="rgba(255,255,255,0.6)" />
              <circle cx="80" cy="65" r="1.5" fill="rgba(255,255,255,0.5)" />
              <circle cx="70" cy="105" r="2" fill="rgba(255,255,255,0.4)" />
            </svg>
          </motion.div>

          {/* Orbiting sparkles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{
                background: ["#ffd54f", "#f48fb1", "#80deea", "#ce93d8"][i],
                boxShadow: `0 0 10px ${["#ffd54f", "#f48fb1", "#80deea", "#ce93d8"][i]}`,
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [
                  Math.cos((i * Math.PI) / 2) * 70,
                  Math.cos((i * Math.PI) / 2 + Math.PI / 2) * 70,
                  Math.cos((i * Math.PI) / 2 + Math.PI) * 70,
                  Math.cos((i * Math.PI) / 2 + (3 * Math.PI) / 2) * 70,
                  Math.cos((i * Math.PI) / 2 + 2 * Math.PI) * 70,
                ],
                y: [
                  Math.sin((i * Math.PI) / 2) * 80,
                  Math.sin((i * Math.PI) / 2 + Math.PI / 2) * 80,
                  Math.sin((i * Math.PI) / 2 + Math.PI) * 80,
                  Math.sin((i * Math.PI) / 2 + (3 * Math.PI) / 2) * 80,
                  Math.sin((i * Math.PI) / 2 + 2 * Math.PI) * 80,
                ],
                opacity: [0.4, 1, 0.4, 1, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <motion.div className="text-center space-y-3">
          <motion.p
            key={msgIndex}
            className="text-base font-medium"
            style={{ color: "rgba(74, 25, 66, 0.65)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {loadingMessages[msgIndex]}
          </motion.p>
        </motion.div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#f48fb1" }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
