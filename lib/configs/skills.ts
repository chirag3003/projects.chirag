export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 80 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Vercel", level: 85 },
      { name: "Figma", level: 80 },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Communication", level: 95 },
      { name: "Problem Solving", level: 90 },
      { name: "Team Collaboration", level: 85 },
      { name: "Project Management", level: 80 },
      { name: "Adaptability", level: 90 },
    ],
  },
]

