import express from 'express'
import { login, register } from '../controller/auth.controller.js';
import upload from '../middleware/multerconfig.js';

const router = express.Router();

router.post('/login', login)
router.post('/register', upload.single('profile'), register)

export default router