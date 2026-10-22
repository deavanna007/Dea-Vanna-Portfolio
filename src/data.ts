export type Project = {
  id: string;
  number: string;
  title: string;
  label: string;
  category: "Web platforms" | "Bots & automation";
  summary: string;
  caseStudy: string;
  contribution: string;
  stack: string[];
  deliverables: string[];
  link: string;
  linkLabel: string;
  visual: "store" | "calculator" | "bookshelf" | "ai" | "download";
  tone: "lime" | "violet" | "blue" | "orange" | "cyan";
};

export const projects: Project[] = [
  {
    id: "vn-company",
    number: "01",
    title: "VN COMPANY",
    label: "Storefront & platform",
    category: "Web platforms",
    summary:
      "A responsive e-commerce storefront taken from local development to a custom-domain deployment.",
    caseStudy:
      "VN COMPANY brings product browsing into a clean, responsive storefront. The project covers the complete release path: interface implementation, production deployment on Vercel, and custom domain configuration for a polished public presence.",
    contribution:
      "Designed and built the responsive storefront, then connected the production deployment to vncompany.store.",
    stack: ["Responsive UI", "JavaScript", "Vercel", "Custom DNS"],
    deliverables: [
      "Responsive e-commerce interface",
      "Production build and Vercel deployment",
      "Custom domain connection and configuration",
    ],
    link: "https://vncompany.store",
    linkLabel: "Visit vncompany.store",
    visual: "store",
    tone: "lime",
  },
  {
    id: "rice-calculator",
    number: "02",
    title: "RICE CALCULATOR",
    label: "Utility & search visibility",
    category: "Web platforms",
    summary:
      "A focused web utility backed by structured sitemaps and deliberate search-engine indexing.",
    caseStudy:
      "Rice Calculator pairs a practical browser-based utility with a discoverability-focused release. Beyond the interface, the project addresses how search engines find and understand the site through sitemap structure and Search Console integration.",
    contribution:
      "Developed the web utility and improved its search visibility through sitemap structuring and Google Search Console.",
    stack: ["Web utility", "Sitemap", "Search Console", "Vercel"],
    deliverables: [
      "Responsive calculation experience",
      "Structured sitemap for discovery",
      "Google Search Console indexing setup",
    ],
    link: "https://rc-cambodia-bydeavanna.vercel.app",
    linkLabel: "Open Rice Calculator",
    visual: "calculator",
    tone: "violet",
  },
  {
    id: "my-bookshelf",
    number: "03",
    title: "MY BOOKSHELF",
    label: "Web catalog platform",
    category: "Web platforms",
    summary:
      "An interactive home for digital book collections, complete with original SVG branding and documentation.",
    caseStudy:
      "MY BOOKSHELF turns a digital collection into an organized, browsable web catalog. The work extends beyond application code into a cohesive visual identity, custom SVG assets, and technical documentation that makes the project easier to understand and maintain.",
    contribution:
      "Developed the catalog experience and created its SVG branding, visual assets, and technical documentation.",
    stack: ["Interactive UI", "SVG design", "Documentation", "Custom domain"],
    deliverables: [
      "Interactive digital book catalog",
      "Custom SVG branding and visual assets",
      "Full technical documentation",
    ],
    link: "https://mybookshelfkh.site",
    linkLabel: "Visit mybookshelfkh.site",
    visual: "bookshelf",
    tone: "orange",
  },
  {
    id: "telegram-ai",
    number: "04",
    title: "TELEGRAM AI ASSISTANT",
    label: "Conversational automation",
    category: "Bots & automation",
    summary:
      "Python and Node.js services that connect Telegram interactions with AI platforms and automated file workflows.",
    caseStudy:
      "These Telegram assistants combine conversational AI with practical automation. Backend services handle custom interaction flows, file downloading, and AI platform integrations, with deployments split across PythonAnywhere and Render to match each service.",
    contribution:
      "Programmed the bot logic and backend services, integrated external AI APIs, and managed cloud deployment.",
    stack: ["Python", "Node.js", "Telegram Bot API", "AI APIs", "Render"],
    deliverables: [
      "Custom Telegram conversation workflows",
      "AI platform API integrations",
      "Automated file-download handling",
      "PythonAnywhere and Render deployment",
    ],
    link: "https://t.me/tbb4M_ai_chatBot",
    linkLabel: "Chat with the AI assistant",
    visual: "ai",
    tone: "blue",
  },
  {
    id: "tiktok-downloader",
    number: "05",
    title: "TIKTOK DOWNLOAD BOT",
    label: "Telegram media utility",
    category: "Bots & automation",
    summary:
      "A dedicated Telegram bot that turns a shared TikTok link into a simple media-download workflow.",
    caseStudy:
      "This utility keeps the user experience inside Telegram: send a TikTok link and let the bot manage the download interaction. The project applies bot scripting and automated file handling to a direct, task-focused workflow.",
    contribution:
      "Built the Telegram interaction and automated media-download workflow as a focused standalone bot.",
    stack: ["Telegram Bot API", "Automation", "File handling", "Bot scripting"],
    deliverables: [
      "Link-based Telegram interaction",
      "Automated media-download workflow",
      "Task-focused chat experience",
    ],
    link: "https://t.me/DlFromSocialMediaBot",
    linkLabel: "Open the download bot",
    visual: "download",
    tone: "cyan",
  },
];

