import express from 'express';
import cors from 'cors';
import { app } from './setup';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
