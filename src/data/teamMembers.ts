export interface TeamMember {
  name: string;
  role: string;
  phrase: string;
  email: string;
  linkedin: string;
  github?: string;
  photo?: string;
  initial: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Serhiy Khraban',
    role: 'Tech Lead',
    phrase: 'Lead the way, not the people.',
    email: 'S.hraban@i.ua',
    linkedin: 'serhiy-hraban-074398388/',
    github: 'S-Khraban',
    photo: '/images/avatars/serhiy.jpg',
    initial: 'SK',
  },
  {
    name: 'Julia Hertseva',
    role: 'Project Manager',
    phrase: 'Today’s chaos is tomorrow’s process. Just give it a week.',
    email: 'julia.hertseva@gmail.com',
    linkedin: 'julia-hertseva',
    github: 'Julia-Hertseva',
    photo: '/images/avatars/julia.jpg',
    initial: 'JH',
  },
  {
    name: 'Viktoriia Kodovbetska',
    role: 'Frontend Developer',
    phrase: 'finally go outdoor (holovne ne outwindow)',
    email: 'victoriia.kodovbetska@gmail.com',
    linkedin: 'viktoriia-kodovbetska/',
    github: 'Pobedasg',
    photo: '/images/avatars/viktoriia.jpg',
    initial: 'VK',
  },
  {
    name: 'Maksym Shevchuk',
    role: 'Frontend Developer',
    phrase: 'it’s not gambling( i wanna develop gambling',
    email: 'maksym.shevchuk1002@gmail.com',
    linkedin: 'shefing/',
    github: 'MaksimShe',
    photo: '/images/avatars/maksym.jpg',
    initial: 'MS',
  },
  {
    name: 'Elina Mrachkovska',
    role: 'Frontend Developer',
    phrase: 'Experientia docet',
    email: 'elinamrachkovska@gmail.com',
    linkedin: 'elina-mrachkovska-9a837b328/',
    github: 'ElinaMrachkovska',
    photo: '/images/avatars/elina.jpg',
    initial: 'EM',
  },
];
