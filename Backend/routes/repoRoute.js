import express from 'express';
import { createRepository, deleteRespositoresById, fetchRepositoryById, fetchRepositoryByName, fetchRespositoresForCurrentUser, getAllRepository, togglVisibiliyById, updateRepositry } from '../controller/repoController.js';

export const repoRute = express.Router();

repoRute.post('/create-repo',createRepository);
repoRute.get('/all-repos',getAllRepository);
repoRute.get('/get-repo/:id',fetchRepositoryById);
repoRute.get('/get-repoByName/:name',fetchRepositoryByName);
repoRute.get('/current-user/:userID',fetchRespositoresForCurrentUser);
repoRute.delete('/delete-repo/:id',deleteRespositoresById);
repoRute.patch('/toggle-visibility/:id',togglVisibiliyById)
repoRute.put('/update-repo/:id',updateRepositry);
