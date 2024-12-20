import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../context/AppContext';

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery(
    'fetchMYHotelById',
    () => apiClient.fetchMyHotelById(hotelId || ''),
    {
      //only run when hotelId has a truthy value
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: 'Hotel Updated!', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Error updating Hotel', type: 'ERROR' });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
