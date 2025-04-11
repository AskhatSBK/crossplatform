import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

  return (
    <View style={[styles.container, isPortrait ? styles.portrait : styles.landscape]}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  portrait: {
    flexDirection: 'column',
  },
  landscape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
}); 