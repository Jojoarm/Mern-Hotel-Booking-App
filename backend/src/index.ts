import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import myUserRoutes from './routes/myUserRoutes';
import path from 'path';

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log('Connected to DB'));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//linking frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/users', myUserRoutes);

app.listen(5000, () => {
  console.log('Server running on localhost: 5000');
});
