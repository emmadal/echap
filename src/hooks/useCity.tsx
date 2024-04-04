import {useQuery} from '@tanstack/react-query';
import {getCitiesByCountry} from 'api';

const useCities = (countryID: number) => {
  const {data, isPending, error, isError} = useQuery({
    queryKey: ['cities', countryID],
    queryFn: async () => await getCitiesByCountry(countryID),
  });
  return {data, isPending, error, isError};
};

export default useCities;
