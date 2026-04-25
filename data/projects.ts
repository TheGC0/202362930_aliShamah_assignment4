export const projectCategories = [
  "All",
  "Full-Stack",
  "Mobile",
  "AI/ML",
  "Computer Vision",
  "Dashboards",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectLinkSet = {
  live?: string;
  demo?: string;
  github?: string;
  repoPrivate?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  /** ISO date string (YYYY-MM) used for sorting */
  date: string;
  impact: string;
  brandLogo?: string;
  brandLogoLight?: string;
  brandLogoDark?: string;
  image: string;
  gallery: string[];
  featured: boolean;
  categories: ProjectCategory[];
  tags: string[];
  stats: { label: string; value: string }[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  techStack: string[];
  keyFeatures: string[];
  challengesAndLearnings: string[];
  links: ProjectLinkSet;
};

export const projects: Project[] = [
  {
    slug: "gaming-plus-platform",
    title: "Gaming+ Platform",
    date: "2024-08",
    subtitle: "Official event platform for Gaming+ (KFUPM)",
    impact:
      "Delivered a production event website for registration, scheduling, and live updates while leading a 5-person web dev team.",
    brandLogo: "/gaming-plus-kfupm-logo.png",
    image: "/images/gaming-plus-1.webp",
    gallery: ["/images/gaming-plus-1.webp", "/images/gaming-plus-2.webp"],
    featured: true,
    categories: ["Full-Stack"],
    tags: ["Next.js", "Team Leadership", "UI/UX", "Event Platform"],
    stats: [
      { label: "Team", value: "5 developers" },
      { label: "Focus", value: "Registration + scheduling + live updates" },
      { label: "Role", value: "Web Dev Team Leader" },
    ],
    overview:
      "Gaming+ Platform was developed as the official web presence for the Gaming+ initiative at KFUPM. It served as a central portal for participants to discover events, register, and follow updates.",
    problem:
      "The team needed a single, reliable platform that could communicate event schedules and handle participant interactions while still shipping on a tight timeline.",
    solution:
      "I led the web team and directed both UX and implementation, structuring work into milestones and delivering a responsive Next.js application with clear information architecture and stable release workflows.",
    architecture: `Client (Browser)
  -> Next.js App Router UI
    -> Registration & Schedule Modules
      -> Content / Update Workflows
        -> Deployment`,
    techStack: ["Next.js", "TypeScript", "React", "Figma", "GitHub"],
    keyFeatures: [
      "Responsive event landing and section navigation",
      "Registration flow designed for clarity and low friction",
      "Scheduling and live update sections",
      "Modular component structure for maintainability",
    ],
    challengesAndLearnings: [
      "Balanced delivery speed with maintainable code while coordinating multiple contributors.",
      "Improved team throughput by splitting features into clear ownership slices.",
      "Used UI-first planning to reduce rework during implementation.",
    ],
    links: {
      live: "https://gamingplus.gg/LandPage",
      github: "",
      repoPrivate: true,
    },
  },
  {
    slug: "kirix-management-dashboard",
    title: "Kirix Management Dashboard",
    date: "2024-03",
    subtitle: "Internal operations suite for KIRIX Media",
    impact:
      "Centralized internal workflows across inventory, orders, accounts, and messages in one dashboard used by operations teams.",
    brandLogoLight: "/kirix_logo_black.png",
    brandLogoDark: "/kirix_logo_white.png",
    image: "/images/kirix-dashboard-1.webp",
    gallery: ["/images/kirix-dashboard-1.webp", "/images/kirix-dashboard-2.webp"],
    featured: true,
    categories: ["Full-Stack", "Dashboards"],
    tags: ["Dashboard", "Operations", "Automation", "Full-Stack"],
    stats: [
      { label: "Modules", value: "Inventory, Orders, Accounts, Messages" },
      { label: "Domain", value: "Media operations" },
      { label: "Role", value: "Full-Stack + Technical Lead" },
    ],
    overview:
      "Kirix Management Dashboard is an internal control panel that helps teams manage day-to-day operations and track business activity from a single interface.",
    problem:
      "Operational data and workflows were spread across disconnected processes, creating delays and communication gaps between teams.",
    solution:
      "I designed and developed a consolidated dashboard with dedicated modules for core business areas and integrated automation touchpoints to support production workflows.",
    architecture: `Users (Ops / Admin)
  -> Dashboard UI
    -> Inventory Service
    -> Orders Service
    -> Accounts Service
    -> Messages Service
  -> Internal automation workflows`,
    techStack: ["Next.js", "Node.js", "SQL/NoSQL data stores", "REST APIs"],
    keyFeatures: [
      "Role-oriented management dashboard interface",
      "Inventory tracking and order processing views",
      "Accounts and messages modules for internal coordination",
      "Automation support for production-related operations",
    ],
    challengesAndLearnings: [
      "Aligned technical implementation with real operational workflows through frequent stakeholder feedback.",
      "Designed module boundaries to allow staged delivery and future expansion.",
      "Learned to prioritize usability in high-frequency admin interfaces.",
    ],
    links: {
      live: "https://kirix.sa/",
      github: "",
      repoPrivate: true,
    },
  },
  {
    slug: "plate-detector",
    title: "Plate Detector",
    date: "2023-11",
    subtitle: "Computer vision pipeline for plate detection and ticket generation",
    impact:
      "Automated the flow from plate capture to database matching and ticket issuance using hosted YOLO-style inference with OpenCV preprocessing.",
    brandLogo: "/plate_reader.png",
    image: "/projects/plate-detector.png",
    gallery: [],
    featured: true,
    categories: ["AI/ML", "Computer Vision"],
    tags: ["OpenCV", "YOLO-style inference", "Automation", "Database Matching"],
    stats: [
      { label: "Pipeline", value: "Detect -> Match -> Generate ticket" },
      { label: "Vision", value: "OpenCV + hosted model inference" },
      { label: "Use Case", value: "Traffic/parking enforcement workflow" },
    ],
    overview:
      "Plate Detector is a practical computer vision system that identifies license plates from image feeds, validates them against a records database, and produces ticket outputs.",
    problem:
      "Manual inspection and matching of plate records is time consuming and error-prone when throughput increases.",
    solution:
      "I implemented a pipeline combining OpenCV preprocessing with YOLO-style hosted inference, then connected results to a matching layer and automated ticket generation workflow.",
    architecture: `Camera / Image Input
  -> OpenCV preprocessing
    -> Hosted YOLO-style inference service
      -> Plate text extraction + DB match
        -> Ticket generation service`,
    techStack: ["Python", "OpenCV", "Hosted YOLO-style inference", "Database integration"],
    keyFeatures: [
      "License plate detection from image input",
      "Database matching against known records",
      "Automated ticket generation flow",
      "Pipeline design optimized for extension and deployment",
    ],
    challengesAndLearnings: [
      "Handled variable image quality with preprocessing and validation checks.",
      "Balanced model output confidence with downstream automation needs.",
      "Strengthened approach to integrating CV systems into real business workflows.",
    ],
    links: {
      github: "",
      repoPrivate: true,
    },
  },
  {
    slug: "mdar-loan-estimation-api",
    date: "2023-07",
    title: "Mdar Loan Estimation API",
    subtitle: "ML-backed loan estimation service for real estate funding",
    impact:
      "Built an ML inference API for loan estimation using scikit-learn models and FastAPI deployment to support product decisioning workflows.",
    image: "/images/mdar-1.webp",
    gallery: ["/images/mdar-1.webp", "/images/mdar-2.webp"],
    featured: false,
    categories: ["AI/ML", "Full-Stack"],
    tags: ["FastAPI", "scikit-learn", "Ridge", "HistGradientBoostingRegressor"],
    stats: [
      { label: "Models", value: "Ridge + HistGradientBoostingRegressor" },
      { label: "Serving", value: "FastAPI endpoint" },
      { label: "Data stack", value: "pandas + NumPy + joblib" },
    ],
    overview:
      "Mdar Loan Estimation API is a machine learning service that estimates loan-related values for a real estate funding workflow.",
    problem:
      "The funding workflow required consistent, explainable predictions rather than manual estimation.",
    solution:
      "I developed preprocessing and regression pipelines using scikit-learn (including Ridge and HistGradientBoostingRegressor), applied log transforms and constraints, and exposed predictions via FastAPI with serialized model artifacts.",
    architecture: `Client / Platform
  -> FastAPI /predict endpoint
    -> Input validation + preprocessing pipeline
      -> Trained model (Ridge / HistGradientBoostingRegressor)
        -> Prediction response
  -> joblib model persistence`,
    techStack: ["Python", "pandas", "NumPy", "scikit-learn", "FastAPI", "joblib"],
    keyFeatures: [
      "Structured preprocessing and feature preparation pipeline",
      "Multiple regression model strategy for comparison",
      "FastAPI endpoint for production-style prediction requests",
      "Model artifact persistence with joblib",
    ],
    challengesAndLearnings: [
      "Improved stability by applying transformations and constraints on prediction outputs.",
      "Learned how to package ML pipelines for API-first product integration.",
      "Reinforced best practices around reproducibility and model serving boundaries.",
    ],
    links: {
      github: "",
      repoPrivate: true,
    },
  },
  {
    slug: "mqadi",
    date: "2023-03",
    title: "Mqadi",
    subtitle: "Supermarket price comparison app",
    impact:
      "Created a practical price comparison experience to help users evaluate product options across supermarkets in one interface.",
    brandLogo: "/mqadi_cart.svg",
    image: "/projects/mqadi.png",
    gallery: [],
    featured: false,
    categories: ["Mobile", "Full-Stack"],
    tags: ["Mobile/Web", "Comparison", "UX", "Product Discovery"],
    stats: [
      { label: "Type", value: "Mobile/Web product" },
      { label: "Goal", value: "Price comparison" },
      { label: "Audience", value: "Everyday shoppers" },
    ],
    overview:
      "Mqadi is a product price comparison application built to make grocery decision-making faster and more transparent.",
    problem:
      "Users had no simple way to compare pricing across stores before purchase.",
    solution:
      "I built a streamlined app flow for browsing products and comparing prices, with a UX optimized for quick lookup and reduced friction on mobile.",
    architecture: `Mobile/Web Client
  -> Product search + comparison UI
    -> Backend data aggregation layer
      -> Store/product datasets`,
    techStack: ["Flutter/React stack", "API integration", "Product data modeling"],
    keyFeatures: [
      "Search and compare product prices",
      "Mobile-first interaction patterns",
      "Simple information hierarchy for fast decisions",
      "Extensible structure for future store integrations",
    ],
    challengesAndLearnings: [
      "Focused on UX clarity to keep comparisons easy to scan.",
      "Balanced flexible data structures with consistent user display.",
      "Improved product thinking around real user shopping flows.",
    ],
    links: {
      github: "",
      repoPrivate: true,
    },
  },
  {
    slug: "karfeshha-pos",
    date: "2022-09",
    title: "Karfeshha POS",
    subtitle: "Realtime POS dashboard for order and kitchen workflows",
    impact:
      "Delivered a web POS solution with Firestore realtime updates across order, kitchen, and analytics interfaces.",
    image: "/images/karfeshha-pos-1.webp",
    gallery: ["/images/karfeshha-pos-1.webp", "/images/karfeshha-pos-2.webp"],
    featured: false,
    categories: ["Full-Stack", "Dashboards"],
    tags: ["POS", "Firestore Realtime", "Order Management", "Analytics"],
    stats: [
      { label: "Realtime", value: "Firestore-driven updates" },
      { label: "Views", value: "Order + Kitchen + Analytics" },
      { label: "Domain", value: "Point of Sale" },
    ],
    overview:
      "Karfeshha POS is a web application designed for day-to-day point-of-sale operations with synchronized interfaces for staff and management.",
    problem:
      "POS teams needed synchronized operational views to reduce communication lag between order intake and kitchen execution.",
    solution:
      "I implemented a Firestore-backed realtime architecture and built separate interfaces for order handling, kitchen operations, and analytics visibility.",
    architecture: `POS Client Interfaces
  -> Orders UI
  -> Kitchen UI
  -> Analytics UI
    -> Firebase Auth + Firestore Realtime
      -> Shared operational data`,
    techStack: ["React/Next.js", "Firebase Auth", "Firestore", "Dashboard UX"],
    keyFeatures: [
      "Realtime order synchronization",
      "Dedicated kitchen workflow interface",
      "Analytics panel for operational monitoring",
      "Modular dashboard layout for role-based use",
    ],
    challengesAndLearnings: [
      "Designed around realtime data consistency across multiple UI surfaces.",
      "Learned to structure Firestore collections for predictable live updates.",
      "Improved UX decisions for high-frequency, task-driven environments.",
    ],
    links: {
      github: "",
      repoPrivate: true,
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectNeighbors(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
