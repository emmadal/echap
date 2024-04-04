import React, {startTransition, useMemo, useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native';
import {z} from 'zod';
import requestMediaPermission from 'utils/permissions';
import {pickPhoto} from 'utils/pickPhoto';
import {updateUserProfile, uploadFile} from 'api';
import {useStore} from 'store';
import {userSchema} from 'utils/schema';
import Avatar from 'components/Avatar';
import colors from 'themes/colors';
import {PHOTO_SIZE_MAX} from 'constants/size';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'components/Snackbar';
import Dropdown from 'components/Dropdown';
import useCities from 'hooks/useCity';

type Inputs = z.infer<typeof userSchema>;

const EditProfile = () => {
  const user = useStore(state => state.user);
  const updatePhoto = useStore(state => state.updatePhoto);
  const getUserProfile = useStore(state => state.getUserProfile);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const {data} = useCities(user?.country_id);

  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors, isLoading, isSubmitting},
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      name: user.name,
      biography: user.biography,
      whatsapp: user.whatsapp,
      tiktok: user.tiktok,
      instagram: user.instagram,
      city_id: user?.city_id,
      country_id: user?.country_id,
    },
  });

  const onDismiss = () => {
    setVisible(false);
    setMessage('');
  };

  const handleCities = useMemo(() => {
    const cities = [];
    if (data && data.data?.length) {
      for (const i of data?.data) {
        cities.push({id: String(i.id), label: i.label, value: String(i.id)});
      }
      return cities;
    }
    return [];
  }, [data]);

  // upload file
  const processFile = async () => {
    // request media permission
    const request = await requestMediaPermission();
    if (request) {
      // choose photo public photo folder
      const {assets} = await pickPhoto(1);
      if (assets?.[0]?.fileSize! > PHOTO_SIZE_MAX) {
        Alert.alert(
          'Image lourde',
          'Fichier volumineux. Choisissez une image en dessous de 10MB',
        );
        return;
      }
      if (assets?.[0]?.fileSize! < PHOTO_SIZE_MAX) {
        // format file data to sent to the server
        const formdata = new FormData();
        formdata.append('file', {
          uri: assets?.[0].uri,
          name: assets?.[0].fileName,
          type: assets?.[0].type,
        });
        setLoading(!loading);
        // we upload the file
        const req = await uploadFile(formdata);
        if (req.success) {
          startTransition(() => {
            setLoading(false);
            updatePhoto(req?.data);
          });
          return;
        }
      }
      setLoading(false);
      updatePhoto(user?.photo);
      return;
    }
  };

  // update profile
  const processForm = async (profile: Inputs) => {
    const obj = {
      ...profile,
      country_id: user.country_id,
      premium: user.premium,
      photo: user.photo,
      phone: user?.phone,
    };
    const req = await updateUserProfile(obj, user?.id!);
    return req;
  };

  // send data to the server
  const {mutate, isPending} = useMutation({
    mutationFn: async values => await processForm(values),
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: ['user', user?.id],
      });
      startTransition(() => {
        getUserProfile(response.data);
        setVisible(!visible);
        setMessage(response?.message);
      });
    },
    onError: err => {
      setVisible(!visible);
      setMessage(err.message);
      return;
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboard}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.ContainerStyle}>
        <TouchableOpacity
          disabled={loading}
          style={styles.avatar}
          onPress={processFile}>
          {user?.photo ? (
            <Avatar size={70} source={user.photo!} />
          ) : (
            <View style={styles.iconImg}>
              <Icon name="add-a-photo" size={45} color={colors.text} />
            </View>
          )}
          {loading ? (
            <ActivityIndicator
              animating={true}
              size="small"
              color={colors.primary}
            />
          ) : null}
        </TouchableOpacity>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Nom complet</Text>
          <Controller
            control={control}
            rules={{required: true}}
            name="name"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                placeholder="Nom complet"
                value={value}
                autoCapitalize="none"
                placeholderTextColor={colors.text}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                maxLength={200}
                underlineColorAndroid="transparent"
                selectionColor={colors.primary}
              />
            )}
          />
          <Text style={styles.error}>{errors?.name?.message}</Text>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Localité</Text>
          <Dropdown
            data={handleCities}
            setValue={setValue}
            placeholderText="Sélectionnez votre ville"
            name="city_id"
          />
          <Text style={styles.error}>{errors?.city_id?.message}</Text>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Biographie</Text>
          <Controller
            control={control}
            rules={{required: true}}
            name="biography"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                placeholder="Biographie"
                value={value}
                autoCapitalize="none"
                placeholderTextColor={colors.text}
                onChangeText={onChange}
                onBlur={onBlur}
                style={[styles.input, {minHeight: 100}]}
                multiline
                maxLength={250}
                underlineColorAndroid="transparent"
                selectionColor={colors.primary}
              />
            )}
          />
          <Text style={styles.error}>{errors?.biography?.message}</Text>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Contact Whatsapp</Text>
          <Controller
            control={control}
            rules={{required: false}}
            name="whatsapp"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                placeholder="Whatsapp"
                value={value}
                autoCapitalize="none"
                placeholderTextColor={colors.text}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                underlineColorAndroid="transparent"
                selectionColor={colors.primary}
              />
            )}
          />
          <Text style={styles.error}>{errors?.whatsapp?.message}</Text>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Profil Instagram</Text>
          <Controller
            control={control}
            rules={{required: false}}
            name="instagram"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                placeholder="Instagram"
                value={value}
                autoCapitalize="none"
                placeholderTextColor={colors.text}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                underlineColorAndroid="transparent"
                selectionColor={colors.primary}
              />
            )}
          />
          <Text style={styles.error}>{errors?.instagram?.message}</Text>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Profil Tiktok</Text>
          <Controller
            control={control}
            rules={{required: false}}
            name="tiktok"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                placeholder="Tiktok"
                value={value}
                autoCapitalize="none"
                placeholderTextColor={colors.text}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                underlineColorAndroid="transparent"
                selectionColor={colors.primary}
              />
            )}
          />
          <Text style={styles.error}>{errors?.tiktok?.message}</Text>
        </View>
        <TouchableOpacity
          disabled={isPending || isLoading || isSubmitting}
          style={styles.button}
          onPress={handleSubmit(mutate)}>
          {isSubmitting || isLoading || isPending ? (
            <ActivityIndicator
              animating={isSubmitting || isLoading || isPending}
              color={colors.white}
              size="large"
            />
          ) : (
            <Text style={styles.textButton}>Mise à jour</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <Snackbar visible={visible} onDissmiss={onDismiss}>
        {message}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  label: {
    fontSize: 17,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 2,
  },
  input: {
    backgroundColor: colors.gray.light,
    padding: 15,
    width: '100%',
    color: colors.text,
    borderColor: colors.dark,
    borderWidth: 0.5,
    borderRadius: 2,
    textAlign: 'auto',
    fontSize: 15,
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 20,
  },
  keyboard: {
    flex: 1,
  },
  other: {
    marginBottom: 10,
  },
  btn: {
    flex: 1,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 60 : 50,
    alignSelf: 'center',
  },
  ContainerStyle: {
    flexGrow: 1,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  viewInput: {
    marginTop: 9,
  },
  error: {
    color: colors.error,
  },
  button: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    height: 45,
    marginTop: 20,
    marginBottom: 100,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  textButton: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 17,
  },
  iconImg: {
    borderWidth: 2,
    borderColor: colors.gray.main,
    borderRadius: 50,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditProfile;
