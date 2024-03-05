import { DraftCategoriesRepository } from "./repository";

export class DraftCategories {
  categoryRepo = new DraftCategoriesRepository();
  
  public async getAll() {
    const {data, status} =  await this.categoryRepo.findAll();
    return data;
  }

  async getByName(categoryName: string) {
    return await this.categoryRepo.findByName(categoryName);
  }

  async insertOne({name}: {name: string}) {
    return this.categoryRepo.insertOne({name});
  }
}