"use client";

import { motion } from "framer-motion";

interface FloatingEggProps {
  size?: number;
  className?: string;
  delay?: number;
  colors?: {
    main: string;
    sub1: string;
    sub2: string;
  };
}

export default function FloatingEgg({
  size = 120,
  className = "",
  delay = 0,
  colors = { main: "#f48fb1", sub1: "#ce93d8", sub2: "#80deea" },
}: FloatingEggProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [-10, -30, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 120 156"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow */}
        <defs>
          <filter id={`egg-glow-${delay}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id={`egg-grad-${delay}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors.main} />
            <stop offset="50%" stopColor={colors.sub1} />
            <stop offset="100%" stopColor={colors.sub2} />
          </linearGradient>
          <radialGradient id={`egg-shine-${delay}`} cx="35%" cy="30%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="60" cy="150" rx="35" ry="5" fill="rgba(0,0,0,0.05)" />

        {/* Egg body */}
        <ellipse
          cx="60"
          cy="82"
          rx="48"
          ry="62"
          fill={`url(#egg-grad-${delay})`}
          filter={`url(#egg-glow-${delay})`}
        />

        {/* Shine */}
        <ellipse
          cx="60"
          cy="82"
          rx="48"
          ry="62"
          fill={`url(#egg-shine-${delay})`}
        />

        {/* Decorative band */}
        <path
          d="M 15 82 Q 60 72 105 82"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 18 90 Q 60 80 102 90"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Heart */}
        <g transform="translate(48, 60) scale(0.5)">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="rgba(255,255,255,0.7)"
          />
        </g>

        {/* Stars */}
        <circle cx="35" cy="50" r="2" fill="rgba(255,255,255,0.6)" />
        <circle cx="80" cy="65" r="1.5" fill="rgba(255,255,255,0.5)" />
        <circle cx="70" cy="105" r="2" fill="rgba(255,255,255,0.4)" />

        {/* Sparkle cross top */}
        <g transform="translate(85, 40)">
          <line x1="-4" y1="0" x2="4" y2="0" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Floating sparkle particles */}
      <motion.div
        className="absolute top-2 right-0 w-2 h-2 rounded-full bg-white"
        style={{ boxShadow: "0 0 6px 2px rgba(255,255,255,0.8)" }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], y: [-5, -15, -5] }}
        transition={{ duration: 2, repeat: Infinity, delay: delay + 0.5 }}
      />
      <motion.div
        className="absolute bottom-8 left-1 w-1.5 h-1.5 rounded-full bg-pink-300"
        style={{ boxShadow: "0 0 4px 2px rgba(244,143,177,0.6)" }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], y: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: delay + 1 }}
      />
    </motion.div>
  );
}
