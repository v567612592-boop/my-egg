"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BirthFormProps {
  onSubmit: (data: BirthFormData) => void;
  isLoading?: boolean;
}

export interface BirthFormData {
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  calendarType: "solar" | "lunar";
  gender: "female" | "male";
  birthTime: string;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

// 시진 (Chinese traditional time periods)
const birthTimeOptions = [
  { value: "", label: "모르겠어요 ✨" },
  { value: "23:00-01:00", label: "자시 (子時) 23:00~01:00" },
  { value: "01:00-03:00", label: "축시 (丑時) 01:00~03:00" },
  { value: "03:00-05:00", label: "인시 (寅時) 03:00~05:00" },
  { value: "05:00-07:00", label: "묘시 (卯時) 05:00~07:00" },
  { value: "07:00-09:00", label: "진시 (辰時) 07:00~09:00" },
  { value: "09:00-11:00", label: "사시 (巳時) 09:00~11:00" },
  { value: "11:00-13:00", label: "오시 (午時) 11:00~13:00" },
  { value: "13:00-15:00", label: "미시 (未時) 13:00~15:00" },
  { value: "15:00-17:00", label: "신시 (申時) 15:00~17:00" },
  { value: "17:00-19:00", label: "유시 (酉時) 17:00~19:00" },
  { value: "19:00-21:00", label: "술시 (戌時) 19:00~21:00" },
  { value: "21:00-23:00", label: "해시 (亥時) 21:00~23:00" },
];

export default function BirthForm({ onSubmit, isLoading = false }: BirthFormProps) {
  const [formData, setFormData] = useState<BirthFormData>({
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    calendarType: "solar",
    gender: "female",
    birthTime: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BirthFormData, string>>>({});

  const days = formData.birthYear && formData.birthMonth
    ? Array.from(
        { length: getDaysInMonth(parseInt(formData.birthYear), parseInt(formData.birthMonth)) },
        (_, i) => i + 1
      )
    : Array.from({ length: 31 }, (_, i) => i + 1);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BirthFormData, string>> = {};
    if (!formData.birthYear) newErrors.birthYear = "태어난 년도를 선택해주세요";
    if (!formData.birthMonth) newErrors.birthMonth = "태어난 월을 선택해주세요";
    if (!formData.birthDay) newErrors.birthDay = "태어난 일을 선택해주세요";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
    }),
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto space-y-7"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* 생년월일 */}
      <motion.div custom={0} variants={fieldVariants}>
        <label className="block text-sm font-semibold mb-3 title-gradient-soft">
          🎂 생년월일
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <select
              value={formData.birthYear}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, birthYear: e.target.value }))
              }
              className="magical-select"
            >
              <option value="">년도</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}년
                </option>
              ))}
            </select>
            <AnimatePresence>
              {errors.birthYear && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-pink-500 text-xs mt-1.5 pl-1"
                >
                  {errors.birthYear}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div>
            <select
              value={formData.birthMonth}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, birthMonth: e.target.value }))
              }
              className="magical-select"
            >
              <option value="">월</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}월
                </option>
              ))}
            </select>
            <AnimatePresence>
              {errors.birthMonth && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-pink-500 text-xs mt-1.5 pl-1"
                >
                  {errors.birthMonth}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div>
            <select
              value={formData.birthDay}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, birthDay: e.target.value }))
              }
              className="magical-select"
            >
              <option value="">일</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}일
                </option>
              ))}
            </select>
            <AnimatePresence>
              {errors.birthDay && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-pink-500 text-xs mt-1.5 pl-1"
                >
                  {errors.birthDay}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* 양력/음력 */}
      <motion.div custom={1} variants={fieldVariants}>
        <label className="block text-sm font-semibold mb-3 title-gradient-soft">
          📅 달력 구분
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, calendarType: "solar" }))
            }
            className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-all duration-300 cursor-pointer ${
              formData.calendarType === "solar"
                ? "bg-gradient-to-r from-pink-300/30 to-lavender-300/30 border-1.5 border-pink-300 text-pink-500 font-semibold shadow-md shadow-pink-200/30"
                : "bg-white/50 border-1.5 border-pink-200/30 text-purple-300 hover:bg-white/70 hover:border-pink-200/50"
            }`}
          >
            ☀️ 양력
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, calendarType: "lunar" }))
            }
            className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-all duration-300 cursor-pointer ${
              formData.calendarType === "lunar"
                ? "bg-gradient-to-r from-lavender-300/30 to-sky-300/30 border-1.5 border-lavender-300 text-lavender-400 font-semibold shadow-md shadow-lavender-200/30"
                : "bg-white/50 border-1.5 border-pink-200/30 text-purple-300 hover:bg-white/70 hover:border-pink-200/50"
            }`}
          >
            🌙 음력
          </button>
        </div>
      </motion.div>

      {/* 성별 */}
      <motion.div custom={2} variants={fieldVariants}>
        <label className="block text-sm font-semibold mb-3 title-gradient-soft">
          💫 성별
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, gender: "female" }))
            }
            className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-all duration-300 cursor-pointer ${
              formData.gender === "female"
                ? "bg-gradient-to-r from-pink-300/30 to-peach-200/40 border-1.5 border-pink-300 text-pink-500 font-semibold shadow-md shadow-pink-200/30"
                : "bg-white/50 border-1.5 border-pink-200/30 text-purple-300 hover:bg-white/70 hover:border-pink-200/50"
            }`}
          >
            👩 여자
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, gender: "male" }))
            }
            className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-all duration-300 cursor-pointer ${
              formData.gender === "male"
                ? "bg-gradient-to-r from-sky-300/30 to-lavender-300/30 border-1.5 border-sky-300 text-sky-600 font-semibold shadow-md shadow-sky-200/30"
                : "bg-white/50 border-1.5 border-pink-200/30 text-purple-300 hover:bg-white/70 hover:border-pink-200/50"
            }`}
          >
            👨 남자
          </button>
        </div>
      </motion.div>

      {/* 태어난 시간 */}
      <motion.div custom={3} variants={fieldVariants}>
        <label className="block text-sm font-semibold mb-1 title-gradient-soft">
          🕐 태어난 시간
        </label>
        <p className="text-xs mb-3" style={{ color: "rgba(171, 71, 188, 0.5)" }}>
          몰라도 괜찮아요! 생년월일만으로도 충분해요 ✨
        </p>
        <select
          value={formData.birthTime}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, birthTime: e.target.value }))
          }
          className="magical-select"
        >
          {birthTimeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Submit Button */}
      <motion.div custom={4} variants={fieldVariants} className="pt-4">
        <motion.button
          type="submit"
          disabled={isLoading}
          className="magical-btn w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                🥚
              </motion.span>
              마음의 알이 만들어지고 있어요...
            </span>
          ) : (
            <span>🥚 나의 마음알 찾기 ✨</span>
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
