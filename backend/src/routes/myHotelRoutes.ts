import express from 'express';
import multer from 'multer';
import MyHotelController from '../controllers/MyHotelController';
import verifyToken from '../middlewares/auth';
import { validateHotelRequest } from '../middlewares/validation';

const router = express.Router();

// multer configuration for cloudinary
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  '/',
  verifyToken,
  upload.array('imageFiles', 6),
  validateHotelRequest,
  MyHotelController.createHotel
);

router.get('/', verifyToken, MyHotelController.getHotels);
router.get('/:id', verifyToken, MyHotelController.getHotel);

router.put(
  '/:hotelId',
  verifyToken,
  upload.array('imageFiles'),
  MyHotelController.updateHotel
);

export default router;
