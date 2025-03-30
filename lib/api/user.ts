import { Axios } from "axios";
import { userRespSchema } from "../validators/user.schema";

export class User {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async getMe() {
    const { data } = await this.axios.get("/user/me");
    return userRespSchema.parse(data);
  }
}
