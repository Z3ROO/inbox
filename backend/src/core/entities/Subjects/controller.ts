import { Request } from 'express';
import { Subjects } from '.';
import { APIResponse, ISubject, SubjectDTO } from 'shared-types';
import CustomRouter from '@/lib/expressjs/CustomRouter';

const router = new CustomRouter();
//Route:subjects

const subjects = new Subjects();

type GetSubjectsRequest = Request<{}, APIResponse<ISubject[]>, {}, {}>

router.get(``, async (req: GetSubjectsRequest, res) => {
  console.log('fix this underscore after turing classes into static')
  const _subjects = await subjects.getAll();
  res.json({
    success: true,
    statusCode: 200,
    data: _subjects,
    message: ''
  });
});

type PostInsertSubjectsRequest = Request<{}, APIResponse, SubjectDTO, {}>

router.post(`insert`, async (req: PostInsertSubjectsRequest, res) => {
  const { name } = req.body;
  await subjects.insertOne({name});
  res.json({
    success: true,
    statusCode: 200,
    data: null,
    message: ''
  });
});

export default router.router