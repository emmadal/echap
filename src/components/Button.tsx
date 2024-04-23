import React from 'react';
import colors from 'themes/colors';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  /**
   * The label that will be rendered inside the component
   */
  title: string;
  /**
   * show a spinner beside the title. (optional)
   */
  loading?: boolean;
  /**
   * Styles
   */
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<Props> = ({
  title,
  loading,
  style,
  onPress,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      {...props}>
      <Text style={styles.textButton}>
        {title}{' '}
        {loading ? (
          <ActivityIndicator
            color={colors.white}
            size="small"
            style={styles.spinner}
          />
        ) : null}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textButton: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 17,
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
    marginTop: 25,
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  spinner: {
    marginTop: -5,
  },
});

export default Button;
