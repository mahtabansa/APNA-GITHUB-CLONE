import express from 'express';
import { userRouter } from './userRoute.js';
import { repoRute } from './repoRoute.js';
import { issueRute } from './issueRoute.js';

export const mainRouter = express.Router();

mainRouter.use(userRouter)
mainRouter.use(repoRute)
mainRouter.use(issueRute)
