import ProjectsSection from '@/components/ProjectsSection'
import { myProjects } from '@/configs/projects'

export default function Home() {
    return (
        <>
            <ProjectsSection title="My Projects" projects={myProjects} />
        </>
    )
}
