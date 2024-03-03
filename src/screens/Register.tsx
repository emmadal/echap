import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'themes/colors';
import z from 'zod';
import CheckBox from '@react-native-community/checkbox';
import {nameRegex, phoneRegex} from 'utils/regex';

const userSchema = z.object({
  name: z
    .string()
    .min(7, 'Votre nom est trop coup')
    .max(30, 'Votre nom est trop long')
    .regex(nameRegex, 'Entrez un nom correct')
    .trim(),
  phone: z
    .string()
    .max(10, 'Le numéro est de 10 chiffres uniquement')
    .regex(phoneRegex, 'Le numéro est de 10 chiffres uniquement')
    .trim(),
  agree: z.boolean(),
});

type Inputs = z.infer<typeof userSchema>;

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: {errors, isValid},
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });
  const agree = watch('agree');

  const onSubmit = (data: Inputs) => console.log(data);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboard}>
      <View style={styles.welcomeView}>
        <Text style={styles.welcome}>Bienvenue sur eChap!</Text>
        <Text style={styles.welcomeSub}>Création de compte.</Text>
      </View>

      <View style={styles.formView}>
        <View>
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
                placeholderTextColor={colors.text}
                selectionColor={colors.primary}
                underlineColorAndroid="transparent"
              />
            )}
          />
          <Text style={styles.error}>{errors.name?.message}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
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
                  placeholderTextColor={colors.text}
                  selectionColor={colors.primary}
                  underlineColorAndroid="transparent"
                />
              )}
            />
          </View>
        </View>
        <Text style={styles.error}>{errors.phone?.message}</Text>

        <View style={styles.viewCheckbox}>
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
          <Text
            style={{
              fontSize: 17,
              marginLeft: 5,
            }}>
            J'accepte les termes de confidientialité
          </Text>
        </View>
        <Text style={styles.error}>{errors.agree?.message}</Text>

        {!isValid || !agree ? null : (
          <TouchableOpacity
            style={styles.button}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.textButton}>Créer votre compte</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {flex: 1, paddingHorizontal: 20},
  welcomeView: {
    alignItems: 'center',
    marginTop: 40,
  },
  viewCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 30,
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
    marginVertical: 5,
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
    marginTop: 80,
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
