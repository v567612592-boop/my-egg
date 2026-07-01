export const GUARDIAN_SYSTEM_PROMPT = `너는 캐릭캐릭 체인지 세계관의 감성을 기반으로, 사용자의 생년월일로부터 나만의 오리지널 수호 알과 수호캐릭터를 만들어주는 전문 크리에이터야.

[핵심 규칙]
- 원작 캐릭터와 매칭하지 마
- 원작에 등장하는 수호 알이나 캐릭터를 그대로 쓰지 마
- 원작 캐릭터 이름, 알 디자인, 설정을 복제하지 마
- 완전히 새로운 오리지널 결과를 만들어
- 자미두수 해석을 별도 섹션으로 길게 설명하지 마
- 성향 분석이 결과물 전체에 자연스럽게 스며들게 해
- 추가 질문을 하지 마
- 태어난 지역, MBTI, 성향 정보는 묻지 마

[수호 알 이름 규칙 - 매우 중요]
- 수호 알 이름에 색깔 이름을 절대 넣지 마. '하늘빛 알', '달빛 연꽃의 알', '은빛 알', '분홍 알' 같은 색상 기반 이름은 금지야.
- 대신 감정, 소망, 상징, 판타지적 개념을 담은 이름을 지어줘.
- 예시 방향성: '소원의 알', '비밀정원의 알', '첫 번째 용기의 알', '잊혀진 무대의 알', '속삭이는 꿈의 알', '작은 왕관의 알', '미완성 멜로디의 알' 같은 느낌으로.
- 이름만 들어도 어떤 마음이 담겨 있는지 느껴지게 지어줘.
- '~빛', '~색'으로 끝나는 이름은 쓰지 마.

[수호캐릭터 비주얼 규칙 - 매우 중요]
수호캐릭터의 비주얼은 일본 마법소녀 애니메이션의 마스코트 캐릭터처럼 매우 구체적으로 디자인해야 해.
아래 항목들을 모두 상세하게 설명해줘:
- 헤어: 머리카락 색상, 길이, 스타일 (트윈테일, 웨이브, 숏컷 등), 머리에 달린 장식이 있다면 구체적으로
- 의상: 어떤 종류의 옷인지 (드레스, 코트, 리본 블라우스 등), 색상, 질감, 디테일 (프릴, 레이스, 단추 등)
- 상징 아이템: 이 캐릭터만의 소품 (지팡이, 열쇠, 책, 악기, 거울 등) - 구체적인 형태와 색상
- 날개/특수 요소: 요정 날개가 있다면 모양과 색, 빛나는 부분, 투명도 등
- 눈: 눈 색상, 눈동자의 특징 (별이 들어있다거나, 하트 모양 하이라이트 등)
- 전체 체형: 마스코트 비율 (큰 머리 + 작은 몸), 키 느낌
- 움직임/포즈: 어떻게 떠다니는지, 특징적인 제스처
- 분위기: 전체적으로 풍기는 아우라나 빛의 느낌
이 모든 것이 하나의 필드에 담겨야 하며, 읽으면 머릿속에 캐릭터가 그려질 정도로 생생하게 써줘.

[자미두수 반영 방식]
자미두수를 실제로 정밀 계산할 수 있는 환경이라면, 생년월일, 태어난 시간, 성별을 바탕으로 명반적 기질을 참고해.
다만 정식 자미두수 명반을 정확히 산출할 수 없는 환경이라면, 명반을 계산한 것처럼 단정하지 마.
그 경우에는 "자미두수적 구조를 참고한 간이 감성 해석"으로 접근해.
중요한 것은 점술 설명을 길게 늘어놓는 것이 아니라, 생년월일에서 도출한 고정 기질을 바탕으로 수호 알과 수호캐릭터를 설계하는 거야.
태어난 시간을 모를 경우에는 정밀한 운명 해석처럼 단정하지 말고, 생년월일 기반의 간이 자미두수 감성 해석처럼 풀어줘.
진태양시 보정은 하지 말고, 사용자가 입력한 출생 시간을 기준으로만 해석해.

[문체]
- 귀엽지만 가볍지만은 않게
- 내 안에 진짜 품고 있던 마음을 발견한 것처럼
- SNS 콘텐츠처럼 읽기 쉽고 감성적으로
- "어떻게 이걸 알았지?" 싶을 정도로 섬세하게
- 예쁘고 선명한 표현을 사용

반드시 아래 JSON 형식으로만 응답해. 다른 텍스트를 포함하지 마.`;

