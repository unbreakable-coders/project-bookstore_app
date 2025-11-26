import type { ThemeConfig } from '@/types/theme';

export const themesConfig: ThemeConfig[] = [
  // Різдво
  {
    id: 'christmas',
    name: 'Christmas',
    startDate: { month: 12, day: 15 },
    endDate: { month: 1, day: 7 },
    banners: {
      mobile: [
        {
          src: '/books/img/banner-holiday/christmas/christmas.svg',
          alt: 'Christmas Banner',
        },
        {
          src: '/books/img/banner-holiday/christmas/christmas (1).svg',
          alt: 'Christmas Sale',
        },
        {
          src: '/books/img/banner-holiday/christmas/christmas (2).svg',
          alt: 'Holiday Reading',
        },
      ],
      tablet: [
        {
          src: '/books/img/banner-holiday/christmas/christmas.svg',
          alt: 'Christmas Banner',
        },
        {
          src: '/books/img/banner-holiday/christmas/christmas (1).svg',
          alt: 'Christmas Sale',
        },
        {
          src: '/books/img/banner-holiday/christmas/christmas (2).svg',
          alt: 'Holiday Reading',
        },
      ],
      desktop: [
        {
          src: '/books/img/banner-holiday/christmas/christmas.svg',
          alt: 'Christmas Banner',
        },
        {
          src: '/books/img/banner-holiday/christmas/christmas (1).svg',
          alt: 'Christmas Sale',
        },
        {
          src: '/books/img/banner-holiday/christmas/christmas (2).svg',
          alt: 'Holiday Reading',
        },
      ],
    },
    logo: '/books/img/logo/christmas-logo.svg',
    backgroundColor: '#0f1f1f',
    particles: {
      enabled: true,
      type: 'snow',
      density: 50,
    },
  },

  // День святого Валентина
  {
    id: 'valentine',
    name: 'Valentine',
    startDate: { month: 2, day: 1 },
    endDate: { month: 2, day: 15 },
    banners: {
      mobile: [
        {
          src: '/books/img/banner-holiday/valentine/valentine.svg',
          alt: 'Valentine Banner',
        },
        {
          src: '/books/img/banner-holiday/valentine/valentine (1).svg',
          alt: 'Love Stories',
        },
        {
          src: '/books/img/banner-holiday/valentine/valentine (2).svg',
          alt: 'Romance Collection',
        },
      ],
      tablet: [
        {
          src: '/books/img/banner-holiday/valentine/valentine.svg',
          alt: 'Valentine Banner',
        },
        {
          src: '/books/img/banner-holiday/valentine/valentine (1).svg',
          alt: 'Love Stories',
        },
        {
          src: '/books/img/banner-holiday/valentine/valentine (2).svg',
          alt: 'Romance Collection',
        },
      ],
      desktop: [
        {
          src: '/books/img/banner-holiday/valentine/valentine.svg',
          alt: 'Valentine Banner',
        },
        {
          src: '/books/img/banner-holiday/valentine/valentine (1).svg',
          alt: 'Love Stories',
        },
        {
          src: '/books/img/banner-holiday/valentine/valentine (2).svg',
          alt: 'Romance Collection',
        },
      ],
    },
    logo: '/books/img/logo/valentine-logo.svg',
    backgroundColor: '#2d1820',
    particles: {
      enabled: true,
      type: 'hearts',
      density: 30,
    },
  },

  // День незалежності України (Дефолтна)
  {
    id: 'default',
    name: 'Default',
    startDate: { month: 1, day: 1 },
    endDate: { month: 12, day: 31 },
    banners: {
      mobile: [
        {
          src: '/books/img/banner/mobileBanner1.webp',
          alt: 'Banner Constitution',
        },
        { src: '/books/img/banner/mobileBanner2.webp', alt: 'UA Authors' },
        { src: '/books/img/banner/mobileBanner3.webp', alt: 'Best Sellers' },
      ],
      tablet: [
        {
          src: '/books/img/banner/bannerTablet1.webp',
          alt: 'Banner Constitution',
        },
        { src: '/books/img/banner/bannerTablet2.webp', alt: 'UA Authors' },
        { src: '/books/img/banner/bannerTablet3.webp', alt: 'Best Sellers' },
      ],
      desktop: [
        {
          src: '/books/img/banner/bannerTablet1.webp',
          alt: 'Banner Constitution',
        },
        { src: '/books/img/banner/bannerTablet2.webp', alt: 'UA Authors' },
        { src: '/books/img/banner/bannerTablet3.webp', alt: 'Best Sellers' },
      ],
    },
    logo: '/books/img/logo/halloween-logo.svg',
    backgroundColor: '#1a2332',
    particles: {
      enabled: true,
      type: 'stars',
      density: 40,
    },
  },

  // Хелловін
  {
    id: 'halloween',
    name: 'Halloween',
    startDate: { month: 10, day: 25 },
    endDate: { month: 11, day: 1 },
    banners: {
      mobile: [
        {
          src: '/books/img/banner-holiday/halloween/halloween.svg',
          alt: 'Halloween',
        },
        {
          src: '/books/img/banner-holiday/halloween/halloween (1).svg',
          alt: 'Horror Books',
        },
        {
          src: '/books/img/banner-holiday/halloween/halloween (2).svg',
          alt: 'Spooky Stories',
        },
      ],
      tablet: [
        {
          src: '/books/img/banner-holiday/halloween/halloween.svg',
          alt: 'Halloween',
        },
        {
          src: '/books/img/banner-holiday/halloween/halloween (1).svg',
          alt: 'Horror Books',
        },
        {
          src: '/books/img/banner-holiday/halloween/halloween (2).svg',
          alt: 'Spooky Stories',
        },
      ],
      desktop: [
        {
          src: '/books/img/banner-holiday/halloween/halloween.svg',
          alt: 'Halloween',
        },
        {
          src: '/books/img/banner-holiday/halloween/halloween (1).svg',
          alt: 'Horror Books',
        },
        {
          src: '/books/img/banner-holiday/halloween/halloween (2).svg',
          alt: 'Spooky Stories',
        },
      ],
    },
    logo: '/books/img/logo/halloween-logo.svg',
    backgroundColor: '#1a0f1f',
    particles: {
      enabled: false,
      type: 'confetti',
    },
  },

  // День знань
  {
    id: 'knowlenge',
    name: 'Knowledge',
    startDate: { month: 8, day: 25 },
    endDate: { month: 9, day: 3 },
    banners: {
      mobile: [
        {
          src: '/books/img/banner-holiday/knowledge/knowledge.svg',
          alt: 'Halloween',
        },
        {
          src: '/books/img/banner-holiday/knowledge/knowledge (1).svg',
          alt: 'Horror Books',
        },
        {
          src: '/books/img/banner-holiday/knowledge/knowledge (2).svg',
          alt: 'Spooky Stories',
        },
      ],
      tablet: [
        {
          src: '/books/img/banner-holiday/knowledge/knowledge.svg',
          alt: 'Halloween',
        },
        {
          src: '/books/img/banner-holiday/knowledge/knowledge (1).svg',
          alt: 'Horror Books',
        },
        {
          src: '/books/img/banner-holiday/knowledge/knowledge (2).svg',
          alt: 'Spooky Stories',
        },
      ],
      desktop: [
        {
          src: '/books/img/banner-holiday/knowledge/knowledge.svg',
          alt: 'Halloween',
        },
        {
          src: '/books/img/banner-holiday/knowledge/knowledge (1).svg',
          alt: 'Horror Books',
        },
        {
          src: '/books/img/banner-holiday/knowledge/knowledge (2).svg',
          alt: 'Spooky Stories',
        },
      ],
    },
    logo: '/books/img/logo/knowledge-logo.svg',
    backgroundColor: '#1a0f1f',
    particles: {
      enabled: false,
      type: 'confetti',
    },
  },
];
