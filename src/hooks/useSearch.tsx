import {useQuery} from '@tanstack/react-query';
import {searchArticle} from 'api';
import {useStore} from 'store';
import {useFocusNotifyOnChangeProps} from './useFocusNotify';

const useSearch = (title: string) => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const category_id = useStore(state => state.category);
  const {data, isPending, error, isError, refetch} = useQuery({
    queryKey: ['search', category_id],
    queryFn: async () => await searchArticle(category_id, title),
    notifyOnChangeProps: notifyOnChangeProps(),
  });
  return {data, isPending, error, isError, refetch};
};

export default useSearch;
