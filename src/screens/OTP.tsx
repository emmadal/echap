import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, Controller, FormProvider} from 'react-hook-form';
import {otpRegex} from 'utils/regex';
import colors from 'themes/colors';
import DialpadKeypad from 'components/DialpadKeypad';
import z from 'zod';
import {useMutation} from '@tanstack/react-query';
import DialpadPin from 'components/DialPin';
import useOTP from 'hooks/useOTP';
import {getOTP, verificationOTP} from 'api';
import {useStore} from 'store';

const otpSchema = z.object({
  otp: z.string().regex(otpRegex, 'Le code est de 5 chiffres').trim(),
});

type Inputs = z.infer<typeof otpSchema>;
const {width} = Dimensions.get('window');

const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'X'];
const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.35;
const pinLength = 5;
const pinContainerSize = width / 2;
const pinSize = pinContainerSize / pinLength;

const OTP = ({route}) => {
  useOTP();
  const updateProfile = useStore(state => state.updateProfile);
  const [code, setCode] = useState([]);
  const {phone} = route.params;
  const methods = useForm<Inputs>({
    resolver: zodResolver(otpSchema),
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: async (text: Inputs) => {
      const response = await verificationOTP(text.otp);
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.success) {
        updateProfile(data?.data);
        methods.reset();
        return;
      }
      Alert.alert('Erreur', data.message);
      methods.reset();
      return;
    },
    onError(error) {
      Alert.alert('Erreur', error.message);
      methods.reset();
      return;
    },
  });

  const onSubmit = (text: Inputs) => mutation.mutate({otp: text.otp});

  const resendCode = async () => await getOTP();

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Entrez le code de validation envoyé par SMS à votre numéro : {phone}
        </Text>
        {mutation.isError && (
          <Text style={styles.error}>{mutation.error?.message}</Text>
        )}
        <Controller
          control={methods.control}
          name="otp"
          rules={{required: true}}
          render={() => (
            <DialpadPin
              pinLength={pinLength}
              pinSize={pinSize}
              code={code}
              dialPadContent={dialPadContent}
            />
          )}
        />
        {methods.formState.errors.otp && (
          <Text style={styles.error}>
            {methods.formState.errors.otp.message}
          </Text>
        )}
        <DialpadKeypad
          dialPadContent={dialPadContent}
          setCode={setCode}
          code={code}
          dialPadSize={dialPadSize}
          dialPadTextSize={dialPadTextSize}
          name="otp"
        />

        <TouchableOpacity onPress={resendCode}>
          <Text style={styles.signupButton}>Renvoyez le code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={mutation.isPending}
          style={styles.button}
          onPress={methods.handleSubmit(onSubmit)}>
          <Text style={styles.textButton}>
            {mutation.isPending ? 'Verification...' : 'Valider'}
          </Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
  },
  flag: {
    width: 23,
    height: 23,
    position: 'absolute',
  },
  error: {
    color: colors.error,
    fontSize: 15,
    textAlign: 'center',
  },

  input: {
    backgroundColor: 'transparent',
    color: colors.text,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary,
    paddingBottom: 5,
    fontSize: 18,
  },
  title: {
    fontWeight: '500',
    fontSize: 17,
    flexWrap: 'wrap',
    lineHeight: 30,
    marginTop: 20,
  },
  textButton: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 17,
  },
  signupButton: {
    color: colors.primary,
    width: 'auto',
    fontWeight: '600',
    fontSize: 17,
    alignSelf: 'center',
    marginBottom: 40,
  },
  button: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'center',
    height: 50,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    marginBottom: 80,
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

export default OTP;
