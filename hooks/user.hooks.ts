import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: api.user.getMe,
    });
}