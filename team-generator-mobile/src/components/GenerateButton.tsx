import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useStore } from '../store/useStore';

export const GenerateButton = () => {
  const { items, groups, setTeams } = useStore();

  const generateTeams = () => {
    if (items.length === 0) return;

    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const teams: string[][] = Array.from({ length: groups }, () => []);
    
    shuffled.forEach((item, index) => {
      const teamIndex = index % groups;
      teams[teamIndex].push(item);
    });

    setTeams(teams);
  };

  return (
    <TouchableOpacity
      style={[styles.button, items.length === 0 && styles.buttonDisabled]}
      onPress={generateTeams}
      disabled={items.length === 0}
    >
      <Text style={[styles.buttonText, items.length === 0 && styles.buttonTextDisabled]}>
        Generate Teams
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#e0e0e0',
    shadowOpacity: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#999',
  },
}); 