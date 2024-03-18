import {useQuery} from '@tanstack/react-query';
import {getOTP} from 'api';

const useOTP = () => {
  const {data, isPending, error, isError} = useQuery({
    queryKey: ['otp'],
    queryFn: getOTP,
  });
  return {data, isPending, error, isError};
};

export default useOTP;
