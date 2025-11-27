export interface TeamMember {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  github?: string;
  photo?: string;
  initial: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Serhiy Khraban',
    role: ' TL ',
    email: 'S.hraban@i.ua',
    linkedin: 'serhiy-hraban-074398388/',
    github: 'S-Khraban',
    photo: '/images/avatars/serhiy.jpg',
    initial: 'SK',
  },
  {
    name: 'Julia Hertseva',
    role: ' PM ',
    email: 'julia.hertseva@gmail.com',
    linkedin: 'julia-hertseva',
    github: 'Julia-Hertseva',
    photo: '/images/avatars/julia.jpg',
    initial: 'JH',
  },
  {
    name: 'Viktoriia Kodovbetska',
    role: 'FE',
    email: 'victoriia.kodovbetska@gmail.com',
    linkedin: 'viktoriia-kodovbetska/',
    github: 'Pobedasg',
    photo: '/images/avatars/viktoriia.jpg',
    initial: 'VK',
  },
  {
    name: 'Maksym Shevchuk',
    role: 'FE',
    email: 'maksym.shevchuk1002@gmil.com',
    linkedin: 'shefing/',
    github: 'MaksimShe',
    photo: '/images/avatars/maksym.jpg',
    initial: 'MS',
  },
  {
    name: 'Elina Mrachkovska',
    role: 'FE',
    email: 'elinamrachkovska@gmail.com',
    linkedin: 'elina-mrachkovska-9a837b328/',
    github: 'ElinaMrachkovska',
    photo: '/images/avatars/elina.jpg',
    initial: 'EM',
  },
];
