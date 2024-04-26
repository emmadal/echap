import {useQuery} from '@tanstack/react-query';
import {getCountries} from 'api';
import {useFocusNotifyOnChangeProps} from './useFocusNotify';

const useCountry = () => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const {data, isPending, error, isError} = useQuery({
    queryKey: ['countries'],
    queryFn: async () => await getCountries(),
    notifyOnChangeProps: notifyOnChangeProps(),
  });
  return {data, isPending, error, isError};
};

export default useCountry;
