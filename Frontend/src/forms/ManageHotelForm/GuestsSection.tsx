import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-teal-100 shadow">
        <label className="text-gray-700 text-sm font-medium">
          Adults
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={1}
            {...register('adultCount', {
              required: 'This field is required',
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-normal">
              {errors.adultCount?.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-medium">
          Children
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={0}
            {...register('childCount', {
              required: 'This field is required',
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm font-normal">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
