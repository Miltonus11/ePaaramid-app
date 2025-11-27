import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Header = ({ title, onRightPress, rightIcon }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/ePaaramid-logo.png')}
        style={styles.image}
      />
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
    backgroundColor: '#B7CA93',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 120,
  },
  title: {
    marginLeft: 10,
    marginTop:25,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,

  },
  image:{
    marginTop:25,
    maringLeft:40,
  }

});

export default Header;