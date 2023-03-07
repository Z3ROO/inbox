import { Projects } from '@/domain/projects';
import { request, Router } from 'express';

export const router = Router();

const projects = new Projects();

router.get('/projects', async (request, response) => {
  const listOfProjects = await projects.getAll();

  response.json(listOfProjects);
});

router.get('/projects/:project_id', async (request, response) => {
  const { project_id } = request.params;
  const project = await projects.getOne(project_id);

  response.json(project);
});
