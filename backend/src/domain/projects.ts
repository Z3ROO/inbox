import { ProjectsRepository } from "@/repository/projects-repository";
import { Project } from "@/types/Projects";
import { WithId } from "mongodb";
import { Inbox } from "./inbox";

const inbox = new Inbox();

export class Projects {
  repository = new ProjectsRepository();

  public async getAll() {
    return this.repository.findAll();
  }

  public async getOne(project_id: string): Promise<WithId<Project>> {
    try {
      const project = await this.repository.findOne(project_id);
      return project;
    }
    catch(err) {
      return null
    }
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

  public async getInbox(project_id: string) {
    return await inbox.getByProject(project_id);
  }

  public getTask(project_id: string) {

  }

  public finishTask(project_id: string) {

  }
}
