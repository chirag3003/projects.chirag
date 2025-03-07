export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  categories: string[]
  demoUrl: string
  repoUrl: string
  stackblitzUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js, Stripe, and a headless CMS. Features include product listings, cart functionality, user authentication, and payment processing.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Prisma"],
    categories: ["Web App", "Full Stack", "E-commerce"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    stackblitzUrl: "https://stackblitz.com/edit/nextjs-commerce-demo",
    featured: true,
  },
  {
    title: "Task Management App",
    description:
      "A productivity app that helps users manage their tasks with features like drag-and-drop organization, due dates, priority levels, and team collaboration tools.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    categories: ["Web App", "Full Stack", "Productivity"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    stackblitzUrl: "https://stackblitz.com/edit/react-task-manager",
    featured: true,
  },
  {
    title: "AI Image Generator",
    description:
      "An application that uses machine learning to generate unique images based on text prompts. Integrates with OpenAI's DALL-E or similar APIs.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "TensorFlow", "React"],
    categories: ["AI/ML", "Web App", "Creative"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    featured: true,
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website built with Next.js and Tailwind CSS. Features a clean, modern design with dark mode support and optimized performance.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    categories: ["Web App", "Frontend", "UI/UX"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    stackblitzUrl: "https://stackblitz.com/edit/nextjs-portfolio-template",
  },
  {
    title: "Weather Dashboard",
    description:
      "A weather application that provides real-time weather data, forecasts, and interactive maps. Built with a focus on UI/UX and performance.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "OpenWeather API", "Chart.js"],
    categories: ["Web App", "Frontend", "Data Visualization"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    stackblitzUrl: "https://stackblitz.com/edit/react-weather-app-demo",
  },
  {
    title: "Markdown Editor",
    description:
      "A real-time markdown editor with preview functionality, syntax highlighting, and export options. Built with React and CodeMirror.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "CodeMirror", "Marked"],
    categories: ["Web App", "Frontend", "Developer Tool"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "Budget Tracker",
    description:
      "A personal finance application that helps users track income, expenses, and savings goals. Features include data visualization and category-based analysis.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Vue.js", "Firebase", "Chart.js"],
    categories: ["Web App", "Full Stack", "Finance"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    stackblitzUrl: "https://stackblitz.com/edit/vue-budget-tracker",
  },
  {
    title: "Recipe Finder",
    description:
      "A web application that allows users to search for recipes based on ingredients, dietary restrictions, and cuisine types. Integrates with a recipe API.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Redux", "Spoonacular API"],
    categories: ["Web App", "Frontend", "Food & Drink"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "Code Snippet Library",
    description:
      "A platform for developers to store, organize, and share code snippets. Features include syntax highlighting, tagging, and search functionality.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    categories: ["Web App", "Full Stack", "Developer Tool"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    stackblitzUrl: "https://stackblitz.com/edit/nextjs-code-snippet-library",
  },
  {
    title: "Social Media Dashboard",
    description:
      "A dashboard that aggregates data from multiple social media platforms, providing analytics and insights on engagement, reach, and audience demographics.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "D3.js", "Social Media APIs"],
    categories: ["Web App", "Frontend", "Data Visualization", "Analytics"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "Cryptocurrency Tracker",
    description:
      "A real-time cryptocurrency tracking application that displays price data, market trends, and portfolio management tools for crypto investors.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "CoinGecko API", "Chart.js"],
    categories: ["Web App", "Frontend", "Finance", "Data Visualization"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
    stackblitzUrl: "https://stackblitz.com/edit/react-crypto-tracker",
  },
  {
    title: "Virtual Event Platform",
    description:
      "A platform for hosting virtual events, webinars, and conferences with features like live streaming, chat, and attendee management.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "WebRTC", "Socket.io"],
    categories: ["Web App", "Full Stack", "Communication"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "Mobile Fitness App",
    description:
      "A cross-platform mobile application for fitness tracking, workout planning, and health monitoring with social features.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "Firebase", "HealthKit"],
    categories: ["Mobile App", "Full Stack", "Health & Fitness"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "IoT Home Automation",
    description:
      "A system for controlling and monitoring smart home devices through a central dashboard with automation rules and schedules.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "MQTT", "Raspberry Pi"],
    categories: ["IoT", "Full Stack", "Hardware"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
]

