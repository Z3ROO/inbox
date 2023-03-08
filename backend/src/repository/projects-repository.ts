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

  public async updateOne(project_id: string, properties: Partial<Project>) {
    const _id = new ObjectId(project_id);
    
    const { name, description, focused } = properties;

    const updateObject:any = {};

    if (name)
      updateObject.name = name
    if (description)
      updateObject.description = description
    if (focused)
      updateObject.focused = focused

    const result = await this.collection().findOneAndUpdate({ _id }, {
      $set: {
        ...updateObject
      }
    }, { returnDocument: 'after'})

    return result.value;
  }
}
