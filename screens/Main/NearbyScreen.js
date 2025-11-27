import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { findNearbyWorkers, mockCurrentUser } from '../../services/DataService';
import Header from '../../components/Header';

const NearbyScreen = ({ navigation }) => {
  const [nearbyWorkers, setNearbyWorkers] = useState(findNearbyWorkers(10));
  const [selectedDistance, setSelectedDistance] = useState(10);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const handleRefresh = () => {
    const updated = findNearbyWorkers(selectedDistance);
    setNearbyWorkers(updated);
    Alert.alert('Refreshed', `Found ${updated.length} nearby workers`);
  };

  const handleDistanceChange = (distance) => {
    setSelectedDistance(distance);
    const updated = findNearbyWorkers(distance);
    setNearbyWorkers(updated);
  };

  const handleWorkerPress = (worker) => {
    setSelectedWorker(worker);
    setDetailsModalVisible(true);
  };

  const handleContactWorker = () => {
    if (selectedWorker) {
      navigation.navigate('messages', {
        workerId: selectedWorker.id,
        workerName: selectedWorker.name,
      });
      setDetailsModalVisible(false);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 !== 0 ? '✨' : '');
  };

  const renderWorkerCard = ({ item }) => (
    <TouchableOpacity
      style={styles.workerCard}
      onPress={() => handleWorkerPress(item)}
    >
      <View style={styles.cardContent}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.workerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.workerName}>{item.name}</Text>
            {item.verified && (
              <Text style={styles.verifiedBadge}>✓</Text>
            )}
          </View>
          <Text style={styles.distance}>📍 {item.distance} km away</Text>
          <Text style={styles.skills}>{item.skills[0]}</Text>
        </View>
        <View style={styles.ratingBox}>
          <Text style={styles.rating}>{item.averageRating}</Text>
          <Text style={styles.ratingLabel}>⭐</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Header title="Nearby Workers" />
      <View style={styles.container}>
        {/* Your Location Info */}
        <View style={styles.locationCard}>
          <Text style={styles.locationLabel}>Your Location</Text>
          <Text style={styles.locationName}>{mockCurrentUser.location}</Text>
          <Text style={styles.coordinates}>
            {mockCurrentUser.coordinates.latitude.toFixed(2)}°, {mockCurrentUser.coordinates.longitude.toFixed(2)}°
          </Text>
        </View>

        {/* Distance Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Search Radius: {selectedDistance} km</Text>
          <View style={styles.distanceButtons}>
            {[5, 10, 15, 25].map((distance) => (
              <TouchableOpacity
                key={distance}
                style={[
                  styles.distanceButton,
                  selectedDistance === distance && styles.distanceButtonActive,
                ]}
                onPress={() => handleDistanceChange(distance)}
              >
                <Text
                  style={[
                    styles.distanceButtonText,
                    selectedDistance === distance && styles.distanceButtonTextActive,
                  ]}
                >
                  {distance}km
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Refresh Button */}
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Text style={styles.refreshButtonText}>🔄 Refresh Nearby Workers</Text>
        </TouchableOpacity>

        {/* Workers List */}
        {nearbyWorkers.length > 0 ? (
          <View style={styles.workersSection}>
            <Text style={styles.workersTitle}>
              Found {nearbyWorkers.length} Worker{nearbyWorkers.length !== 1 ? 's' : ''}
            </Text>
            <FlatList
              data={nearbyWorkers}
              keyExtractor={(item) => item.id}
              renderItem={renderWorkerCard}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>😕</Text>
            <Text style={styles.emptyStateTitle}>No workers found</Text>
            <Text style={styles.emptyStateSubtitle}>
              Try increasing the search radius
            </Text>
          </View>
        )}

        {/* Worker Details Modal */}
        <Modal
          visible={detailsModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setDetailsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setDetailsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              {selectedWorker && (
                <ScrollView>
                  <View style={styles.modalHeader}>
                    <Image
                      source={{ uri: selectedWorker.avatar }}
                      style={styles.modalAvatar}
                    />
                    <View style={styles.modalHeaderText}>
                      <Text style={styles.modalName}>{selectedWorker.name}</Text>
                      {selectedWorker.verified && (
                        <Text style={styles.modalVerified}>✓ Verified</Text>
                      )}
                      <Text style={styles.modalRating}>
                        {renderStars(selectedWorker.averageRating)} {selectedWorker.averageRating}/5
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>Distance</Text>
                    <Text style={styles.infoValue}>{selectedWorker.distance} km</Text>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>Skills</Text>
                    <View style={styles.skillsList}>
                      {selectedWorker.skills.map((skill, idx) => (
                        <View key={idx} style={styles.skillBadge}>
                          <Text style={styles.skillBadgeText}>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>Availability</Text>
                    <Text style={styles.infoValue}>{selectedWorker.availability}</Text>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>Rate</Text>
                    <Text style={styles.infoValue}>{selectedWorker.hourlyRate}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.contactButton}
                    onPress={handleContactWorker}
                  >
                    <Text style={styles.contactButtonText}>💬 Send Message</Text>
                  </TouchableOpacity>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
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
  locationCard: {
    backgroundColor: '#B7CA93',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 3,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  coordinates: {
    fontSize: 11,
    color: '#fff',
    opacity: 0.9,
  },
  filterSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  distanceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distanceButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  distanceButtonActive: {
    backgroundColor: '#B7CA93',
    borderColor: '#496B01',
  },
  distanceButtonText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  distanceButtonTextActive: {
    color: '#fff',
  },
  refreshButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  workersSection: {
    flex: 1,
  },
  workersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  workerCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
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
    marginLeft: 6,
    color: '#28a745',
    fontSize: 14,
  },
  distance: {
    fontSize: 11,
    color: '#007bff',
    marginTop: 2,
  },
  skills: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  ratingBox: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingLabel: {
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 50,
    marginBottom: 10,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: '90%',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingBottom: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#333',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  modalHeaderText: {
    flex: 1,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalVerified: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 3,
  },
  modalRating: {
    fontSize: 13,
    color: '#f39c12',
    fontWeight: '600',
    marginTop: 5,
  },
  infoSection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoTitle: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  skillBadgeText: {
    color: '#007bff',
    fontSize: 11,
    fontWeight: '600',
  },
  contactButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NearbyScreen;
