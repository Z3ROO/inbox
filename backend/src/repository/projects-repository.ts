import { Project } from "@/types/Projects";
import { ObjectId } from "mongodb";
import { Repository } from "./inbox-repository";

export class ProjectsRepository extends Repository<Project> {
  constructor() {
    super('kagura', 'projects');
  }

  public async findAll() {
    return this.collection().find({}).toArray();
  }

  public async findOne(project_id: string) {
    const _id = new ObjectId(project_id);

    return this.collection().findOne({ _id })
  }

  public async createOne(properties: Project) {
    await this.collection().insertOne(properties);
  }
}