export const GUARDIAN_JSON_SCHEMA = {
  type: "object" as const,
  properties: {
    guardianEgg: {
      type: "object" as const,
      properties: {
        name: { type: "string" as const, description: "수호 알 이름. 색깔 이름(하늘빛, 은빛, 분홍 등)을 절대 포함하지 말 것. 감정, 소망, 상징적 개념이 담긴 이름으로 지을 것. 예시 방향: 비밀정원의 알, 첫 번째 용기의 알, 속삭이는 꿈의 알" },
        mainColor: { type: "string" as const, description: "메인 컬러 (색상명 + 헥스코드)" },
        subColor1: { type: "string" as const, description: "서브 컬러 1 (색상명 + 헥스코드)" },
        subColor2: { type: "string" as const, description: "서브 컬러 2 (색상명 + 헥스코드)" },
        patternAndDetail: { type: "string" as const, description: "알의 무늬와 디테일 묘사" },
        hiddenHeart: { type: "string" as const, description: "알이 품고 있는 마음 - 되고 싶은 나" },
        whySleeping: { type: "string" as const, description: "이 알이 잠들어 있는 이유" },
        awakeningMoment: { type: "string" as const, description: "알이 깨어나는 순간" },
        oneLiner: { type: "string" as const, description: "한 줄 요약" },
      },
      required: ["name", "mainColor", "subColor1", "subColor2", "patternAndDetail", "hiddenHeart", "whySleeping", "awakeningMoment", "oneLiner"],
      additionalProperties: false,
    },
    guardianCharacter: {
      type: "object" as const,
      properties: {
        name: { type: "string" as const, description: "수호캐릭터 이름" },
        firstLine: { type: "string" as const, description: "첫 등장 대사" },
        keywords: {
          type: "array" as const,
          items: { type: "string" as const },
          description: "성격 키워드 5개",
        },
        speechStyle: { type: "string" as const, description: "말투 스타일" },
        visualDescription: { type: "string" as const, description: "매우 상세한 비주얼 설명. 반드시 다음 항목을 모두 구체적으로 포함할 것: (1)헤어 - 색상, 길이, 스타일(트윈테일/웨이브/숏컷 등), 머리 장식 (2)의상 - 종류, 색상, 디테일(프릴/리본/레이스 등), 질감 (3)상징 아이템 - 구체적 형태와 색상 (4)날개 - 모양, 색상, 투명도, 빛나는 방식 (5)눈 - 색상, 눈동자 특징(별/하트 하이라이트 등) (6)체형 - 마스코트 비율, 전체 사이즈감 (7)움직임/포즈 - 떠다니는 방식, 특징적 제스처 (8)아우라/분위기 - 주변에 감도는 빛이나 파티클. 읽으면 머릿속에 캐릭터가 완전히 그려질 수 있도록 구체적이고 생생하게 최소 5문장 이상으로 작성할 것" },
        similarToMe: { type: "string" as const, description: "나와 닮은 점" },
        oppositeToMe: { type: "string" as const, description: "나와 반대되는 점" },
        powerGiven: { type: "string" as const, description: "수호캐릭터가 나에게 주는 힘" },
      },
      required: ["name", "firstLine", "keywords", "speechStyle", "visualDescription", "similarToMe", "oppositeToMe", "powerGiven"],
      additionalProperties: false,
    },
    characterChange: {
      type: "object" as const,
      properties: {
        changeName: { type: "string" as const, description: "캐릭터 체인지 이름" },
        changeMoment: { type: "string" as const, description: "체인지가 일어나는 순간" },
        changedAura: { type: "string" as const, description: "체인지 후 달라지는 분위기" },
        changedLines: {
          type: "array" as const,
          items: { type: "string" as const },
          description: "체인지 후 말투 - 대사 3개",
        },
        changedStyling: { type: "string" as const, description: "체인지 후 스타일링 (패션 무드, 메이크업, 컬러)" },
        whyNeeded: { type: "string" as const, description: "체인지가 필요한 이유" },
      },
      required: ["changeName", "changeMoment", "changedAura", "changedLines", "changedStyling", "whyNeeded"],
      additionalProperties: false,
    },
    summary: {
      type: "object" as const,
      properties: {
        eggName: { type: "string" as const },
        characterName: { type: "string" as const },
        changeName: { type: "string" as const },
        representativeColor: { type: "string" as const },
        symbolItem: { type: "string" as const },
        innerDesiredSelf: { type: "string" as const },
      },
      required: ["eggName", "characterName", "changeName", "representativeColor", "symbolItem", "innerDesiredSelf"],
      additionalProperties: false,
    },
    imagePromptSummary: {
      type: "object" as const,
      properties: {
        guardianEgg: { type: "string" as const, description: "수호 알 요약" },
        guardianCharacter: { type: "string" as const, description: "수호캐릭터 요약" },
        representativeColor: { type: "string" as const, description: "대표 컬러" },
        symbolPattern: { type: "string" as const, description: "상징 문양" },
        overallMood: { type: "string" as const, description: "전체 분위기" },
        characterVisual: { type: "string" as const, description: "이미지 생성용 캐릭터 비주얼. 영어로 작성. 헤어 색상/스타일, 의상 디테일, 날개, 눈 색상, 상징 아이템, 전체 분위기를 구체적으로 포함" },
        eggVisual: { type: "string" as const, description: "알 비주얼" },
        imageStyle: { type: "string" as const, description: "이미지 스타일" },
      },
      required: ["guardianEgg", "guardianCharacter", "representativeColor", "symbolPattern", "overallMood", "characterVisual", "eggVisual", "imageStyle"],
      additionalProperties: false,
    },
  },
  required: ["guardianEgg", "guardianCharacter", "characterChange", "summary", "imagePromptSummary"],
  additionalProperties: false,
};

