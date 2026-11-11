import exrpess from 'express'
import { deleteUser, getAllUser, getUserProfile, login, signUp, UpdateUser } from '../controller/userController.js';

export const userRouter = exrpess.Router();
userRouter.post('/signup',signUp);
userRouter.post('/auth',login);
userRouter.get('/allUsers',getAllUser);
userRouter.put('/updateUser/:id',UpdateUser);
userRouter.delete('/deleteUser/:id',deleteUser);
userRouter.get('/get-user-profile/:id',getUserProfile)
