import { Kagura } from '@/domain/kagura';
import { Router } from 'express';

export const router =  Router();

const kagura = new Kagura();

router.get('/', async (request, response) => {
  try {
    const cards = await kagura.getValidCards();
    response.json(cards);
  }
  catch(err) {
    console.log(err);
    response.sendStatus(500).json({});
  }
});

router.put('/eval', async (request, response) => {
  const { _id, history } = request.body;

  try {
    await kagura.evalutateCard({_id, history});
    response.json({});
  }
  catch(err) {
    console.log(err);
    response.sendStatus(500).json({});
  }
});

router.get('/meta', async (request, response) => {
  try {
    const types = await kagura.getTypes();
    const categories = await kagura.getCategories();
    response.json({types, categories});
  }
  catch(err) {
    console.log(err);
    response.sendStatus(500).json({});
  }
});

router.post('/card', async (request, response) => {
  const { requirements, type, category } = request.body;

  try {
    await kagura.newCard({requirements, type, category});
    response.json({});
  }
  catch(err) {
    console.log(err);
    response.sendStatus(500).json({});
  }
});

router.delete('/card', async (request, response) => {
  const { card_id } = request.body;

  try {
    await kagura.removeCard(card_id);
    response.json({});
  }
  catch(err) {
    console.log(err);
    response.sendStatus(500).json({});
  }
});