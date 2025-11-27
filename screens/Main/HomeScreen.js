import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Alert, Platform, Image } from 'react-native';
import Header from '../../components/Header';
import { FAB } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'react-native-image-picker';
import {
  mockJobs,
  mockCurrentUser,
  filterJobsByDistance,
  searchJobs,
  addNotification,
} from '../../services/DataService';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('available');
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [estimatedFair, setEstimatedFair] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterDistance, setFilterDistance] = useState(10);

  const [availableJobsData, setAvailableJobsData] = useState(mockJobs);
  const [requestedJobsData, setRequestedJobsData] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState(mockJobs);

  // Update displayed jobs whenever search or filter changes
  useEffect(() => {
    let filtered = availableJobsData;

    // Apply distance filter
    filtered = filterJobsByDistance(filterDistance, filtered);

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchJobs(searchQuery, filtered);
    }

    setDisplayedJobs(filtered);
  }, [searchQuery, filterDistance]);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Search is already applied via useEffect
  };

  const handleJobPress = (job) => {
    setSelectedJob(job);
    setIsDetailsModalVisible(true);
  };

  const handleFabPress = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = () => {
    // Validate and submit form data
    if (!jobTitle || !jobDescription || !address || !contactNumber || !estimatedFair) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    console.log('Job Posted:', { jobTitle, jobDescription, address, contactNumber, dateTime, estimatedFair, imageUri });
    
    // Create new job object
    const newJob = {
      id: Date.now().toString(),
      title: jobTitle,
      company: 'Your Company',
      location: address,
      description: jobDescription,
      contact: contactNumber,
      dateTime: dateTime.toISOString(),
      estimatedFair,
      imageUri,
      coordinates: mockCurrentUser.coordinates,
      status: 'open',
      postedBy: mockCurrentUser.id,
    };
    
    // Add to both available and requested jobs
    setAvailableJobsData(prev => [...prev, newJob]);
    setRequestedJobsData(prev => [...prev, newJob]);
    
    // Add notification
    addNotification('job', 'Job Posted Successfully', `Your job "${jobTitle}" has been posted!`);
    
    // Reset form
    setJobTitle('');
    setJobDescription('');
    setAddress('');
    setContactNumber('');
    setDateTime(new Date());
    setEstimatedFair('');
    setImageUri(null);
    setIsModalVisible(false);
    Alert.alert('Success', 'Job posted successfully!');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // Optionally reset form on cancel
  };

  const handleDetailsModalClose = () => {
    setIsDetailsModalVisible(false);
    setSelectedJob(null);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setShowDatePicker(Platform.OS === 'ios');
    setDateTime(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setImageUri(response.uri);
        }
      },
    );
  };

  const renderJobCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.jobCard,
        selectedJobId === item.id && styles.selectedJobCard,
      ]}
      onPress={() => handleJobPress(item)}
    >
      <View style={styles.jobCardHeader}>
        <View style={styles.jobCardInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.jobCompany}>{item.company}</Text>
          <Text style={styles.jobLocation}>📍 {item.location}</Text>
        </View>
        <View style={styles.jobCardRight}>
          <Text style={styles.jobFair}>{item.estimatedFair}</Text>
          {item.distance && (
            <Text style={styles.jobDistance}>{item.distance} km</Text>
          )}
        </View>
      </View>
      <Text style={styles.jobDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const currentJobs = activeView === 'available' ? displayedJobs : requestedJobsData;

  return (
    <>
      <Header 
        title="Home"
      />
      
      <View style={styles.container}>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Jobs"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Distance Filter */}
        {activeView === 'available' && (
          <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>Distance: {filterDistance} km</Text>
            <View style={styles.filterButtonsRow}>
              {[5, 10, 15, 25].map((distance) => (
                <TouchableOpacity
                  key={distance}
                  style={[
                    styles.filterButton,
                    filterDistance === distance && styles.filterButtonActive,
                  ]}
                  onPress={() => setFilterDistance(distance)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      filterDistance === distance && styles.filterButtonTextActive,
                    ]}
                  >
                    {distance}km
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Available Jobs / Job Request Buttons */}
        <View style={styles.availableJobs}>
          <TouchableOpacity 
            style={[styles.jobButton, activeView === 'available' && styles.activeButton]} 
            onPress={() => setActiveView('available')}
          >
            <Text style={[styles.jobButtonText, activeView === 'available' && styles.activeText]}>Available Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.jobButton, activeView === 'requested' && styles.activeButton]} 
            onPress={() => setActiveView('requested')}
          >
            <Text style={[styles.jobButtonText, activeView === 'requested' && styles.activeText]}>Posted by Me</Text>
          </TouchableOpacity>
        </View>

        {/* Job List */}
        <FlatList
          data={currentJobs}
          keyExtractor={(item) => item.id}
          renderItem={renderJobCard}
          showsVerticalScrollIndicator={false}
          style={styles.jobList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {searchQuery || filterDistance < 25 
                ? 'No jobs found. Try adjusting filters.' 
                : 'No jobs available.'}
            </Text>
          }
        />

        {/* FAB */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={handleFabPress}
        />

        {/* Modal for Job Posting */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Post a Job</Text>
              <Text>Job Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Job Title"
                value={jobTitle}
                onChangeText={setJobTitle}
              />
              <Text>Job Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Job Description"
                value={jobDescription}
                onChangeText={setJobDescription}
                multiline
              />
              <Text>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
              <Text>Contact Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="phone-pad"
              />
              <Text>Date and Time</Text>
              <TouchableOpacity onPress={showDatepicker} style={styles.input}>
                <Text>{dateTime.toLocaleString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateTime}
                  mode="datetime"
                  is24Hour={true}
                  display="default"
                  onChange={onDateChange}
                />
              )}
              <Text>Estimated Fair</Text>
              <TextInput
                style={styles.input}
                placeholder="Estimated Fair"
                value={estimatedFair}
                onChangeText={setEstimatedFair}
                keyboardType="numeric"
              />
              <Text>Attach Image</Text>
              <TouchableOpacity onPress={pickImage} style={styles.input}>
                <Text>{imageUri ? 'Image Selected' : 'Select Image'}</Text>
              </TouchableOpacity>
              {imageUri && <Text style={styles.imageUriText}>{imageUri}</Text>}

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal for Job Details */}
        <Modal
          visible={isDetailsModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleDetailsModalClose}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Job Details</Text>
              {selectedJob && (
                <>
                  <Text style={styles.detailLabel}>Title:</Text>
                  <Text style={styles.detailText}>{selectedJob.title}</Text>
                  <Text style={styles.detailLabel}>Company:</Text>
                  <Text style={styles.detailText}>{selectedJob.company}</Text>
                  <Text style={styles.detailLabel}>Location:</Text>
                  <Text style={styles.detailText}>{selectedJob.location}</Text>
                  {selectedJob.description && (
                    <>
                      <Text style={styles.detailLabel}>Description:</Text>
                      <Text style={styles.detailText}>{selectedJob.description}</Text>
                    </>
                  )}
                  {selectedJob.contact && (
                    <>
                      <Text style={styles.detailLabel}>Contact:</Text>
                      <Text style={styles.detailText}>{selectedJob.contact}</Text>
                    </>
                  )}
                  {selectedJob.dateTime && (
                    <>
                      <Text style={styles.detailLabel}>Date and Time:</Text>
                      <Text style={styles.detailText}>{new Date(selectedJob.dateTime).toLocaleString()}</Text>
                    </>
                  )}
                  {selectedJob.estimatedFair && (
                    <>
                      <Text style={styles.detailLabel}>Estimated Fair:</Text>
                      <Text style={styles.detailText}>{selectedJob.estimatedFair}</Text>
                    </>
                  )}
                  {selectedJob.imageUri && (
                    <>
                      <Text style={styles.detailLabel}>Image:</Text>
                      <Image source={{ uri: selectedJob.imageUri }} style={styles.detailImage} />
                    </>
                  )}
                </>
              )}
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleDetailsModalClose} style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Close</Text>
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
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 15,
    bottom: 10,
    borderRadius: 50,
    backgroundColor: '#B7CA93',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15, 
    paddingVertical: 5,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  searchButton: {
    marginLeft: 10,
    padding: 5,
  },
  searchButtonText: {
    fontSize: 18,
  },
  filterContainer: {
    width: '100%',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
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
  filterButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#B7CA93',
    borderColor: '#496B01',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  availableJobs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  jobButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeButton: {
    backgroundColor: '#E8F0D4',
  },
  activeText: {
    color: '#496B01',
    fontWeight: 'bold',
  },
  jobButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  jobList: {
    width: '100%',
    flex: 1,
  },
  jobCard: {
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
  selectedJobCard: {
    backgroundColor: '#d1ecf1',
    borderColor: '#007bff',
    borderWidth: 2,
  },
  jobCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  jobCardInfo: {
    flex: 1,
  },
  jobCardRight: {
    alignItems: 'flex-end',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  jobCompany: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
  jobLocation: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  jobDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  jobFair: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
  },
  jobDistance: {
    fontSize: 11,
    color: '#007bff',
    marginTop: 3,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    maxHeight: '95%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: 'center',
  },
  imageUriText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  detailImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;
