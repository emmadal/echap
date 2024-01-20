import React, {FC} from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

type Props = {
  title: string;
  image: string;
  premium: boolean;
};

const ChatButton: FC<Props> = ({title, image, premium}: Props) => {
  const navigation: any = useNavigation();

  const redirectToChat = () => {
    navigation.navigate('Chat', {
      title,
      image,
    });
  };

  const handleRedirect = () => {
    if (!premium) {
      Alert.alert(
        'Messagerie',
        "Souscrivez à l'affre premium pour beneficier de cette fonctionnalité",
      );
      return;
    }
    Alert.alert(
      'Messagerie',
      "Voulez vous dicustez avec l'auteur de cette publication ?",
      [
        {
          text: 'Annuler',
          style: 'destructive',
        },
        {
          text: 'Oui',
          onPress: () => redirectToChat(),
          style: 'default',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleRedirect}>
      <Icon name="chatbubbles-outline" size={30} color={colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: colors.white,
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
export default ChatButton;
