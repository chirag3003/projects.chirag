import api from "@/lib/api";
import { LoginInput, VerifyOtpInput } from "@/lib/validators/auth.schema";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (input: LoginInput) => {
      await api.auth.login(input);
    },
    // mutationFn: api.auth.login
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: (input: VerifyOtpInput) => api.auth.verifyOtp(input),
  });
};
