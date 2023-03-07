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

}
