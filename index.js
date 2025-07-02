import express from 'express';
import userRouter from './router/user.route.js';
import authRouter from './router/auth.route.js';
import database from './config/database.js';

const app= express();

const port=8000;
app.listen(port,()=>{
      console.log(`Server is running on port ${port}`);
})
app.use(express.json());

app.use('/api',userRouter);
app.use('/api',authRouter);