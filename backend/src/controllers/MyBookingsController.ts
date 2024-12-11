import { Request, Response } from 'express';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';

const getBookings = async (req: Request, res: Response): Promise<any> => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error fetching bookings' });
  }
};

export default {
  getBookings,
};
