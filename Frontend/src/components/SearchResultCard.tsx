import { AiFillStar } from 'react-icons/ai';
import { HotelType } from '../../../backend/src/shared/types';
import { Link } from 'react-router-dom';

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px] ">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded-lg"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                className="bg-slate-300 p-2 rounded-lg font-semibold text-xs whitespace-nowrap"
                key={index}
              >
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-semibold">
              {currencyFormat.format(hotel.pricePerNight)}
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-teal-600 text-white h-full p-2 font-semibold text-xl max-w-fit rounded-lg hover:bg-teal-500"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
