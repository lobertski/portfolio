export interface Milestone {
  id: number;
  type: string;
  title: string;
  date: string;
  x: number; // Position on the timeline (pixels)
  icon: string;
  description: string;
  tags: string[];
  color: string;
}
export const MILESTONES: Milestone[] = [
  {
    id: 1,
    type: "education",
    title: "Engineering Foundations",
    date: "2015–2021",
    x: 500,
    icon: "🎓",
    description:
      "Completed a Bachelor of Science in Computer Engineering while building early web and mobile applications using React, Django, and PostgreSQL.",
    tags: [
      "HTML",
      "CSS",
      "SQL",
      "React JS",
      "React Native",
      "Django",
      "PostgreSQL",
    ],
    color: "#06b6d4",
  },

  {
    id: 2,
    type: "internship",
    title: "Software Engineer Intern",
    date: "2020–2021",
    x: 1500,
    icon: "🧩",
    description:
      "Built a web-based school records system and contributed to backend development using Django and PostgreSQL. Developed web app using React JS.",
    tags: ["React JS", "Javascript", "Django", "PostgreSQL", "Heroku"],
    color: "#22c55e",
  },

  {
    id: 3,
    type: "job",
    title: "Software Engineer at DNA Micro Software",
    date: "2021–2022",
    x: 2700,
    icon: "🔧",
    description:
      "Developed web and mobile applications for a car rental company. Integrated third-party APIs and built REST services for production systems.",
    tags: [
      "TypeScript",
      "React JS",
      "Redux",
      "React Native",
      "Express JS",
      "GQL",
      "Rethink DB",
      "MongoDB",
      "Material UI",
    ],
    color: "#f97316",
  },

  {
    id: 4,
    type: "job",
    title: "Software Engineer Analyst at Accenture (IMDA)",
    date: "2022–2023",
    x: 3900,
    icon: "🏢",
    description:
      "Delivered responsive enterprise applications for Singapore government agency. Actively contributed to Agile ceremonies and unit testing.",
    tags: ["Typescript", "React", "Material UI", "Redux", "Jest", "GQL", "AWS"],
    color: "#3b82f6",
  },

  {
    id: 5,
    type: "job",
    title: "Software Engineer III at Community Brands",
    date: "2023–2024",
    x: 5200,
    icon: "⚙️",
    description:
      "Built and maintained scalable frontend systems using React and Redux Saga. Optimized Webpack builds and supported legacy ColdFusion integrations.",
    tags: [
      "Typescript",
      "React",
      "Redux Saga",
      "Webpack",
      "ColdFusion",
      "Microsoft SQL",
      "Jest",
    ],
    color: "#a855f7",
  },

  {
    id: 6,
    type: "job",
    title: "Senior Front-end Developer at Apteum (Landchecker)",
    date: "2024–Present",
    x: 6800,
    icon: "🗺️",
    description:
      "Leading development of geospatial tools using React and Mapbox. Integrated AI observability, real-time WebSockets, automation testing, and CI/CD improvements.",
    tags: [
      "Typescript",
      "Javascript",
      "React",
      "Next JS",
      "Gatsby JS",
      "Mapbox GL",
      "Ruby on Rails",
      "Express JS",
      "PostgreSQL",
      "MongoDB",
      "Jest",
      "Playwright",
      "WebSockets",
    ],
    color: "#ec4899",
  },

  {
    id: 7,
    type: "skill",
    title: "AI & Automation Systems",
    date: "2024",
    x: 8200,
    icon: "🤖",
    description:
      "Developed AI-powered features with Langfuse, automated PDF generation with Puppeteer, and improved reliability of LLM workflows.",
    tags: ["AI", "Langfuse", "Next.js", "Puppeteer"],
    color: "#ef4444",
  },

  {
    id: 8,
    type: "skill",
    title: "Testing, Performance & Scale",
    date: "2024",
    x: 9500,
    icon: "🧪",
    description:
      "Strengthened code quality through Playwright automation, SonarQube integration, dependency upgrades, and performance optimization.",
    tags: ["Playwright", "SonarQube", "Performance", "Testing"],
    color: "#10b981",
  },
];

export const TOTAL_DISTANCE = 11000;
