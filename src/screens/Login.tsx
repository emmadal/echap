import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, Controller, FormProvider} from 'react-hook-form';
import {phoneRegex} from 'utils/regex';
import colors from 'themes/colors';
import DialpadKeypad from 'components/DialpadKeypad';
import z from 'zod';
import {useNavigation} from '@react-navigation/native';

const phoneSchema = z.object({
  phone: z
    .string()
    .regex(phoneRegex, 'Le numéro est de 10 chiffres uniquement')
    .trim(),
});

type Inputs = z.infer<typeof phoneSchema>;
const {width} = Dimensions.get('window');

const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'X'];
const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.35;

const Login = () => {
  const [code, setCode] = useState([]);
  const navigation = useNavigation();

  const methods = useForm<Inputs>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: Inputs) => console.log(`+225${data.phone}`);

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Bienvenue sur eChap! Pour vous connecter, entrez votre numéro
        </Text>
        <View style={styles.row}>
          <View style={styles.inputCode}>
            <Image source={require('assets/civ.png')} style={styles.flag} />
            <TextInput
              value="+225"
              style={[styles.input, {paddingLeft: 23}]}
              editable={false}
            />
          </View>
          <View style={styles.inputWrap}>
            <Controller
              control={methods.control}
              name="phone"
              rules={{required: true, maxLength: 10, max: 10}}
              render={({field: {onBlur, onChange, value}}) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  maxLength={10}
                  value={value}
                  placeholder="XX XX XX XX XX"
                  style={styles.input}
                  placeholderTextColor={colors.text}
                  selectionColor={colors.primary}
                  underlineColorAndroid="transparent"
                  editable={false}
                />
              )}
            />
          </View>
        </View>
        {methods.formState.errors.phone && (
          <Text style={styles.error}>
            {methods.formState.errors.phone.message}
          </Text>
        )}

        <DialpadKeypad
          dialPadContent={dialPadContent}
          setCode={setCode}
          code={code}
          dialPadSize={dialPadSize}
          dialPadTextSize={dialPadTextSize}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupButton}>Créer un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={methods.handleSubmit(onSubmit)}>
          <Text style={styles.textButton}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 55 : 30,
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
    fontSize: 14,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  inputCode: {
    flexDirection: 'row',
  },
  inputWrap: {
    flex: 1,
    marginHorizontal: 15,
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
    fontSize: 18,
    flexWrap: 'wrap',
    lineHeight: 30,
    marginTop: 40,
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

export default Login;
