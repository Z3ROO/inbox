import { IDraftCategory } from "shared-types";
import { DraftCategoriesRepository } from "./repository";

export class DraftCategories {
  categoryRepo = new DraftCategoriesRepository();
  
  public async getAll(): Promise<IDraftCategory[]> {
    const { data, status } =  await this.categoryRepo.findAll();
    return data;
  }

  async getByName(categoryName: string): Promise<IDraftCategory> {
    const { data, status } = await this.categoryRepo.findByName(categoryName);
    return data[0];
  }

  async insertOne({name}: {name: string}) {
    return this.categoryRepo.insertOne({name});
  }
}