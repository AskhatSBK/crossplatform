import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useStore } from '../store/useStore';

export const ClearAllButton = () => {
  const { clearAll } = useStore();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={clearAll}
    >
      <Text style={styles.buttonText}>Clear All</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 