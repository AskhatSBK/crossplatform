import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NetworkStatusContext } from '../context/NetworkStatusContext';

export const OfflineBanner = () => {
  const { isOnline } = useContext(NetworkStatusContext);

  if (isOnline) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.banner}>
        <Text style={styles.text}>You are offline</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  banner: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
