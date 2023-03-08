import { ProjectsRepository } from "@/repository/projects-repository";
import { Project, ProjectQueueNode } from "@/types/Projects";
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

  public async getTask(project_id: string): Promise<ProjectQueueNode> {
    const task = await inbox.getHeadOfQueue(project_id);
    if (!task)
      return null;

    return {
      content: task.content,
      priority: task.project.queue,
      queued_at: task.project.queued_at
    }
  }

  public async finishTask(project_id: string): Promise<ProjectQueueNode> {
    const task = await inbox.dequeueItem(project_id);
    if (!task)
      return null;

    return {
      content: task.content,
      priority: task.project.queue,
      queued_at: task.project.queued_at
    }
  }

}
