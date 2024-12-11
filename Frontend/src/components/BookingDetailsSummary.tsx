import { HotelType } from '../../../backend/src/shared/types';

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-semibold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-semibold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-In:
          <div className="font-semibold">{checkIn.toDateString()}</div>
        </div>
        <div>
          Check-Out:
          <div className="font-semibold">{checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total duration of stay:
        <div className="font-semibold">{numberOfNights} Nights</div>
      </div>
      <div>
        Guests{' '}
        <div className="fonst-semibold">
          {adultCount} adults & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
