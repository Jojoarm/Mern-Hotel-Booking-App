import express from 'express';
import HotelController from '../controllers/HotelController';

const router = express.Router();

router.get('/search', HotelController.searchHotels);

export default router;
