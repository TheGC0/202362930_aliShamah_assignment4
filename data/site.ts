export const heroRoles = [
  "Software Engineer",
  "Full-Stack (Web & Mobile)",
  "AI/ML Engineer",
] as const;

export const siteConfig = {
  name: "Ali Shamah",
  location: "Dhahran, Saudi Arabia",
  email: "ali_shamah@outlook.com",
  phone: "+966544142643",
  phoneDisplay: "+966 54 414 2643",
  shortTitle: heroRoles.join(" | "),
  longTitle: "Mobile & Web Application Developer | AI/ML",
  tagline:
    "I build production-grade web, mobile, and AI-powered products with a focus on usability, maintainability, and measurable business impact.",
  description:
    "Ali Shamah is a Software Engineer focused on full-stack web/mobile applications and applied AI/ML systems.",
  url: "https://ali-shamah-portfolio.vercel.app",
  links: {
    linkedin: "https://www.linkedin.com/in/ali-shamah/",
    github: "https://github.com/TheGC0",
    linktree: "https://linktr.ee/Ali_shamah",
    resume: "/Ali%20Shamah%20CV2.pdf",
    website: "/",
    whatsapp: "https://wa.me/966544142643",
  },
} as const;

export type TimelineEntry = {
  role: string;
  organization: string;
  period: string;
  points: string[];
};

export const experienceTimeline: TimelineEntry[] = [
  {
    role: "Board Member & CTO",
    organization: "KIRIX",
    period: "Jul 2025 - Present · 8 mos",
    points: [],
  },
  {
    role: "Full-Stack Developer / Technical Lead (Project-Based)",
    organization: "KIRIX Media",
    period: "July 2025 - Present",
    points: [
      "Developed the company portfolio website with a client order system.",
      "Built an internal management dashboard covering inventory, orders, accounts, and messages.",
      "Developed automated systems to support media production processes.",
      "Implemented automation workflows including a production printing station.",
      "Collaborated with stakeholders to translate requirements into reliable technical solutions.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    organization: "Independent",
    period: "2024 - Present",
    points: [
      "Built an employee management and customer rewards dashboard for Malaqa Cafe.",
      "Developed a music request app that forwards song requests to cafe sound systems.",
      "Implemented a plate detection system with database matching and ticket generation.",
      "Developed Mqadi, a supermarket product price comparison application.",
      "Built Mdar, a real estate funding platform with an ML-based loan estimation API.",
      "Delivered Dashtach Salla storefront implementation with mobile-first UX.",
      "Built Karfeshha POS with Firestore realtime order, kitchen, and analytics interfaces.",
    ],
  },
];

export const leadership = [
  {
    role: "Website Development Leader",
    organization: "Gaming+",
    period: "Jun 2025 - Feb 2026 · 9 mos",
    points: [],
  },
  {
    role: "Member",
    organization: "KFUPM Computer Club",
    period: "Sep 2024 - Feb 2026 · 1 yr 6 mos",
    points: [],
  },
  {
    role: "Finance Member",
    organization: "KFUPM WORLD",
    period: "Jul 2025 - Dec 2025 · 6 mos",
    points: [],
  },
  {
    role: "Shop Manager and System Developer",
    organization: "KFUPM Gaming+",
    period: "Sep 2024 - Dec 2024 · 4 mos",
    points: [],
  },
] as const;

export const education = {
  degree: "B.S. Computer Science",
  school: "King Fahd University of Petroleum & Minerals (KFUPM)",
  period: "2023 - Present",
  graduation: "Expected Graduation: June 2027",
};

export const certifications = [
  "Freelancer License - Websites Programming & Development",
  "Mobile App Development Bootcamp - Tech Hub",
  "Data Analysis - KFUPM",
] as const;

export const skillGroups = [
  {
    title: "Languages",
    skills: ["JavaScript", "Dart", "Python", "SQL"],
  },
  {
    title: "Frontend & Mobile",
    skills: ["React", "Next.js", "Flutter", "Swift"],
  },
  {
    title: "Backend & Databases",
    skills: ["Node.js", "Firebase (Auth/Firestore)", "MySQL", "MongoDB", "Supabase"],
  },
  {
    title: "Tools",
    skills: ["Git/GitHub", "REST APIs", "Postman", "Figma", "Android Studio"],
  },
  {
    title: "Concepts",
    skills: ["UI/UX Design", "System Design Fundamentals", "API Integration", "Agile/Scrum"],
  },
  {
    title: "AI/ML",
    skills: [
      "scikit-learn",
      "Regression modeling",
      "FastAPI deployment",
      "OpenCV",
      "YOLO-style detection (hosted inference)",
    ],
  },
] as const;
