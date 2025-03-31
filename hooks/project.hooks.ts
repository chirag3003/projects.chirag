import api from "@/lib/api";
import { CreateProjectInput } from "@/lib/validators/project.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProjects = () => {
  console.log("fetching");
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => api.projects.getProjects(),
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: async () => {
      return await api.projects.getProject(id);
    },
  });
};

export const useCreateProject = () => {
  return useMutation({
    mutationKey: ["projects"],
    mutationFn: (input: CreateProjectInput) =>
      api.projects.createProject(input),
  });
};
