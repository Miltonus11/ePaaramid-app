import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';

// Mock data for messages
const messagesData = [
  { id: '1', sender: 'Alice', message: 'Hey, how are you?', timestamp: '10:30 AM' },
  { id: '2', sender: 'Bob', message: 'Let\'s meet up later!', timestamp: '9:45 AM' },
  { id: '3', sender: 'Charlie', message: 'Did you see the news?', timestamp: '8:20 AM' },
  { id: '4', sender: 'Diana', message: 'Thanks for the help!', timestamp: '7:15 AM' },
  { id: '5', sender: 'Diana', message: 'Thanks for the help!', timestamp: '7:15 AM' },
  { id: '6', sender: 'Diana', message: 'Thanks for the help!', timestamp: '7:15 AM' },
  { id: '7', sender: 'Diana', message: 'Thanks for the help!', timestamp: '7:15 AM' },
  { id: '8', sender: 'Diana', message: 'Thanks for the help!', timestamp: '7:15 AM' },
  { id: '9', sender: 'Diana', message: 'Thanks for the help!', timestamp: '7:15 AM' },
];

const MessagesScreen = ({navigation}) => {
  const renderMessage = ({ item }) => (
    <TouchableOpacity style={styles.messageContainer} onPress={()=>navigation.navigate('messages')}>
      <View style={styles.messageHeader}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <Text style={styles.messageText}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <>
    <Header 
        title="Messages"
    />
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={messagesData}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        showsVerticalScrollIndicator={false}
      />
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  messageText: {
    fontSize: 14,
    color: '#666',
  },
});

export default MessagesScreen;
