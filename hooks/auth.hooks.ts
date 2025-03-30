import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: api.auth.login,
    });
}

export const useVerifyOtp = () => {
    return useMutation({
        mutationKey: ["verify-otp"],
        mutationFn: api.auth.verifyOtp,
    });
}