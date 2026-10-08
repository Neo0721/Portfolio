// All portfolio content lives here so it's easy to edit in one place.

export const site = {
  name: 'Neo Nisen Palathingal',
  role: 'Computer Engineering Student & Developer',
  location: 'Mumbai, India',
  email: 'neo.nisen.dev@gmail.com',
  // TODO: replace with your real profile URLs
  socials: [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'GitHub', href: 'https://github.com' },
    { name: 'Email', href: 'mailto:neo.nisen.dev@gmail.com' },
  ],
}

export const nav = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Work', href: '#projects' },
  { name: 'Journey', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export const about = {
  statement:
    "I'm a Computer Engineering student who builds high-performance backend systems, web applications and digital products that solve real problems — with clean logic, solid database architecture and a learner-first mindset.",
  pillars: [
    { title: 'Development', text: 'Fast, scalable and maintainable web applications built with modern tools.' },
    { title: 'Design', text: 'Clean, minimal, user-focused interfaces that feel effortless to use.' },
    { title: 'Strategy', text: 'Understanding problems deeply before writing a single line of code.' },
  ],
  education: { degree: 'Computer Engineering', year: 'Third Year', ssc: '91.60%', hsc: '77%' },
  languages: ['English', 'Hindi', 'Marathi'],
  traits: ['Keen learner', 'Consistent'],
  interests: ['Full Stack', 'AI', 'Technology', 'Entrepreneurship', 'Fintech'],
}

export const skills = [
  { category: 'Programming', items: ['Java', 'Python', 'C', 'C++', 'JavaScript'] },
  { category: 'Web', items: ['HTML', 'CSS', 'React', 'Flask'] },
  { category: 'Databases', items: ['Oracle Database', 'MongoDB', 'Firebase'] },
]

export const projects = [
  {
    number: '01',
    title: 'Hyperlocal Community Action Platform',
    short: 'Hyperlocal',
    description:
      'A college issue-reporting platform connecting students and staff to streamline communication, ticket resolution and campus-wide updates.',
    role: 'Backend development & deployment. Designed and hosted the API server handling multi-role authentication and the ticket workflow.',
    tech: ['React', 'Flask', 'MongoDB', 'Render'],
    href: '#',
    hue: 'from-[#ff4d2e] via-[#ff8a3d] to-[#2a0a05]',
  },
  {
    number: '02',
    title: 'Yours Truly Jarvis',
    short: 'Jarvis',
    description:
      'A personal branding assistant that helps people discover, showcase and grow their professional identity through personalised insights.',
    role: 'Backend development. Built the recommendation engine and personalised career insights that generate profiles automatically.',
    tech: ['Python', 'Flask', 'Firebase', 'OpenAI API'],
    href: '#',
    hue: 'from-[#6d5bff] via-[#2ec5ff] to-[#050a1f]',
  },
]

export const timeline = [
  {
    year: '2023 — Now',
    title: 'Fundraising Executive',
    org: 'E-Cell',
    text: 'Securing corporate sponsorships, managing partner relations and driving event budgets with the Entrepreneurship Cell.',
  },
  {
    year: '2024',
    title: 'Engineering Intern',
    org: 'Western Railways',
    text: '15-day technical internship with hands-on exposure to logistics workflows, networking systems and digital database logging.',
  },
  {
    year: '2024 — Now',
    title: 'Third Year, Computer Engineering',
    org: 'University',
    text: 'Algorithms, operating systems, advanced databases — and shipping full-stack apps like community platforms and branding tools.',
  },
]
