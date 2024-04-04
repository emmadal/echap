import React, {useMemo, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import colors from 'themes/colors';
import {PHOTO_SIZE_MAX} from 'constants/size';
import {useStore} from 'store';
import Icon from 'react-native-vector-icons/Feather';
import Dropdown from 'components/Dropdown';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {createArticle, uploadFile} from 'api';
import requestMediaPermission from 'utils/permissions';
import {pickPhoto} from 'utils/pickPhoto';
import useCategory from 'hooks/useCategory';
import {useNavigation} from '@react-navigation/native';
import {z} from 'zod';
import {productSchema} from 'utils/schema';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation, useQueryClient} from '@tanstack/react-query';

type Inputs = z.infer<typeof productSchema>;

const CreateProduct = () => {
  const {data, isPending, isError, error} = useCategory();
  const user = useStore(state => state.user);
  const categoryID = useStore(state => state.category);
  const [visible, setVisible] = useState(false);
  const [visibleOther, setVisibleOther] = useState(false);
  const [banner, setBanner] = useState('');
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  let richText = useRef(null);
  const premium = useStore(state => state.user.premium);

  const {
    reset,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: {errors, isSubmitting, isLoading},
  } = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
  });

  const handleCategories = useMemo(() => {
    const cats = [];
    if (data && data?.data) {
      for (const i of data?.data) {
        cats.push({id: String(i.id), label: i.title, value: String(i.id)});
      }
      return cats;
    }
    return [];
  }, [data]);

  const processForm = async (article: Inputs) => {
    const obj = {
      ...article,
      city_id: user.city_id,
      price: Number(article?.price),
      country_id: user.country_id,
      author_id: user?.id!,
    };
    const req = await createArticle(obj);
    return req;
  };

  // send data to the server
  const {mutate, isPending: pending} = useMutation({
    mutationFn: async values => await processForm(values),
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: ['articles', categoryID],
        refetchType: 'active',
      });
      reset();
      setValue('description', 'Entrez la description ici...');
      Alert.alert(
        "Création d'article",
        response.message,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
        {cancelable: false},
      );
    },
    onError: err => {
      Alert.alert('Erreur', err.message);
      return;
    },
  });

  if (isPending) {
    return <ActivityIndicator color={colors.primary} size="large" />;
  }

  if (isError) {
    return <Text>{error?.message}</Text>;
  }

  // choose local media to upload the banner
  const uploadBanner = async () => {
    const granted = await requestMediaPermission();
    if (granted) {
      // launch photo library on devices to choose a file
      const result = await pickPhoto(1);
      if (result?.assets?.length) {
        const fileSize = result.assets[0].fileSize ?? 0;
        if (fileSize >= PHOTO_SIZE_MAX) {
          Alert.alert(
            'Fichier volumineux',
            'Veuillez choisir une image en dessous de 10MB',
          );
          return;
        }

        // upload photo here
        setVisible(!visible);
        const formData = new FormData();
        formData.append('file', {
          name: result?.assets[0].fileName,
          uri: result?.assets[0].uri,
          type: result?.assets[0].type,
        });
        const res = await uploadFile(formData);
        if (res?.success) {
          setVisible(false);
          setBanner(result?.assets[0].fileName!);
          setValue('banner', res?.data);
        }
        setVisible(false);
      }
      return;
    }
    return;
  };

  // choose local media to upload others files
  const uploadOthersImage = async () => {
    const results = [];
    const granted = await requestMediaPermission();
    const limit = premium ? 7 : 1;
    if (granted) {
      // launch photo library on devices to choose a file
      const result = await pickPhoto(limit);
      if (result.assets?.length) {
        setVisibleOther(!visibleOther);
        for (const file of result.assets) {
          if (file?.fileSize! > PHOTO_SIZE_MAX) {
            Alert.alert(
              'Fichier volumineux',
              'Veuillez choisir une image en dessous de 10MB',
            );
            return;
          }
          const formData = new FormData();
          formData.append('file', {
            name: file?.fileName,
            uri: file?.uri,
            type: file?.type,
          });
          const res = await uploadFile(formData);
          results.push(res?.data);
        }
        setVisibleOther(false);
        setValue('photos', results);
      }
      return;
    }
    return;
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
        <View style={styles.viewInput}>
          <Controller
            control={control}
            rules={{required: true}}
            name="banner"
            render={({field: {onBlur}}) => (
              <TouchableOpacity
                onPress={uploadBanner}
                onBlur={onBlur}
                disabled={visible}
                style={styles.uploadZone}>
                {watch('banner')?.length ?? 0 ? (
                  <Text>{banner}</Text>
                ) : (
                  <>
                    <Icon size={30} name="image" color={colors.text} />
                    <Text>Sélectionnez l'image principale</Text>
                  </>
                )}
                {visible ? (
                  <ActivityIndicator
                    style={styles.progress}
                    animating={true}
                    size="small"
                    color={colors.primary}
                  />
                ) : null}
              </TouchableOpacity>
            )}
          />
          <Text style={styles.error}>{errors?.banner?.message}</Text>
        </View>
        <View style={styles.viewInput}>
          <Controller
            control={control}
            rules={{required: true}}
            name="title"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                placeholder="Titre"
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
          <Text style={styles.error}>{errors?.title?.message}</Text>
        </View>
        <View style={styles.viewInput}>
          <Controller
            control={control}
            rules={{required: true}}
            name="price"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                placeholder="Prix"
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
          <Text style={styles.error}>{errors?.price?.message}</Text>
        </View>
        <View style={styles.viewInput}>
          <Controller
            control={control}
            rules={{required: true}}
            name="phone"
            render={({field: {onBlur, onChange, value}}) => (
              <TextInput
                placeholder="Numéro de téléphone"
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
          <Text style={styles.error}>{errors?.phone?.message}</Text>
        </View>
        <View style={styles.viewInput}>
          <Dropdown
            data={handleCategories}
            setValue={setValue}
            placeholderText="Sélectionnez une catégorie"
            name="category_id"
          />
          <Text style={styles.error}>{errors?.category_id?.message}</Text>
        </View>
        <View style={styles.viewInput}>
          <Controller
            control={control}
            rules={{required: true}}
            name="photos"
            render={({field: {onBlur}}) => (
              <TouchableOpacity
                onPress={uploadOthersImage}
                onBlur={onBlur}
                disabled={visibleOther}
                style={styles.uploadZone}>
                {watch('photos')?.length ?? 0 ? (
                  <Text style={styles.placeholder}>
                    {watch('photos')?.length ?? 0} images téléchargées
                  </Text>
                ) : (
                  <>
                    <Icon size={30} name="image" color={colors.text} />
                    <Text style={styles.placeholder}>
                      Sélectionnez d'autres images
                    </Text>
                  </>
                )}
                {visibleOther ? (
                  <ActivityIndicator
                    style={styles.progress}
                    animating={true}
                    size="small"
                    color={colors.primary}
                  />
                ) : null}
              </TouchableOpacity>
            )}
          />
          <Text style={styles.error}>{errors.photos?.message}</Text>
        </View>
        <View style={styles.viewInput}>
          <RichEditor
            ref={richText}
            androidHardwareAccelerationDisabled={true}
            onChange={htmlText => setValue('description', htmlText)}
            style={styles.richTextEditorStyle}
            initialHeight={150}
            initialContentHTML={'Entrez la description ici...'}
          />
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertLink,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.fontSize,
              actions.table,
              actions.indent,
              actions.alignFull,
            ]}
          />
          <Text style={styles.error}>{errors?.description?.message}</Text>
        </View>
        <TouchableOpacity
          disabled={pending || isLoading || isSubmitting}
          style={styles.button}
          onPress={handleSubmit(mutate)}>
          {isSubmitting || isLoading || pending ? (
            <ActivityIndicator
              animating={isSubmitting || isLoading}
              color={colors.primary}
              size="large"
            />
          ) : (
            <Text style={styles.textButton}>Créer l'article</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 100,
    paddingHorizontal: 5,
  },
  keyboard: {flex: 1},
  contentScroll: {
    flexGrow: 1,
    padding: 13,
    marginTop: 10,
  },
  viewInput: {
    marginVertical: 13,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    color: colors.gray.main,
  },
  richTextEditorStyle: {
    borderWidth: 0.5,
    backgroundColor: colors.gray.light,
    borderColor: colors.gray.main,
    fontSize: 20,
    borderRadius: 2,
  },
  error: {
    color: colors.error,
    marginTop: 2,
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
  progress: {
    marginTop: 10,
  },
  uploadZone: {
    borderRadius: 5,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.text,
    backgroundColor: colors.gray.light,
    marginTop: 15,
    height: 130,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    borderRadius: 50,
    height: 100,
    width: 100,
    borderWidth: 0,
  },
  button: {
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    height: 55,
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
    color: colors.primary,
    fontWeight: '600',
    fontSize: 17,
  },
  placeholder: {
    color: colors.text,
  },
});

export default CreateProduct;
