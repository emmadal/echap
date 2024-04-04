import {useQuery} from '@tanstack/react-query';
import {getCountries} from 'api';

const useCountry = () => {
  const {data, isPending, error, isError} = useQuery({
    queryKey: ['countries'],
    queryFn: async () => await getCountries(),
  });
  return {data, isPending, error, isError};
};

export default useCountry;
