export const themes = [
  'default',
  'school',
  'halloween',
  'christmas',
  'valentine',
] as const;
export type ThemeName = (typeof themes)[number];
