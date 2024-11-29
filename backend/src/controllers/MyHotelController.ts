import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';

const createHotel = async (req: Request, res: Response): Promise<any> => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    //upload images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString('base64');
      let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    //save hotel in database
    const hotel = new Hotel(newHotel);
    await hotel.save();

    res
      .status(201)
      .json({ success: true, message: 'Hotel uploaded successfully', hotel });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating hotel' });
  }
};

const getHotels = async (req: Request, res: Response): Promise<any> => {
  try {
    const hotels = await Hotel.find({ userId: req?.userId });
    if (!hotels) {
      res
        .status(404)
        .json({ success: false, message: 'No hotel for user found!' });
    }

    res.json(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting hotels' });
  }
};

export default {
  createHotel,
  getHotels,
};
