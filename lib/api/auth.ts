import { Axios } from "axios";
import {
  LoginInput,
  VerifyOtpInput,
  VerifyResp,
  verifyRespSchema,
} from "../validators/auth.schema";

export class Auth {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }
  async login(input: LoginInput): Promise<void> {
    await this.axios.post("/auth/login", input);
  }

  async verifyOtp(input: VerifyOtpInput): Promise<VerifyResp> {
    const { data } = await this.axios.post("/auth/verify", input);
    return verifyRespSchema.parse(data);
  }
}
