import React, {FC, useCallback} from 'react';
import {StyleSheet, Linking, TouchableOpacity, Alert} from 'react-native';
import colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  icon: string;
  phone: string;
  title: string;
  image: string;
  premium: boolean;
};

const text =
  "Salut! J'ai vu votre produit sur l'application Oblack, j'aimerais avoir plus de détails";

const WhatsappButton: FC<Props> = ({
  icon,
  phone,
  image,
  title,
  premium,
}: Props) => {
  const link = `whatsapp://send?phone:${phone}&text=${image} ${title} ${text}`;

  const openWhatsapp = useCallback(async () => {
    if (!premium) {
      Alert.alert(
        'Messagerie',
        "Souscrivez à l'affre premium pour beneficier de cette fonctionnalité",
      );
      return;
    } else {
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        await Linking.openURL(link);
      }
      Alert.alert("Impossible d'ouvrir whatsapp");
    }
  }, [link, premium]);

  return (
    <TouchableOpacity style={styles.button} onPress={openWhatsapp}>
      <Icon name={icon} size={30} color={colors.primary} />
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
export default WhatsappButton;
