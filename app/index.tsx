import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Team Generator</Text>
      <Link href="/about" style={styles.link}>
        <Text style={styles.linkText}>Go to About</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  link: {
    padding: 15,
    backgroundColor: '#4a4f57',
    borderRadius: 8,
  },
  linkText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
});
