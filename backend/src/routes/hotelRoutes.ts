import express from 'express';
import HotelController from '../controllers/HotelController';
import { validateHotelDetails } from '../middlewares/validation';
import verifyToken from '../middlewares/auth';

const router = express.Router();

router.get('/search', HotelController.searchHotels);
router.get('/:id', validateHotelDetails, HotelController.hotelDetails);
router.post(
  '/:hotelId/bookings/payment-intent',
  verifyToken,
  HotelController.stripePayment
);
router.post('/:hotelId/bookings', verifyToken, HotelController.makeBooking);

export default router;
