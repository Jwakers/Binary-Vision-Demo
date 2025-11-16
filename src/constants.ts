export const ROUTES = {
  HOME: "/",
  CADETS: "/cadets",
  SEARCH: "/search",
  WHAT_WE_DO: "/what-we-do",
  OUR_ORGANISATION: "/our-organisation",
  AIRCRAFT: "/aircraft",
  DISPLAY_TEAMS: "/display-teams",
  COMMUNITY_AND_SUPPORT: "/community-and-support",
  NEWS: "/news",
};

export const QRA_STEPS = {
  COORDINATE_RESPONSE: "Co-ordinate response",
  SCRAMBLE: "Scramble",
  INTERCEPT: "Intercept",
  RETURN_TO_BASE: "Return to base",
};
export type QRAStep = keyof typeof QRA_STEPS;
