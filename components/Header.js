import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ title, onRightPress, rightIcon }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onRightPress} style={styles.button}>
        <Text style={styles.buttonText}>{rightIcon || '⋯'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 120,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,

  },

});

export default Header;