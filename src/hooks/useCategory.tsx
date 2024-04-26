import {useQuery} from '@tanstack/react-query';
import {getCategories} from 'api';
import {useFocusNotifyOnChangeProps} from './useFocusNotify';

const useCategory = () => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const {data, isPending, error, isError, refetch} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getCategories(),
    notifyOnChangeProps: notifyOnChangeProps(),
  });
  return {data, isPending, error, isError, refetch};
};

export default useCategory;
