import {useQuery} from '@tanstack/react-query';
import {useFocusNotifyOnChangeProps} from './useFocusNotify';
import {getOTP} from 'api';

const useOTP = () => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const {data, isPending, error, isError} = useQuery({
    queryKey: ['otp'],
    queryFn: getOTP,
    notifyOnChangeProps: notifyOnChangeProps(),
  });
  return {data, isPending, error, isError};
};

export default useOTP;
