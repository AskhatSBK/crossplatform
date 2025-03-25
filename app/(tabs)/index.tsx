import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Index = () => {
  const [text, setText] = useState('Hello World!');
  const [bgColor, setBgColor] = useState('#282c34');

  const addText = () => setText(prev => prev + ' Hello! ');
  const removeText = () => setText('');
  const changeBgColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBgColor(randomColor);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>{text}</Text>
      <Button title="Add Text" onPress={addText} />
      <Button title="Remove Text" onPress={removeText} />
      <Button title="Change Background" onPress={changeBgColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Index;
