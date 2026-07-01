"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GuardianResult } from "@/lib/types";
import ResultSectionCard, {
  ResultField,
  ColorSwatch,
  KeywordBadge,
  QuoteBubble,
} from "@/components/ResultSectionCard";

interface ResultViewProps {
  result: GuardianResult;
  resultId?: string | null;
  onReset: () => void;
}

export default function ResultView({ result, resultId, onReset }: ResultViewProps) {
  const { guardianEgg, guardianCharacter, characterChange, summary, imagePromptSummary } = result;
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    setImageError(null);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePromptSummary, resultId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setGeneratedImage(data.image);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "이미지 생성에 실패했습니다.";
      setImageError(msg);
    } finally {
      setIsGeneratingImage(false);
    }
  };


  return (
    <section className="relative z-10 min-h-screen px-4 py-12 sm:py-20">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(244,143,177,0.2)",
            }}
          >
            <span className="text-sm">🥚</span>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(171,71,188,0.7)" }}>
              Your Guardian Egg
            </span>
            <span className="text-sm">✨</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-extrabold title-gradient">
            당신의 수호알이 태어났어요
          </h1>
        </motion.div>

        {/* ====== 나의 수호 알 ====== */}
        <ResultSectionCard icon="🥚" title="나의 수호 알" delay={0.2}>
          <ResultField label="수호 알 이름" value={guardianEgg.name} emoji="💎" />
          <div className="section-divider" />

          <div className="space-y-1 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider title-gradient-soft flex items-center gap-1.5">
              <span className="text-xs">🎨</span> 알의 컬러
            </span>
            <div className="pl-5 flex flex-wrap gap-4 mt-2">
              <ColorSwatch label="메인" color={guardianEgg.mainColor} />
              <ColorSwatch label="서브 1" color={guardianEgg.subColor1} />
              <ColorSwatch label="서브 2" color={guardianEgg.subColor2} />
            </div>
          </div>
          <div className="section-divider" />

          <ResultField label="알의 무늬와 디테일" value={guardianEgg.patternAndDetail} emoji="🌸" />
          <div className="section-divider" />
          <ResultField label="알이 품고 있는 마음" value={guardianEgg.hiddenHeart} emoji="💗" />
          <div className="section-divider" />
          <ResultField label="이 알이 잠들어 있는 이유" value={guardianEgg.whySleeping} emoji="🌙" />
          <div className="section-divider" />
          <ResultField label="알이 깨어나는 순간" value={guardianEgg.awakeningMoment} emoji="⚡" />
          <div className="section-divider" />

          <div className="mt-4 text-center">
            <QuoteBubble text={guardianEgg.oneLiner} />
          </div>
        </ResultSectionCard>

        {/* ====== 나의 수호캐릭터 ====== */}
        <ResultSectionCard icon="✨" title="나의 수호캐릭터" delay={0.4}>
          <ResultField label="수호캐릭터 이름" value={guardianCharacter.name} emoji="⭐" />
          <div className="section-divider" />

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider title-gradient-soft flex items-center gap-1.5">
              <span className="text-xs">💬</span> 첫 등장 대사
            </span>
            <div className="pl-5 mt-2">
              <QuoteBubble text={guardianCharacter.firstLine} />
            </div>
          </div>
          <div className="section-divider" />

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider title-gradient-soft flex items-center gap-1.5">
              <span className="text-xs">🏷️</span> 성격 키워드
            </span>
            <div className="pl-5 flex flex-wrap gap-2 mt-2">
              {guardianCharacter.keywords.map((kw, i) => (
                <KeywordBadge key={i} keyword={kw} />
              ))}
            </div>
          </div>
          <div className="section-divider" />

          <ResultField label="말투 스타일" value={guardianCharacter.speechStyle} emoji="🗣️" />
          <div className="section-divider" />
          <ResultField label="비주얼 설명" value={guardianCharacter.visualDescription} emoji="👗" />
          <div className="section-divider" />
          <ResultField label="나와 닮은 점" value={guardianCharacter.similarToMe} emoji="🪞" />
          <div className="section-divider" />
          <ResultField label="나와 반대되는 점" value={guardianCharacter.oppositeToMe} emoji="🔄" />
          <div className="section-divider" />
          <ResultField label="수호캐릭터가 나에게 주는 힘" value={guardianCharacter.powerGiven} emoji="💪" />
        </ResultSectionCard>

        {/* ====== 나의 캐릭터 체인지 ====== */}
        <ResultSectionCard icon="💫" title="나의 캐릭터 체인지" delay={0.6}>
          <ResultField label="캐릭터 체인지 이름" value={characterChange.changeName} emoji="⚡" />
          <div className="section-divider" />
          <ResultField label="체인지가 일어나는 순간" value={characterChange.changeMoment} emoji="🔥" />
          <div className="section-divider" />
          <ResultField label="체인지 후 달라지는 분위기" value={characterChange.changedAura} emoji="🌟" />
          <div className="section-divider" />

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider title-gradient-soft flex items-center gap-1.5">
              <span className="text-xs">💬</span> 체인지 후 말투
            </span>
            <div className="pl-5 space-y-2 mt-2">
              {characterChange.changedLines.map((line, i) => (
                <QuoteBubble key={i} text={line} />
              ))}
            </div>
          </div>
          <div className="section-divider" />

          <ResultField label="체인지 후 스타일링" value={characterChange.changedStyling} emoji="💄" />
          <div className="section-divider" />
          <ResultField label="체인지가 필요한 이유" value={characterChange.whyNeeded} emoji="💖" />
        </ResultSectionCard>

        {/* ====== 최종 결과 ====== */}
        <ResultSectionCard icon="📋" title="최종 결과" delay={0.8}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultField label="수호 알 이름" value={summary.eggName} emoji="🥚" />
            <ResultField label="수호캐릭터 이름" value={summary.characterName} emoji="✨" />
            <ResultField label="캐릭터 체인지 이름" value={summary.changeName} emoji="💫" />
            <ResultField label="대표 컬러" value={summary.representativeColor} emoji="🎨" />
            <ResultField label="상징 아이템" value={summary.symbolItem} emoji="💎" />
            <ResultField label="내 안의 되고 싶은 나" value={summary.innerDesiredSelf} emoji="💗" />
          </div>
        </ResultSectionCard>

        {/* ====== 이미지 생성 섹션 ====== */}
        <ResultSectionCard icon="🎨" title="나만의 수호캐릭터 만나기" delay={1.0}>
          {!generatedImage && !isGeneratingImage && (
            <div className="text-center space-y-4">
              <p className="text-sm" style={{ color: "rgba(74,25,66,0.6)" }}>
                이미지 생성용 요약을 바탕으로<br />
                나만의 수호알과 수호캐릭터 일러스트를 만들어볼까요?
              </p>
              <motion.button
                onClick={handleGenerateImage}
                className="magical-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                🖌️ 수호캐릭터 이미지 만들기 ✨
              </motion.button>
            </div>
          )}

          {isGeneratingImage && (
            <div className="text-center space-y-4 py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block text-4xl"
              >
                🥚
              </motion.div>
              <p className="text-sm font-medium" style={{ color: "rgba(74,25,66,0.6)" }}>
                수호캐릭터를 그리고 있어요...<br />
                <span className="text-xs" style={{ color: "rgba(74,25,66,0.4)" }}>
                  약 30초~1분 정도 걸릴 수 있어요 ✨
                </span>
              </p>
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#f48fb1" }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </div>
          )}

          {imageError && (
            <div className="text-center space-y-4">
              <p className="text-sm text-pink-500">{imageError}</p>
              <motion.button
                onClick={handleGenerateImage}
                className="magical-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                🔄 다시 시도하기
              </motion.button>
            </div>
          )}

          {generatedImage && (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="rounded-2xl overflow-hidden border-2 border-white/50 shadow-lg"
              >
                <img
                  src={generatedImage}
                  alt="나의 수호캐릭터"
                  className="w-full h-auto"
                />
              </motion.div>
              <div className="flex gap-3 justify-center">
                <a
                  href={generatedImage}
                  download="my-guardian-character.png"
                  className="magical-btn text-sm px-6 py-3 inline-block text-center no-underline"
                >
                  📥 이미지 저장하기
                </a>
                <motion.button
                  onClick={handleGenerateImage}
                  className="px-6 py-3 rounded-full text-sm font-medium border-2 transition-all"
                  style={{
                    borderColor: "rgba(244,143,177,0.4)",
                    color: "#ab47bc",
                    background: "rgba(255,255,255,0.5)",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  🔄 다시 만들기
                </motion.button>
              </div>
            </div>
          )}
        </ResultSectionCard>

        {/* ====== 다시하기 버튼 ====== */}
        <motion.div
          className="text-center pt-6 pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={onReset}
            className="px-8 py-3 rounded-full text-sm font-medium transition-all cursor-pointer"
            style={{
              border: "1.5px solid rgba(244,143,177,0.3)",
              color: "rgba(171,71,188,0.7)",
              background: "rgba(255,255,255,0.4)",
            }}
            whileHover={{
              scale: 1.03,
              backgroundColor: "rgba(255,255,255,0.7)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            🔮 새로운 마음알 만들기
          </motion.button>
          <p className="mt-4 text-xs" style={{ color: "rgba(171,71,188,0.35)" }}>
            ✨ 자미두수적 기질을 참고하여 나만의 수호알을 만들어요 ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}
