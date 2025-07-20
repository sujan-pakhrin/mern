import express from 'express';
import userRouter from './router/user.route.js';
import authRouter from './router/auth.route.js';
import database from './config/database.js';
import { verifyAdmin, verifyToken, verifyUser } from './middleware/verifyToken.js';

const app= express();

const port=8000;
app.listen(port,()=>{
      console.log(`Server is running on port ${port}`);
})
app.use(express.json());

app.use('/api',userRouter);
app.use('/api',authRouter);


app.get('/token',verifyToken,(req,res)=>{
      res.send("Token verified")
})

app.get('/verify-user',verifyUser,(req,res)=>{
      res.send("User verified")
})

app.get('/verify-admin',verifyAdmin,(req,res)=>{
      res.send("Admin verified")
})