import express from 'express';
import { createIssue, deleteIssueById, getAllIssues, getIssueById, udpateIssueById } from '../controller/issueController.js';

export const issueRute = express.Router();

issueRute.post('/create-issue/:id',createIssue);
issueRute.put('/update-issue/:id',udpateIssueById);
issueRute.delete('/delete-issue/:id',deleteIssueById);
issueRute.get('/fetch-issue/:id',getIssueById)
issueRute.get('/fetch-issues',getAllIssues);
