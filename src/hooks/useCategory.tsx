import {useQuery} from '@tanstack/react-query';
import {getCategories} from 'api';

const useCategory = () => {
  const {data, isPending, error, isError, refetch} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getCategories(),
  });
  return {data, isPending, error, isError, refetch};
};

export default useCategory;
