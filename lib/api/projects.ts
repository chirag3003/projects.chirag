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

  async getProjects(): Promise<ProjectsResp> {
    const { data } = await this.axios.get("/projects");
    return projectsRespSchema.parse(data);
  }

  async getProject(id: string): Promise<ProjectResp> {
    const { data } = await this.axios.get(`/projects/${id}`);
    return projectRespSchema.parse(data);
  }

  async createProject(input: CreateProjectInput): Promise<void> {
    await this.axios.post("/projects", input);
  }
}
