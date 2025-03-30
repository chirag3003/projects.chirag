import axios, { Axios } from "axios";
import { Auth } from "./auth";
import { Projects } from "./projects";
import { User } from "./user";

class Api {
  private readonly _axios: Axios;
  auth: Auth;
  projects: Projects
  user: User

  constructor() {
    this._axios = this.createAxios();
    this.auth = new Auth(this._axios);
    this.projects = new Projects(this._axios);
    this.user = new User(this._axios);
  }

  private createAxios() {
    return axios.create({
      baseURL: "",
    });
  }

  getAxios() {
    return this._axios;
  }
}

const api = new Api();
export default api;