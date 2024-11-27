import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import myUserRoutes from './routes/myUserRoutes';
import myHotelRoutes from './routes/myHotelRoutes';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 5000;

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
app.use(express.static(path.join(__dirname, '../../Frontend/dist')));

app.use('/api/users', myUserRoutes);
app.use('/api/my-hotels', myHotelRoutes);

//for protected routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../Frontend/dist/index.html'));
});

app.listen(port, () => {
  console.log('Server running on localhost:', port);
});
