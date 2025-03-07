import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Skill {
  name: string
  level: number
}

interface SkillCategoryProps {
  title: string
  skills: Skill[]
}

export default function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-2">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{skill.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {skill.level}%
              </span>
            </div>
            <div className="relative">
              <Progress value={skill.level} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

