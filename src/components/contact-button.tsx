import React, {FC, useCallback} from 'react';
import {StyleSheet, Linking, TouchableOpacity, Alert} from 'react-native';
import colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  phone: string;
};

const ContactButton: FC<Props> = ({phone}: Props) => {
  const DialPhoneNumber = useCallback(async () => {
    const supported = await Linking.canOpenURL(`tel:${phone}`);
    if (supported) {
      await Linking.openURL(`tel:${phone}`);
      return;
    }
    Alert.alert('Appel non autorisé');
  }, [phone]);

  return (
    <TouchableOpacity style={styles.button} onPress={DialPhoneNumber}>
      <Icon name="call-outline" size={30} color={colors.primary} />
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
export default ContactButton;
