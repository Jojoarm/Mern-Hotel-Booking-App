import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';

const createHotel = async (req: Request, res: Response): Promise<any> => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    //upload images to cloudinary
    const imageUrls = await uploadImages(imageFiles);
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

const getHotel = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id.toString();
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
    res.json(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting hotel' });
  }
};

const updateHotel = async (req: Request, res: Response): Promise<any> => {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();
    const id = req.params.hotelId.toString();
    const hotel = await Hotel.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updatedHotel,
      { new: true }
    );
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const files = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(files);

    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();

    res.status(201).json(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating hotel' });
  }
};

//uploading images
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64');
    let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
};
