import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Pressable } from 'react-native';
import styles from './ReasonModal.styles';

const ReasonModal = ({ visible, onSubmit, onCancel }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    onSubmit(reason);
    setReason(''); // Clear the input for next time
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Reason for Leaving?</Text>
          <TextInput
            style={styles.input}
            onChangeText={setReason}
            value={reason}
            placeholder="Optional for a full day"
            placeholderTextColor="#999"
          />
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Punch Out</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ReasonModal;