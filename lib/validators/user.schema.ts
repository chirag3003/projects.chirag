import { z } from "zod";

export const userRespSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    phoneNo: z.string().optional()
})

export type UserResp = z.infer<typeof userRespSchema>