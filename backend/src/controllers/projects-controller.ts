import { Projects } from '@/domain/projects';
import { request, Router } from 'express';

export const router = Router();

const projects = new Projects();

router.get('/', async (request, response) => {
  const listOfProjects = await projects.getAll();

  response.json(listOfProjects);
});

router.get('/project/:project_id', async (request, response) => {
  const { project_id } = request.params;
  const project = await projects.getOne(project_id);

  response.json(project);
});

router.put('/project/:project_id', async (request, response) => {
  const { project_id } = request.params;

  const { 
    name,
    description,
    focused
  } = request.body;
  console.log(request.body); 
  const updatedProject = await projects.editOne(project_id, { name, description, focused });
  console.log(updatedProject); 
  response.status(200).json(updatedProject)
});

router.post('/', async (request, response) => {
  const { name, description } = request.body;
  projects.createOne({ name, description });
  response.status(200).json({});
});

router.get('/task/:project_id', async (request, response) => {
  const { project_id } = request.params;

  const task = await projects.getTask(project_id);

  response.status(200).json(task);
});

router.delete('/task/:project_id', async (request, response) => {
  const { project_id } = request.params;

  const task = await projects.finishTask(project_id);

  response.status(200).json(task);
});

