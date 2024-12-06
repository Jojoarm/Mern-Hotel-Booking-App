import express from 'express';
import HotelController from '../controllers/HotelController';
import { validateHotelDetails } from '../middlewares/validation';

const router = express.Router();

router.get('/search', HotelController.searchHotels);
router.get('/:id', validateHotelDetails, HotelController.hotelDetails);

export default router;
