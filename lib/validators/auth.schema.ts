import { z } from "zod";

export const loginInputSchema = z.object({
  email: z.string().email(),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const verifyOtpSchema = z.object({
  code: z.string(),
  email: z.string().email(),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export const verifyRespSchema = z.object({
  token: z.string(),
  user: z.object({
    email: z.string().email(),
    id: z.string(),
    name: z.string(),
    phoneNo: z.string(),
  }),
});

export type VerifyResp = z.infer<typeof verifyRespSchema>;
