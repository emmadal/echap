import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteArticle} from 'api';
import {useNavigation} from '@react-navigation/native';

type Props = {
  articleId: number;
};

const DeleteArticleButton: FC<Props> = ({articleId}: Props) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: async () => await deleteArticle(articleId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({queryKey: ['my_articles']}),
        queryClient.invalidateQueries({queryKey: ['articles']}),
      ]);
      navigation.goBack();
    },
    onError: error => {
      Alert.alert('Suppression', error.message);
    },
  });

  const handleDelete = () => {
    Alert.alert(
      'Suppression',
      'Cette action est irreversible. Voulez vous continuez ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => mutate(),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleDelete}>
      <Icon name="trash-bin-outline" size={30} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: colors.error,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: 83,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
export default DeleteArticleButton;
