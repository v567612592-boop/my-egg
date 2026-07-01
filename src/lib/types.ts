export interface GuardianEgg {
  name: string;
  mainColor: string;
  subColor1: string;
  subColor2: string;
  patternAndDetail: string;
  hiddenHeart: string;
  whySleeping: string;
  awakeningMoment: string;
  oneLiner: string;
}

export interface GuardianCharacter {
  name: string;
  firstLine: string;
  keywords: string[];
  speechStyle: string;
  visualDescription: string;
  similarToMe: string;
  oppositeToMe: string;
  powerGiven: string;
}

export interface CharacterChange {
  changeName: string;
  changeMoment: string;
  changedAura: string;
  changedLines: string[];
  changedStyling: string;
  whyNeeded: string;
}

export interface GuardianSummary {
  eggName: string;
  characterName: string;
  changeName: string;
  representativeColor: string;
  symbolItem: string;
  innerDesiredSelf: string;
}

export interface ImagePromptSummary {
  guardianEgg: string;
  guardianCharacter: string;
  representativeColor: string;
  symbolPattern: string;
  overallMood: string;
  characterVisual: string;
  eggVisual: string;
  imageStyle: string;
}

export interface GuardianResult {
  guardianEgg: GuardianEgg;
  guardianCharacter: GuardianCharacter;
  characterChange: CharacterChange;
  summary: GuardianSummary;
  imagePromptSummary: ImagePromptSummary;
}
