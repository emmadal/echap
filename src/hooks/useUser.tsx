import {useQuery} from '@tanstack/react-query';
import {getUserDetails} from 'api';
import {useStore} from 'store';

const useUser = () => {
  const user = useStore(state => state.user);
  const {data, isPending, error, isError} = useQuery({
    queryKey: ['user', user?.id],
    queryFn: async () => await getUserDetails(user?.id!),
  });
  return {data, isPending, error, isError};
};

export default useUser;
