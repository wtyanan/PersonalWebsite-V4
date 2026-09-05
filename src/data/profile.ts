export type Link = {
  label: string;
  href: string;
  icon: 'linkedin' | 'github' | 'resume';
};

export type Entry = {
  /** Used to look up `/logos/<slug>.png`; falls back to a monogram. */
  slug: string;
  company: string;
  /** The company's own site - LinkedIn company pages gate logged-out visitors. */
  url: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
};

export type Group = {
  label: string;
  entries: Entry[];
};

export const profile = {
  name: 'Terry Wang',
  tagline: ['Software Engineer @ Cresta', 'Ex-Google', 'UWaterloo'],
};

export const links: Link[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wtyanan/', icon: 'linkedin' },
  { label: 'Résumé', href: 'https://drive.proton.me/urls/0DTXKBD88C#HPO89fOMbVv9', icon: 'resume' },
  { label: 'GitHub', href: 'https://github.com/wtyanan', icon: 'github' },
];

export const groups: Group[] = [
  {
    label: 'Full-time',
    entries: [
      {
        slug: 'cresta',
        company: 'Cresta',
        url: 'https://cresta.com',
        role: 'Software Engineer',
        period: 'Dec 2025 - Present',
        location: 'Remote, Canada',
        current: true,
      },
      {
        slug: 'google',
        company: 'Google',
        url: 'https://about.google',
        role: 'Software Engineer II → III',
        period: 'Aug 2021 - Oct 2025',
        location: 'Kitchener, ON, Canada · Los Angeles, CA, US',
      },
    ],
  },
  {
    label: 'Internships',
    entries: [
      {
        slug: 'ritual',
        company: 'Ritual',
        url: 'https://ritual.co',
        role: 'Software Engineer Intern',
        period: 'Sep 2020 - Dec 2020',
        location: 'Toronto, ON, Canada',
      },
      {
        slug: 'google',
        company: 'Google',
        url: 'https://about.google',
        role: 'Software Engineer Intern',
        period: 'May 2020 - Aug 2020',
        location: 'Mountain View, CA, US',
      },
      {
        slug: 'deloitte',
        company: 'Deloitte',
        url: 'https://www.deloitte.com',
        role: 'Software Engineer Intern',
        period: 'Jan 2019 - Apr 2019',
        location: 'Kitchener, ON, Canada',
      },
      {
        slug: 'finastra',
        company: 'Finastra',
        url: 'https://www.finastra.com',
        role: 'Software Engineer Intern',
        period: 'May 2018 - Aug 2018',
        location: 'Toronto, ON, Canada',
      },
    ],
  },
  {
    label: 'Education',
    entries: [
      {
        slug: 'uwaterloo',
        company: 'University of Waterloo',
        url: 'https://uwaterloo.ca',
        role: 'BCS, Computer Science',
        period: 'Sep 2016 - Apr 2021',
        location: 'Waterloo, ON, Canada',
      },
    ],
  },
];
