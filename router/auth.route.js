import express from 'express'
import { changeForgotPassowrd, forgotPassword, login, register, verifyOtp } from '../controller/auth.controller.js';
import upload from '../middleware/multerconfig.js';

const router = express.Router();

router.post('/login', login)
router.post('/verify-otp', verifyOtp)
router.post('/forgot-password', forgotPassword)
router.post('/update-forgot-password', changeForgotPassowrd)
router.post('/register', upload.single('profile'), register)

export default router