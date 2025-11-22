import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const HomeScreen = () => {
  return (
    <>
    <Header 
        title="Home"
    />
    <View style={styles.container}>
        
    
      <Text style={styles.title}>Welcome to My App</Text>
      <Text style={styles.subtitle}>This is a simple home page screen built with React Native.</Text>
      <Text style={styles.description}>
        Explore features, navigate to other screens, and enjoy your experience!
      </Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HomeScreen;
