import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './ActionButton.styles';

const ActionButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;