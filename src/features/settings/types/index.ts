export type SystemSettings = {
  id: number;
  electionPhase: "REGISTRATION" | "CAMPAIGN" | "VOTING" | "CLOSED";
  lateMaxScore: number;
  updatedAt: string;
};

export type UpdateSettingsInput = {
  lateMaxScore?: number;
};
