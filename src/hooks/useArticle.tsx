import {useQuery} from '@tanstack/react-query';
import {getArticles} from 'api';
import {useStore} from 'store';

const useArticle = () => {
  const category_id = useStore(state => state.category);
  const {data, isPending, error, isError, refetch} = useQuery({
    queryKey: ['articles', category_id],
    queryFn: async () => await getArticles(category_id),
  });
  return {data, isPending, error, isError, refetch};
};

export default useArticle;
