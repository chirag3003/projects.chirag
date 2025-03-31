import { Axios } from "axios";
import { categoriesRespSchema } from "../validators/category.schema";

export class Category {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }

  async getCategories() {
    const { data } = await this.axios.get("/category");
    const resp = categoriesRespSchema.parse(data);
    return resp.categories;
  }

  async createCategory(name: string): Promise<void> {
    await this.axios.post("/category", { name });
  }

  async deleteCategory(id: string): Promise<void> {
    await this.axios.delete(`/category/${id}`);
  }
}
