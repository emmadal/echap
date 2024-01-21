import React, {useCallback, useRef, useState} from 'react';
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
  Image,
  Dimensions,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Formik} from 'formik';
import * as yup from 'yup';
import colors from 'themes/colors';
import {PHOTO_SIZE_MAX} from 'constants/size';
import {requestMediaPermission} from 'utils/permissions';
import {phoneNumber} from 'utils/regex';
import {useStore} from 'store';
import Icon from 'react-native-vector-icons/Feather';
import Dropdown from 'components/dropdown';
import {categoryPost} from 'constants/category';

const CreateProduct = () => {
  const [visible, setVisible] = useState(false);
  const [otherVisible, setOtherVisible] = useState(false);
  const imageURL = useRef('');
  const premium = useStore(state => state.user.premium);

  // choose local media to upload the banner
  const uploadBanner = useCallback(async () => {
    const permission = await requestMediaPermission();
    if (permission === 'granted') {
      // launch photo library on devices to choose a file
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      if (result?.assets?.length) {
        const fileSize = result.assets[0].fileSize ?? 0;
        if (fileSize >= PHOTO_SIZE_MAX) {
          Alert.alert(
            'Fichier volumineux',
            "Passez à l'offre premium pour télécharger les fichiers volumineux",
          );
          return;
        }
        setVisible(!visible);
      }
    }
  }, [visible]);

  const uploadOthersImage = useCallback(
    async (limit: number) => {
      const permission = await requestMediaPermission();
      if (permission === 'granted') {
        // launch photo library on devices to choose a file
        const result = await launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: limit,
        });
        if (result?.assets?.length) {
          const fileSize = result.assets[0].fileSize ?? 0;
          if (fileSize >= PHOTO_SIZE_MAX) {
            Alert.alert(
              'Fichier volumineux',
              "Passez à l'offre premium pour télécharger les fichiers volumineux",
            );
            return;
          }
          setOtherVisible(!otherVisible);
        }
      }
    },
    [otherVisible],
  );

  const othersPicture = useCallback(async () => {
    if (!premium) {
      Alert.alert(
        "Insertion d'images",
        "Vous avez droit à une seule image. Passez à l'option premium pour avoir plus d'avantages",
        [
          {
            text: 'Annuler',
            style: 'destructive',
          },
          {
            text: 'Télecharger',
            onPress: async () => await uploadOthersImage(1),
          },
        ],
        {cancelable: false},
      );
      return;
    }
    await uploadOthersImage(10);
  }, [premium, uploadOthersImage]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboard}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentScroll}>
        <Formik
          initialValues={{
            title: '',
            description: '',
            categoryId: '',
            phone: '',
            price: '',
          }}
          validationSchema={yup.object().shape({
            title: yup
              .string()
              .min(10, 'Minimum 10 caractères')
              .max(30, 'Max 30 caractères')
              .required('Entrez le titre'),
            categoryId: yup.string().required('Choisissez la catégorie'),
            price: yup
              .string()
              .min(2, 'Prix min 500')
              .required('Entrez le prix'),
            description: yup
              .string()
              .min(5, 'Minimum 10 caractères')
              .required('Entrez la description'),
            phone: yup
              .string()
              .matches(phoneNumber, 'Entrez un contact valide')
              .required('Entrez votre contact'),
          })}
          onSubmit={values => {
            console.log(values);
          }}>
          {({
            handleChange,
            handleBlur,
            values,
            handleSubmit,
            setFieldValue,
            touched,
            errors,
          }) => (
            <View>
              <TouchableOpacity
                onPress={uploadBanner}
                style={styles.uploadZone}>
                {imageURL.current?.length > 0 ? (
                  <>
                    <Image
                      source={{uri: imageURL.current}}
                      style={styles.img}
                    />
                    <Text>Resume</Text>
                  </>
                ) : (
                  <>
                    <Icon size={30} name="image" color={colors.text} />
                    <Text>Télécharger l'image principale</Text>
                  </>
                )}
              </TouchableOpacity>
              {visible ? (
                <ActivityIndicator
                  style={styles.progress}
                  animating={true}
                  size="small"
                  color={colors.primary}
                />
              ) : null}

              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Titre"
                  value={values.title}
                  autoCapitalize="none"
                  placeholderTextColor={colors.gray.main}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  style={styles.input}
                  maxLength={30}
                  underlineColorAndroid="transparent"
                  selectionColor={colors.primary}
                />
                {errors.title && touched.title && (
                  <Text style={styles.error}>{errors.title}</Text>
                )}
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Prix"
                  value={values.price}
                  autoCapitalize="none"
                  placeholderTextColor={colors.gray.main}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  style={styles.input}
                  keyboardType="numeric"
                  inputMode="numeric"
                  selectionColor={colors.primary}
                  underlineColorAndroid="transparent"
                />
                {errors.price && touched.price && (
                  <Text style={styles.error}>{errors.price}</Text>
                )}
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  placeholder="Contact"
                  value={values.phone}
                  autoCapitalize="none"
                  placeholderTextColor={colors.gray.main}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  style={styles.input}
                  keyboardType="phone-pad"
                  inputMode="tel"
                  selectionColor={colors.primary}
                  underlineColorAndroid="transparent"
                />
                {errors.phone && touched.phone && (
                  <Text style={styles.error}>{errors.phone}</Text>
                )}
              </View>
              <View style={styles.viewInput}>
                <Dropdown
                  categories={categoryPost}
                  setFieldValue={setFieldValue}
                />
                {errors.categoryId && touched.categoryId && (
                  <Text style={styles.error}>{errors.categoryId}</Text>
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={othersPicture}
                  style={styles.uploadZone}>
                  {imageURL?.current?.length > 0 ? (
                    <>
                      <Image
                        source={{uri: imageURL.current}}
                        style={styles.img}
                      />
                      <Text>Resume</Text>
                    </>
                  ) : (
                    <>
                      <Icon size={30} name="image" color={colors.text} />
                      <Text>Télécharger d'autres images</Text>
                    </>
                  )}
                </TouchableOpacity>
                {visible ? (
                  <ActivityIndicator
                    style={styles.progress}
                    animating={true}
                    size="small"
                    color={colors.primary}
                  />
                ) : null}
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}>
                <Text style={styles.textButton}>Créer l'article</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboard: {flex: 1},
  contentScroll: {
    flexGrow: 1,
    padding: 13,
    marginTop: 10,
  },
  viewInput: {
    marginVertical: 3,
  },
  richeEditor: {
    marginTop: 20,
    // marginBottom: 100,
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
    marginTop: 5,
  },
  input: {
    backgroundColor: colors.gray.light,
    padding: 15,
    width: '100%',
    marginTop: 15,
    color: colors.text,
    borderColor: colors.dark,
    borderWidth: 0.5,
    borderRadius: 2,
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
    width: Dimensions.get('window').width / 2,
    alignSelf: 'center',
    height: 55,
    marginTop: 20,
    marginBottom: 30,
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
});

export default CreateProduct;