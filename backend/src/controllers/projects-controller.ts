import { Projects } from '@/domain/projects';
import { request, Router } from 'express';

export const router = Router();

const projects = new Projects();

router.get('/', async (request, response) => {
  const listOfProjects = await projects.getAll();

  response.json(listOfProjects);
});

router.get('/:project_id', async (request, response) => {
  const { project_id } = request.params;
  const project = await projects.getOne(project_id);

  response.json(project);
});

router.post('/', async (request, response) => {
  const { name, description } = request.body;
  projects.createOne({ name, description });
  response.status(200).json({});
});
