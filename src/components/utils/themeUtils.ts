import { themesConfig } from '@/config/themes.config';
import type { ThemeConfig } from '@/types/theme';

function isDateInRange(
  current: Date,
  start: { month: number; day: number },
  end: { month: number; day: number },
): boolean {
  const currentMonth = current.getMonth() + 1;
  const currentDay = current.getDate();

  if (start.month > end.month) {
    return (
      (currentMonth === start.month && currentDay >= start.day) ||
      currentMonth > start.month ||
      currentMonth < end.month ||
      (currentMonth === end.month && currentDay <= end.day)
    );
  }

  if (currentMonth < start.month || currentMonth > end.month) {
    return false;
  }

  if (currentMonth === start.month && currentDay < start.day) {
    return false;
  }

  if (currentMonth === end.month && currentDay > end.day) {
    return false;
  }

  return true;
}

export function getActiveTheme(): ThemeConfig {
  const now = new Date();

  const activeTheme = themesConfig.find(
    theme =>
      theme.id !== 'default' &&
      isDateInRange(now, theme.startDate, theme.endDate),
  );

  return activeTheme || themesConfig.find(theme => theme.id === 'default')!;
}

export function getBannersForWidth(
  theme: ThemeConfig,
  width: number,
): { src: string; alt: string }[] {
  if (width < 640) {
    return theme.banners.mobile;
  }
  if (width < 1200) {
    return theme.banners.tablet;
  }
  return theme.banners.desktop;
}
