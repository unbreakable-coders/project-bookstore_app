export const thems = [
  'default',
  'school',
  'halloween',
  'christmas',
  'valentine',
] as const;
export type ThemName = (typeof thems)[number];
