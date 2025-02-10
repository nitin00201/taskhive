import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import GreetingHeader from '../components/header'

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Sample data - In a real app, this would come from an API
  const categories = [
    { id: 1, name: 'Plumbing', icon: 'water' },
    { id: 2, name: 'Electrical', icon: 'flash' },
    { id: 3, name: 'Tutoring', icon: 'book' },
    { id: 4, name: 'Cleaning', icon: 'brush' },
    { id: 5, name: 'Gardening', icon: 'leaf' },
    { id: 6, name: 'Home Repair', icon: 'hammer' },
    { id: 7, name: 'Moving', icon: 'car' },
    { id: 8, name: 'More', icon: 'grid' },
  ];

  const featuredServices = [
    {
      id: 1,
      title: 'Professional Plumbing',
      provider: 'John Smith',
      rating: 4.8,
      reviews: 156,
      price: '$50/hr',
    },
    {
      id: 2,
      title: 'Expert Electrician',
      provider: 'Sarah Johnson',
      rating: 4.9,
      reviews: 203,
      price: '$65/hr',
    },
    {
      id: 3,
      title: 'Math Tutoring',
      provider: 'David Wilson',
      rating: 4.7,
      reviews: 89,
      price: '$40/hr',
    },
  ];

  const recommendations = [
    {
      id: 1,
      title: 'House Cleaning',
      provider: 'Clean Pro Services',
      rating: 4.6,
      distance: '2.5 km',
    },
    {
      id: 2,
      title: 'Garden Maintenance',
      provider: 'Green Thumb Co.',
      rating: 4.5,
      distance: '3.8 km',
    },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const ServiceCard = ({ service, featured }) => (
    <TouchableOpacity
      style={[styles.serviceCard, featured && styles.featuredCard]}
      onPress={() => router.push(`/service/${service.id}`)}
    >
      <View style={styles.serviceImageContainer}>
        <Image
          source={{ uri: '/api/placeholder/300/200' }}
          style={styles.serviceImage}
        />
        {featured && (
          <LinearGradient
            colors={['#9C27B0', '#673AB7']}
            style={styles.featuredBadge}
          >
            <Text style={styles.featuredText}>Featured</Text>
          </LinearGradient>
        )}
      </View>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{service.title}</Text>
        <Text style={styles.providerName}>{service.provider}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{service.rating}</Text>
          {featured && (
            <Text style={styles.reviewCount}>({service.reviews} reviews)</Text>
          )}
        </View>
        {featured ? (
          <Text style={styles.price}>{service.price}</Text>
        ) : (
          <Text style={styles.distance}>{service.distance}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const CategoryButton = ({ category }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => router.push(`/category/${category.id}`)}
    >
      <View style={styles.categoryIcon}>
        <Ionicons name={category.icon} size={24} color="#4158D0" />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );

  return (
    <>
    <SafeAreaView style={styles.container}>
    <GreetingHeader/>
      <View style={styles.header}>
        <View style={styles.locationBar}>
          <Ionicons name="location" size={20} color="#4158D0" />
          <Text style={styles.location}>Current Location</Text>
          <TouchableOpacity onPress={() => router.push('/locations')}>
            <Text style={styles.changeLocation}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => router.push(`/search?q=${searchQuery}`)}
          />
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map(category => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContainer}
          >
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} featured={true} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          {recommendations.map(service => (
            <ServiceCard key={service.id} service={service} featured={false} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  location: {
    flex: 1,
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  changeLocation: {
    color: '#4158D0',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  categoriesSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: (width - 60) / 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  featuredSection: {
    padding: 15,
  },
  featuredContainer: {
    paddingRight: 15,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredCard: {
    width: width * 0.7,
    marginRight: 15,
  },
  serviceImageContainer: {
    position: 'relative',
  },
  serviceImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  serviceInfo: {
    padding: 15,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  providerName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  reviewCount: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4158D0',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  recommendationsSection: {
    padding: 15,
  },
});

export default HomeScreen;