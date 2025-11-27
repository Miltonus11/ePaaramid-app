import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Header from '../../components/Header';
import {
  getMessages,
  addMessage,
  getChatId,
  mockCurrentUser,
} from '../../services/DataService';

const PersonalMessageScreen = ({ route }) => {
  const { workerId, workerName } = route.params;
  const chatId = getChatId(mockCurrentUser.id, workerId);

  const [messages, setMessages] = useState(getMessages(chatId));
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    const newMessage = addMessage(
      chatId,
      mockCurrentUser.id,
      mockCurrentUser.name,
      inputMessage
    );

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const renderMessageItem = ({ item }) => {
    const isCurrentUser = item.sender === mockCurrentUser.id;

    return (
      <View
        style={[
          styles.messageWrapper,
          isCurrentUser ? styles.userMessageWrapper : styles.workerMessageWrapper,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isCurrentUser ? styles.userMessageBubble : styles.workerMessageBubble,
          ]}
        >
          <Text style={styles.messageSender}>{item.senderName}</Text>
          <Text
            style={[
              styles.messageText,
              isCurrentUser ? styles.userMessageText : styles.workerMessageText,
            ]}
          >
            {item.message}
          </Text>
          <Text
            style={[
              styles.messageTime,
              isCurrentUser ? styles.userMessageTime : styles.workerMessageTime,
            ]}
          >
            {new Date(item.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Header title={workerName} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          inverted={false}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={inputMessage}
            onChangeText={setInputMessage}
            multiline
            numberOfLines={1}
            maxHeight={100}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesList: {
    padding: 15,
    paddingBottom: 10,
  },
  messageWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  workerMessageWrapper: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  userMessageBubble: {
    backgroundColor: '#007bff',
  },
  workerMessageBubble: {
    backgroundColor: '#e9ecef',
  },
  messageSender: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  userMessageText: {
    color: '#fff',
  },
  workerMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  workerMessageTime: {
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default PersonalMessageScreen;