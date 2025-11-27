import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

/**
 * JobCard Component - Reusable component for displaying job listings
 */
const JobCard = ({
  id,
  title,
  company,
  location,
  description,
  estimatedFair,
  distance,
  onPress,
  isSelected = false,
  imageUri,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={() => onPress && onPress(id)}
      activeOpacity={0.7}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.company} numberOfLines={1}>
            {company}
          </Text>
        </View>
        <View style={styles.priceSection}>
          <Text style={styles.price}>{estimatedFair}</Text>
          {distance && (
            <Text style={styles.distance}>📍 {distance}km</Text>
          )}
        </View>
      </View>

      {/* Image Section */}
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      {/* Description Section */}
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.locationBadge}>
          <Text style={styles.locationText}>📌 {location}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Available</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardSelected: {
    backgroundColor: '#d1ecf1',
    borderColor: '#007bff',
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleSection: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  company: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
  },
  distance: {
    fontSize: 11,
    color: '#007bff',
    marginTop: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationBadge: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f0f8ff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  locationText: {
    fontSize: 11,
    color: '#007bff',
    fontWeight: '600',
  },
  statusBadge: {
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#d4edda',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#28a745',
  },
  statusText: {
    fontSize: 11,
    color: '#155724',
    fontWeight: '600',
  },
});

export default JobCard;
