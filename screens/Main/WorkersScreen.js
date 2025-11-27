import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { getAllWorkersWithRatings, addReview, getWorkerDetails } from '../../services/DataService';
import Header from '../../components/Header';

const WorkersScreen = ({ navigation }) => {
  const [workers, setWorkers] = useState(getAllWorkersWithRatings());
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleWorkerPress = (worker) => {
    const details = getWorkerDetails(worker.id);
    setSelectedWorker(details);
    setDetailsModalVisible(true);
  };

  const handleAddReview = () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }

    addReview(selectedWorker.id, rating, comment, 'You');
    
    // Update workers list
    setWorkers(getAllWorkersWithRatings());
    
    // Update selected worker
    const updatedWorker = getWorkerDetails(selectedWorker.id);
    setSelectedWorker(updatedWorker);

    setRating(5);
    setComment('');
    setReviewModalVisible(false);
    Alert.alert('Success', 'Review added successfully!');
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
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.cardInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.workerName}>{item.name}</Text>
            {item.verified && (
              <Text style={styles.verifiedBadge}>✓ Verified</Text>
            )}
          </View>
          <Text style={styles.rating}>
            {renderStars(item.averageRating)} {item.averageRating}/5
          </Text>
          <Text style={styles.reviewCount}>({item.reviewCount} reviews)</Text>
        </View>
      </View>

      <Text style={styles.skills}>
        {item.skills.slice(0, 2).join(' • ')}
      </Text>

      <View style={styles.cardFooter}>
        <Text style={styles.distance}>📍 {item.distance} km</Text>
        <Text style={styles.hourlyRate}>{item.hourlyRate}/hr</Text>
      </View>
    </TouchableOpacity>
  );

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewAuthor}>{item.author}</Text>
        <Text style={styles.reviewRating}>{'⭐'.repeat(item.rating)}</Text>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <>
      <Header title="Workers & Professionals" />
      <View style={styles.container}>
        <FlatList
          data={workers}
          keyExtractor={(item) => item.id}
          renderItem={renderWorkerCard}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />

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
                  <View style={styles.workerDetailsHeader}>
                    <Image
                      source={{ uri: selectedWorker.avatar }}
                      style={styles.largeAvatar}
                    />
                    <View style={styles.detailsHeaderText}>
                      <Text style={styles.detailsName}>{selectedWorker.name}</Text>
                      {selectedWorker.verified && (
                        <Text style={styles.verifiedBadgeLarge}>✓ Verified Professional</Text>
                      )}
                      <Text style={styles.detailsRating}>
                        {renderStars(selectedWorker.averageRating)} {selectedWorker.averageRating}/5
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Bio</Text>
                    <Text style={styles.detailsText}>{selectedWorker.bio}</Text>
                  </View>

                  <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsContainer}>
                      {selectedWorker.skills.map((skill, index) => (
                        <View key={index} style={styles.skillTag}>
                          <Text style={styles.skillText}>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.detailsSection}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Hourly Rate:</Text>
                      <Text style={styles.infoValue}>{selectedWorker.hourlyRate}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Availability:</Text>
                      <Text style={styles.infoValue}>{selectedWorker.availability}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Location:</Text>
                      <Text style={styles.infoValue}>{selectedWorker.location}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Distance:</Text>
                      <Text style={styles.infoValue}>{selectedWorker.distance} km</Text>
                    </View>
                  </View>

                  <View style={styles.detailsSection}>
                    <View style={styles.reviewsHeader}>
                      <Text style={styles.sectionTitle}>Reviews</Text>
                      <TouchableOpacity
                        style={styles.addReviewButton}
                        onPress={() => setReviewModalVisible(true)}
                      >
                        <Text style={styles.addReviewButtonText}>+ Add Review</Text>
                      </TouchableOpacity>
                    </View>

                    {selectedWorker.reviews.length > 0 ? (
                      <FlatList
                        data={selectedWorker.reviews}
                        keyExtractor={(item) => item.id}
                        renderItem={renderReviewItem}
                        scrollEnabled={false}
                      />
                    ) : (
                      <Text style={styles.noReviews}>No reviews yet</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.contactButton}
                    onPress={handleContactWorker}
                  >
                    <Text style={styles.contactButtonText}>💬 Contact Worker</Text>
                  </TouchableOpacity>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>

        {/* Add Review Modal */}
        <Modal
          visible={reviewModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setReviewModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.reviewModalContent}>
              <Text style={styles.reviewModalTitle}>Add a Review</Text>

              <Text style={styles.reviewModalLabel}>Rating</Text>
              <View style={styles.ratingSelector}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.ratingButton,
                      rating === value && styles.ratingButtonActive,
                    ]}
                    onPress={() => setRating(value)}
                  >
                    <Text style={styles.ratingButtonText}>{'⭐'.repeat(value)}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.reviewModalLabel}>Comment</Text>
              <TextInput
                style={styles.reviewInput}
                placeholder="Share your experience..."
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
              />

              <View style={styles.reviewModalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setReviewModalVisible(false);
                    setRating(5);
                    setComment('');
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleAddReview}
                >
                  <Text style={styles.buttonText}>Submit Review</Text>
                </TouchableOpacity>
              </View>
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
  workerCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  verifiedBadge: {
    marginLeft: 8,
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: 12,
  },
  rating: {
    fontSize: 13,
    color: '#f39c12',
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 12,
    color: '#999',
  },
  skills: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distance: {
    fontSize: 12,
    color: '#007bff',
  },
  hourlyRate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
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
    maxHeight: '95%',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#333',
  },
  workerDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  detailsHeaderText: {
    flex: 1,
  },
  detailsName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  verifiedBadgeLarge: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 3,
  },
  detailsRating: {
    fontSize: 14,
    color: '#f39c12',
    fontWeight: '600',
    marginTop: 5,
  },
  detailsSection: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#e3f2fd',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  skillText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addReviewButton: {
    backgroundColor: '#B7CA93',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  addReviewButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#f39c12',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  reviewAuthor: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewRating: {
    fontSize: 12,
  },
  reviewComment: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  noReviews: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
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
  reviewModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    maxHeight: '60%',
    marginTop: 'auto',
  },
  reviewModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  reviewModalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  ratingSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  ratingButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  ratingButtonActive: {
    backgroundColor: '#fff3cd',
    borderColor: '#f39c12',
  },
  ratingButtonText: {
    fontSize: 14,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 13,
    color: '#333',
    textAlignVertical: 'top',
  },
  reviewModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default WorkersScreen;
