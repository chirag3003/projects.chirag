import api from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: api.projects.getProjects,
        select: (data) => data.projects,
    })
}

export const useProject = (id: string) => {
    return useQuery({
        queryKey: ["projects", id],
        queryFn: () => api.projects.getProject(id),
        select: (data) => data.project,
    })
}

export const useCreateProject = () => {
    return useMutation({
        mutationKey: ["projects"],
        mutationFn: api.projects.createProject,
    })
}