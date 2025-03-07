export interface CodePen {
  title: string
  description: string
  thumbnail: string
  tags: string[]
  categories: string[]
  penUrl: string
  featured?: boolean
}

export const codepens: CodePen[] = [
  {
    title: "Animated Gradient Button",
    description: "A stylish button with animated gradient background and hover effects using pure CSS.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["CSS", "Animation", "UI Component"],
    categories: ["CSS", "Animation", "UI Components"],
    penUrl: "https://codepen.io/example/pen/animated-gradient-button",
    featured: true,
  },
  {
    title: "Interactive SVG Map",
    description:
      "An interactive map built with SVG that allows hovering and clicking on different regions with tooltips.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["SVG", "JavaScript", "Interactive"],
    categories: ["SVG", "JavaScript", "Data Visualization"],
    penUrl: "https://codepen.io/example/pen/interactive-svg-map",
    featured: true,
  },
  {
    title: "CSS Grid Layout Generator",
    description: "A tool to visually create and export CSS Grid layouts with adjustable rows, columns, and gaps.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["CSS Grid", "JavaScript", "Tool"],
    categories: ["CSS", "JavaScript", "Tools", "Generators"],
    penUrl: "https://codepen.io/example/pen/grid-generator",
    featured: true,
  },
  {
    title: "Particle Text Effect",
    description: "Text that disperses into particles and reforms when hovered, created with Canvas and JavaScript.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["Canvas", "JavaScript", "Animation"],
    categories: ["Canvas", "Animation", "JavaScript"],
    penUrl: "https://codepen.io/example/pen/particle-text",
  },
  {
    title: "CSS-only Accordion",
    description:
      "A responsive accordion component built with pure CSS using the checkbox hack, no JavaScript required.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["CSS", "HTML", "No JS"],
    categories: ["CSS", "UI Components", "CSS Tricks"],
    penUrl: "https://codepen.io/example/pen/css-accordion",
  },
  {
    title: "3D Card Flip Effect",
    description: "A card with smooth 3D flip animation on hover, showing different content on each side.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["CSS 3D", "Animation", "UI Component"],
    categories: ["CSS", "Animation", "UI Components", "3D"],
    penUrl: "https://codepen.io/example/pen/3d-card-flip",
  },
  {
    title: "Custom Audio Player",
    description: "A custom-styled audio player with visualization using the Web Audio API and Canvas.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["Web Audio API", "Canvas", "UI Component"],
    categories: ["JavaScript", "Audio", "UI Components", "Canvas"],
    penUrl: "https://codepen.io/example/pen/audio-player",
  },
  {
    title: "CSS Loading Animations",
    description: "A collection of creative loading spinners and animations built with pure CSS.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["CSS", "Animation", "Loaders"],
    categories: ["CSS", "Animation", "UI Components"],
    penUrl: "https://codepen.io/example/pen/loading-animations",
  },
  {
    title: "Responsive Timeline",
    description: "A vertical timeline that adapts to different screen sizes with smooth scroll animations.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["CSS", "Responsive", "UI Component"],
    categories: ["CSS", "UI Components", "Responsive Design"],
    penUrl: "https://codepen.io/example/pen/responsive-timeline",
  },
  {
    title: "Interactive Chart with D3.js",
    description: "A dynamic and interactive data visualization chart built with D3.js with tooltips and transitions.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["D3.js", "SVG", "Data Visualization"],
    categories: ["JavaScript", "Data Visualization", "D3.js"],
    penUrl: "https://codepen.io/example/pen/d3-chart",
  },
  {
    title: "CSS Parallax Scrolling",
    description:
      "A parallax scrolling effect created with pure CSS, featuring multiple layers moving at different speeds.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["CSS", "Parallax", "Scrolling Effects"],
    categories: ["CSS", "Animation", "Scrolling Effects"],
    penUrl: "https://codepen.io/example/pen/css-parallax",
  },
  {
    title: "Typewriter Text Effect",
    description: "A typewriter text animation that simulates typing with adjustable speed and cursor blinking.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    tags: ["JavaScript", "CSS", "Text Animation"],
    categories: ["JavaScript", "Animation", "Text Effects"],
    penUrl: "https://codepen.io/example/pen/typewriter-effect",
  },
]

