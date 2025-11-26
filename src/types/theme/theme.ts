export interface BannerSet {
  mobile: { src: string; alt: string }[];
  tablet: { src: string; alt: string }[];
  desktop: { src: string; alt: string }[];
}

export interface ThemeConfig {
  id: string;
  name: string;
  startDate: { month: number; day: number };
  endDate: { month: number; day: number };
  banners: BannerSet;
  logo?: string;
  logoDark?: string;
  backgroundColor?: string;
  particles?: {
    enabled: boolean;
    type: 'snow' | 'hearts' | 'leaves' | 'confetti' | 'pumpkin';
    density?: number;
  };
}
