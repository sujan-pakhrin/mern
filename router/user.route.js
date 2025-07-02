import express from 'express';
import { createUser, deleteUser, getAllUser, getUserById, updateUser } from '../controller/user.controller.js';

const router = express.Router();

router.get('/user', getAllUser);
router.get('/user/:id', getUserById);
router.post('/user',createUser);
router.put('/user/:id',updateUser);
router.delete('/user/:id',deleteUser);
 
export default router;