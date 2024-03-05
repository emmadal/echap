import {useQuery} from '@tanstack/react-query';
import {getCategories} from 'api';

const useCategory = () => {
  const {data, isPending, error, isError} = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  return {data, isPending, error, isError};
};

export default useCategory;