export function buildUserPrompt(
  birthYear: string,
  birthMonth: string,
  birthDay: string,
  calendarType: "solar" | "lunar",
  gender: "female" | "male",
  birthTime: string
): string {
  const calendarLabel = calendarType === "solar" ? "양력" : "음력";
  const genderLabel = gender === "female" ? "여자" : "남자";
  const timeLabel = birthTime ? birthTime : "모름";
  const timeInstruction = birthTime
    ? "태어난 시간도 함께 참고해줘."
    : "태어난 시간을 모르므로 생년월일만으로 해석해줘. 정밀한 운명 해석처럼 단정하지 말고, 생년월일 기반의 간이 자미두수 감성 해석처럼 풀어줘.";

  const lines = [
    "[내 정보]",
    "생년월일: " + birthYear + "년 " + birthMonth + "월 " + birthDay + "일 (" + calendarLabel + ")",
    "태어난 시간: " + timeLabel,
    "성별: " + genderLabel,
    "",
    "위 정보를 바탕으로, 캐릭캐릭 체인지 세계관에 나올 법한 나만의 오리지널 수호 알과 수호캐릭터를 만들어줘.",
    "",
    "입력값은 기본적으로 생년월일을 사용해.",
    timeInstruction,
    "",
    '이 프롬프트의 목적은 원작 캐릭터와 나를 매칭하는 것이 아니라, 캐릭캐릭 체인지 세계관처럼 내 마음속 "되고 싶은 나"에서 태어나는 나만의 수호 알을 만드는 거야.',
    "기재된 생년월일을 바탕으로 자미두수적 기질을 참고해서 내가 타고난 분위기, 숨겨진 욕망, 감정선, 재능, 인간관계에서 보이는 모습, 그리고 내가 진짜 되고 싶어 하는 모습을 섬세하게 해석해줘.",
    "",
    "JSON 스키마에 맞춰 응답해줘.",
  ];

  return lines.join("\n");
}

