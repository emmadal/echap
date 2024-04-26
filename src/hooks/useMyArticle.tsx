import {useInfiniteQuery} from '@tanstack/react-query';
import {getArticlesByUser} from 'api';
import {useFocusNotifyOnChangeProps} from './useFocusNotify';
import {useStore} from 'store';

const useMyArticle = () => {
  const user = useStore(state => state.user);
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const fetchArticles = async ({pageParam}: {pageParam: number}) => {
    const req = await getArticlesByUser(user?.id!, pageParam);
    return req;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isPending,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['my_articles'],
    queryFn: fetchArticles,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _) => lastPage?.nextCursor,
    notifyOnChangeProps: notifyOnChangeProps(),
  });
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isPending,
    isFetchingNextPage,
  };
};

export default useMyArticle;
