import express from 'express'
import { login, register, verifyOtp } from '../controller/auth.controller.js';
import upload from '../middleware/multerconfig.js';

const router = express.Router();

router.post('/login', login)
router.post('/verify-otp', verifyOtp)
router.post('/register', upload.single('profile'), register)

export default router