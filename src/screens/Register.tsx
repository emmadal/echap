import {zodResolver} from '@hookform/resolvers/zod';
import React, {useMemo} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'themes/colors';
import * as Keychain from 'react-native-keychain';
import z from 'zod';
import CheckBox from '@react-native-community/checkbox';
import {registerSchema} from 'utils/schema';
import Dropdown from 'components/Dropdown';
import useCity from 'hooks/useCity';
import {login, register} from 'api';
import {useNavigation} from '@react-navigation/native';

type Inputs = z.infer<typeof registerSchema>;

const Register = () => {
  const {data} = useCity(1);
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors, isValid, isLoading, isSubmitting},
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      country_id: 1,
    },
    mode: 'onChange',
  });

  const handleCity = useMemo(() => {
    const cities = [];
    if (data && data?.data) {
      for (const i of data?.data) {
        cities.push({id: String(i.id), label: i.label, value: String(i.id)});
      }
      return cities;
    }
    return [];
  }, [data]);

  const onSubmit = async (values: Inputs) => {
    const {city_id, country_id, name, phone} = values;
    const req = await register({city_id, country_id, name, phone});
    if (req?.success) {
      const res = await login(phone);
      if (res.success) {
        await Keychain.setGenericPassword(`+225${phone}`, res?.data);
        navigation.navigate('OTP', {
          phone: `+225${phone}`,
        });
        reset();
        return;
      }
      Alert.alert('Error', data?.message);
    }
    Alert.alert('Error', req?.message);
    return;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboard}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.welcomeView}>
          <Text style={styles.welcome}>Bienvenue sur eChap!</Text>
          <Text style={styles.welcomeSub}>
            Créer votre compte en quelques secondes
          </Text>
        </View>

        <View style={styles.inputView}>
          <Controller
            name="name"
            control={control}
            rules={{required: true}}
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Nom complet"
                autoCapitalize="none"
                style={styles.textInput}
                placeholderTextColor={colors.gray.main}
                selectionColor={colors.primary}
                underlineColorAndroid="transparent"
              />
            )}
          />
          <Text style={styles.error}>{errors.name?.message}</Text>
        </View>

        <View style={[styles.phoneRow, styles.inputView]}>
          <View style={styles.inputCode}>
            <View style={styles.textInputCode}>
              <Image
                source={require('assets/civ.png')}
                style={styles.flag}
                resizeMode="contain"
              />
              <TextInput
                value="+225"
                style={{paddingLeft: 15, fontSize: 18}}
                editable={false}
              />
            </View>
          </View>
          <View style={styles.inputWrap}>
            <Controller
              name="phone"
              control={control}
              rules={{required: true, maxLength: 10, max: 10}}
              render={({field: {onBlur, onChange, value}}) => (
                <TextInput
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  inputMode="tel"
                  placeholder="Numéro de télephone"
                  autoCapitalize="none"
                  style={styles.textInput}
                  placeholderTextColor={colors.gray.main}
                  selectionColor={colors.primary}
                  underlineColorAndroid="transparent"
                />
              )}
            />
          </View>
        </View>
        <Text style={styles.error}>{errors.phone?.message}</Text>

        <View style={styles.inputView}>
          <Controller
            name="country_id"
            control={control}
            rules={{required: true}}
            render={({field: {onBlur, onChange}}) => (
              <TextInput
                value="Côte d'ivoire"
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Pays"
                editable={false}
                autoCapitalize="none"
                style={styles.textInput}
                placeholderTextColor={colors.text}
                selectionColor={colors.primary}
                underlineColorAndroid="transparent"
              />
            )}
          />
          <Text style={styles.error}>{errors.country_id?.message}</Text>
        </View>

        <Dropdown
          data={handleCity}
          setValue={setValue}
          placeholderText="Sélectionnez votre ville"
          name="city_id"
          style={styles.inputView}
        />
        <Text style={styles.error}>{errors.city_id?.message}</Text>

        <View style={[styles.inputView, styles.viewCheckbox]}>
          <Controller
            name="agree"
            control={control}
            rules={{required: true}}
            render={({field: {onBlur, onChange, value}}) => (
              <CheckBox
                disabled={false}
                value={value}
                tintColors={{
                  true: colors.primary,
                  false: colors.text,
                }}
                onValueChange={onChange}
                onCheckColor={colors.white}
                onTintColor={colors.primary}
                onChange={onBlur}
                onFillColor={colors.primary}
              />
            )}
          />
          <Text style={styles.terms}>
            J'accepte les termes de confidientialité
          </Text>
        </View>
        <Text style={styles.error}>{errors.agree?.message}</Text>

        <TouchableOpacity
          style={styles.button}
          disabled={!isValid || isLoading || isSubmitting}
          onPress={handleSubmit(onSubmit)}>
          {isLoading || isSubmitting ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text style={styles.textButton}>Créer votre compte</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {flex: 1, paddingHorizontal: 20},
  container: {
    flex: 1,
  },
  terms: {
    fontSize: 17,
    marginLeft: 5,
    color: colors.text,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  welcomeView: {
    alignItems: 'center',
    marginTop: 40,
  },
  viewCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 40,
  },
  inputCode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formView: {
    marginTop: 40,
  },
  flag: {
    width: 23,
    height: 23,
    position: 'absolute',
    marginLeft: 5,
  },
  inputWrap: {
    flex: 1,
    marginLeft: 5,
  },
  phoneRow: {
    flexDirection: 'row',
  },
  textInputCode: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    color: colors.text,
    borderWidth: 3,
    borderColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 20,
    shadowOpacity: 0.58,
    shadowRadius: 5.0,
    borderRadius: 10,
  },
  inputView: {
    marginTop: 20,
  },
  textInput: {
    textAlign: 'auto',
    backgroundColor: colors.white,
    color: colors.text,
    borderWidth: 3,
    borderColor: colors.white,
    borderRadius: 10,
    padding: 13,
    fontSize: 18,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    elevation: 20,
    shadowOpacity: 0.58,
    shadowRadius: 5.0,
  },
  error: {
    color: colors.error,
    fontSize: 14,
    marginTop: 5,
  },
  welcome: {
    fontWeight: '700',
    marginVertical: 5,
    color: colors.text,
    fontSize: 23,
  },
  welcomeSub: {
    marginVertical: 15,
    fontSize: 19,
    marginLeft: 2,
    color: colors.text,
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
    marginTop: 40,
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  textButton: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 17,
  },
});

export default Register;
