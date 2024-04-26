import React, {useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import Button from 'components/Button';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import colors from 'themes/colors';
import {helpSchema} from 'utils/schema';
import Snackbar from 'components/Snackbar';
import {useStore} from 'store';
import {reportIssues} from 'api';
import {useNavigation} from '@react-navigation/native';

type Inputs = z.infer<typeof helpSchema>;

const Support = () => {
  const user = useStore(state => state.user);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: {errors, isLoading, isSubmitting},
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(helpSchema),
    mode: 'onChange',
  });

  const onDismiss = () => {
    setVisible(false);
    setMessage('');
  };

  const processForm = async (data: Inputs) => {
    const payload = {
      ...data,
      phone: user.phone,
      user_id: user.id!,
      user_name: user.name,
    };
    const req = await reportIssues(payload);
    if (req) {
      setVisible(!visible);
      setMessage(req.message);
      reset();
    }
  };

  const startChat = () => {
    if (!user.premium) {
      Alert.alert(
        'Assistance virtuelle',
        "Veuillez souscrire a l'offre premium pour bénéficier de cette fonctionnalité",
        [
          {
            text: 'Annuler',
            style: 'destructive',
          },
          {
            text: 'Souscrire',
            onPress: () => navigation.navigate('Pricing'),
          },
        ],
        {cancelable: false},
      );
      return;
    }
    navigation.navigate('ChatSupport');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboard}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentScroll}>
        <Text style={styles.title}>Vous rencontrez un soucis ?</Text>
        <View style={styles.content}>
          <View style={styles.viewInput}>
            <Controller
              control={control}
              rules={{required: true}}
              name="name"
              render={({field: {onBlur, onChange, value}}) => (
                <TextInput
                  placeholder="Nom complet"
                  value={value}
                  autoCapitalize="none"
                  placeholderTextColor={colors.gray.main}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  selectionColor={colors.primary}
                />
              )}
            />
            <Text style={styles.error}>{errors?.name?.message}</Text>
          </View>
          <View style={styles.viewInput}>
            <Controller
              control={control}
              rules={{required: true}}
              name="subject"
              render={({field: {onBlur, onChange, value}}) => (
                <TextInput
                  placeholder="Objet"
                  value={value}
                  autoCapitalize="none"
                  placeholderTextColor={colors.gray.main}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  selectionColor={colors.primary}
                />
              )}
            />
            <Text style={styles.error}>{errors?.subject?.message}</Text>
          </View>
          <View style={styles.viewInput}>
            <Controller
              control={control}
              rules={{required: true}}
              name="description"
              render={({field: {onBlur, onChange, value}}) => (
                <TextInput
                  placeholder="Description*"
                  value={value}
                  multiline
                  autoCapitalize="none"
                  placeholderTextColor={colors.gray.main}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={[styles.input, styles.area]}
                  underlineColorAndroid="transparent"
                  selectionColor={colors.primary}
                />
              )}
            />
            <Text style={styles.error}>{errors?.description?.message}</Text>
          </View>
          <Button
            // disabled={!isValid || isLoading || isSubmitting}
            title="Envoyer le message"
            loading={isLoading || isSubmitting}
            onPress={handleSubmit(processForm)}
          />
        </View>
        <Text style={styles.descTitle}>Besoin d'une assistance complete ?</Text>
        <Text style={styles.desc}>
          24/7 assistance virtuelle pour vous! Nos assistants virtuel vous
          aideront avec des questions générales
        </Text>
        <Button title="Commencez le Chat" onPress={startChat} />
      </ScrollView>
      <Snackbar visible={visible} onDissmiss={onDismiss}>
        {message}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  content: {
    marginTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray.light,
    padding: 30,
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
  },
  desc: {
    fontSize: 17,
    marginTop: 5,
    lineHeight: 28,
    color: colors.text,
  },
  descTitle: {
    fontSize: 19,
    fontWeight: '600',
    marginTop: 25,
  },
  contentScroll: {
    flexGrow: 1,
  },
  viewInput: {
    marginVertical: 13,
  },
  input: {
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
    marginTop: 2,
  },
  area: {
    minHeight: 150,
  },
});
export default Support;