export const skillGroups = [
  {
    number: "01",
    title: "Frontend Development",
    short: "Interfaces",
    description:
      "Responsive, accessible interfaces built with a sharp eye for hierarchy, interaction, and the small details that make a product feel finished.",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS", "Responsive Design", "SVG Asset Generation"],
  },
  {
    number: "02",
    title: "Deployment & Infrastructure",
    short: "Launch",
    description:
      "The connective work between a local project and a reliable public release—from hosting and domains to search discovery.",
    skills: ["Vercel", "Render", "Hostinger DNS", "Custom Domains", "Google Search Console", "Indexing"],
  },
  {
    number: "03",
    title: "Bot & Scripting Development",
    short: "Automation",
    description:
      "Useful automation built around clear workflows: conversational bots, external APIs, file handling, and repeatable scripts.",
    skills: ["Python", "Node.js", "Telegram Bot APIs", "AI Integration", "CMD / Batch", "Git"],
  },
  {
    number: "04",
    title: "Systems & Electrical",
    short: "Hardware",
    description:
      "A systems-level perspective grounded in virtualization, diagnostics, and electrical fundamentals—not just what happens in the browser.",
    skills: ["VMware Workstation", "VirtualBox", "Systems Diagnostics", "Motor Control Circuits", "Architectural Wiring"],
  },
  {
    number: "05",
    title: "Design & Prototyping",
    short: "Direction",
    description:
      "From early wireframes to original visual assets, design is used to clarify the product before and during implementation.",
    skills: ["Figma", "Canva", "UI Wireframing", "Visual Assets", "AI Prompt Engineering"],
  },
];

export const workflowSteps = [
  {
    number: "01",
    title: "Understand the system",
    text: "Define the real task, the people using it, and the constraints around content, devices, APIs, or hardware.",
  },
  {
    number: "02",
    title: "Shape the experience",
    text: "Wireframe the flow, establish visual hierarchy, and turn requirements into an interface that feels direct and understandable.",
  },
  {
    number: "03",
    title: "Build & connect",
    text: "Implement responsive screens, backend logic, and integrations with clean states for loading, success, and failure.",
  },
  {
    number: "04",
    title: "Deploy & refine",
    text: "Ship to production, connect the domain, configure discovery where needed, and verify the complete public workflow.",
  },
];

export const blueprints = [
  {
    id: "ai-chat",
    label: "AI conversation",
    title: "A message becomes a useful answer.",
    description:
      "A Telegram conversation is only the surface. Behind it, backend code manages the request, AI integration, and the shape of the response.",
    nodes: [
      { name: "Telegram message", detail: "A user starts the workflow with a message or command inside Telegram." },
      { name: "Bot backend", detail: "A Python or Node.js service interprets the interaction and applies the bot's custom logic." },
      { name: "AI platform API", detail: "The prepared request is sent to an integrated AI platform for processing." },
      { name: "Formatted response", detail: "The service returns the result to the conversation in a useful, readable form." },
    ],
  },
  {
    id: "media-flow",
    label: "Media delivery",
    title: "A shared link becomes a direct workflow.",
    description:
      "Automation removes the repetitive steps between receiving a link and delivering the requested file back to the user.",
    nodes: [
      { name: "Link received", detail: "The bot receives a media link through a Telegram message." },
      { name: "Request handling", detail: "Backend logic reads the request and routes it into the appropriate download workflow." },
      { name: "File workflow", detail: "Automated file handling prepares the requested media for delivery." },
      { name: "Telegram delivery", detail: "The bot completes the interaction by responding inside the same chat." },
    ],
  },
  {
    id: "web-release",
    label: "Web release",
    title: "Local code becomes a public product.",
    description:
      "Deployment is treated as part of the build, including the domain and search setup that make a release genuinely reachable.",
    nodes: [
      { name: "Local build", detail: "The interface and functionality are developed and checked in a local environment." },
      { name: "Git handoff", detail: "Git tracks the implementation and provides a clean handoff to the deployment platform." },
      { name: "Cloud deploy", detail: "Vercel or Render hosts the production service, depending on the project requirements." },
      { name: "Domain & discovery", detail: "DNS, custom domain, sitemap, and Search Console setup complete the public release." },
    ],
  },
];

export const socialLinks = [
  { label: "GitHub", handle: "deavanna007", url: "https://github.com/deavanna007" },
  { label: "Telegram", handle: "@deavanna1", url: "https://t.me/deavanna1" },
  { label: "TikTok", handle: "@ismee_v1", url: "https://www.tiktok.com/@ismee_v1" },
  { label: "Facebook", handle: "@deavanna1", url: "https://www.facebook.com/deavanna1" },
];
