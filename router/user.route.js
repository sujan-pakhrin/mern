import express from 'express';
import { createUser, deleteUser, getAllUser, getUserById, updateUser } from '../controller/user.controller.js';
import { verifyAdmin, verifyUser } from '../middleware/verify.token.js';

const router = express.Router();

router.get('/user', verifyAdmin,getAllUser);
router.get('/user/:id',verifyUser, getUserById);
router.post('/user',createUser);
router.put('/user/:id',verifyUser,updateUser);
router.delete('/user/:id',verifyUser,deleteUser);

 
export default router;