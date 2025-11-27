import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { getAllWorkersWithRatings } from '../../services/DataService';

const MessagesScreen = ({ navigation }) => {
  const [workersList] = useState(getAllWorkersWithRatings());

  const handleWorkerPress = (worker) => {
    navigation.navigate('messages', {
      workerId: worker.id,
      workerName: worker.name,
    });
  };

  const renderWorkerCard = ({ item }) => (
    <TouchableOpacity
      style={styles.workerCard}
      onPress={() => handleWorkerPress(item)}
    >
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.workerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.workerName}>{item.name}</Text>
            {item.verified && (
              <Text style={styles.verifiedBadge}>✓ Verified</Text>
            )}
          </View>
          <Text style={styles.skills}>{item.skills[0]}</Text>
          <Text style={styles.rate}>{item.hourlyRate}/hr</Text>
        </View>
        <View style={styles.ratingBox}>
          <Text style={styles.rating}>{item.averageRating}⭐</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Header title="Messages" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Direct Messages</Text>
          <Text style={styles.headerSubtitle}>Connect with professionals</Text>
        </View>
        <FlatList
          data={workersList}
          keyExtractor={(item) => item.id}
          renderItem={renderWorkerCard}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  workerCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#B7CA93',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  workerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  verifiedBadge: {
    marginLeft: 8,
    color: '#28a745',
    fontWeight: '600',
    fontSize: 11,
  },
  skills: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  rate: {
    fontSize: 11,
    color: '#28a745',
    fontWeight: '600',
    marginTop: 2,
  },
  ratingBox: {
    paddingHorizontal: 8,
  },
  rating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f39c12',
  },
});

export default MessagesScreen;
