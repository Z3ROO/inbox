import { ProjectsRepository } from "@/repository/projects-repository";
import { Project } from "@/types/Projects";
import { WithId } from "mongodb";

export class Projects {
  repository = new ProjectsRepository();

  public async getAll() {
    return this.repository.findAll();
  }

  public async getOne(project_id: string): Promise<WithId<Project>> {
    return this.repository.findOne(project_id);
  }
  
  public async createOne(properties: Partial<Project>) {
    const { name, description } = properties;
    await this.repository.createOne({
      name,
      description: description || '',
      focused: false,
      created_at: new Date(),
      attachments: {
        inbox: false,
        queue: false
      }
    })
  }
}
