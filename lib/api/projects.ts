import { Axios } from "axios";
import {
  CreateProjectInput,
  ProjectResp,
  projectRespSchema,
  ProjectsResp,
  projectsRespSchema,
} from "../validators/project.schema";

export class Projects {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async getProjects() {
    const { data } = await this.axios.get("/project");
    const resp = projectsRespSchema.parse(data);
    return resp.projects;
  }

  async getProject(id: string) {
    const { data } = await this.axios.get(`/project/${id}`);
    const resp =  projectRespSchema.parse(data);
    return resp.project
  }

  async createProject(input: CreateProjectInput): Promise<void> {
    await this.axios.post("/project", input);
  }
}
