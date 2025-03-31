import api from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api.category.getCategories(),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["categories"],
    mutationFn: (name: string) => api.category.createCategory(name),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["categories"],
    mutationFn: (id: string) => api.category.deleteCategory(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
