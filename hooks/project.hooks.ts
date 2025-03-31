import api from "@/lib/api";
import { CreateProjectInput } from "@/lib/validators/project.schema";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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

export const useUpdateProject = (id: string) => {
  return useMutation({
    mutationKey: ["projects"],
    mutationFn: (input: CreateProjectInput) =>
      api.projects.updateProject(input, id),
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["projects"],
    mutationFn: (id: string) => api.projects.deleteProject(id),
    onSettled: (query) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};
