import { ISubject } from "shared-types";
import { SubjectsRepository } from "./repository";

export class Subjects {
  subjectRepo = new SubjectsRepository();
  
  public async getAll(): Promise<ISubject[]> {
    const { data, status } =  await this.subjectRepo.findAll();
    return data;
  }

  async getByName(subjectName: string): Promise<ISubject> {
    const { data, status } = await this.subjectRepo.findByName(subjectName);
    return data[0];
  }

  async insertOne({name}: {name: string}) {
    return this.subjectRepo.insertOne({name});
  }
}