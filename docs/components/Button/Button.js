import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'violet',
  },
  text: { color: 'black' },
});

// eslint-disable-next-line react/prop-types
function MyButton({ onPress, text }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

export default MyButton;
