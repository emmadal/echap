import {useQuery} from '@tanstack/react-query';
import {getCitiesByCountry} from 'api';
import {useFocusNotifyOnChangeProps} from './useFocusNotify';

const useCities = (countryID: number) => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const {data, isPending, error, isError} = useQuery({
    queryKey: ['cities', countryID],
    queryFn: async () => await getCitiesByCountry(countryID),
    notifyOnChangeProps: notifyOnChangeProps(),
  });
  return {data, isPending, error, isError};
};

export default useCities;
