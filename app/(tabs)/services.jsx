// ServiceScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data
const CATEGORIES = [
  { id: '1', name: 'Plumbers', icon: 'water' },
  { id: '2', name: 'Electricians', icon: 'flash' },
  { id: '3', name: 'Tutors', icon: 'book' },
  { id: '4', name: 'Cleaners', icon: 'brush' },
  { id: '5', name: 'Gardeners', icon: 'leaf' },
];

const PROVIDERS = [
  {
    id: '1',
    name: 'John Smith',
    category: 'Plumbers',
    rating: 4.8,
    reviews: 127,
    price: '$50/hr',
    experience: '8 years',
    available: true,
    distance: '2.5 km',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    category: 'Electricians',
    rating: 4.9,
    reviews: 95,
    price: '$65/hr',
    experience: '10 years',
    available: true,
    distance: '3.2 km',
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  // Add more providers as needed
];

// Category Button Component
const CategoryButton = ({ category, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.categoryButton, isSelected && styles.selectedCategoryButton]}
    onPress={onPress}
  >
    <Ionicons
      name={category.icon}
      size={24}
      color={isSelected ? '#FFFFFF' : '#757575'}
    />
    <Text style={[
      styles.categoryText,
      isSelected && styles.selectedCategoryText
    ]}>
      {category.name}
    </Text>
  </TouchableOpacity>
);

// Filter Button Component
const FilterButton = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.filterButton, isActive && styles.activeFilterButton]}
    onPress={onPress}
  >
    <Text style={[
      styles.filterText,
      isActive && styles.activeFilterText
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Provider Card Component
const ProviderCard = ({ provider, onPress }) => (
  <TouchableOpacity style={styles.providerCard} onPress={onPress}>
    <Image
      source={{ uri: provider.image }}
      style={styles.providerImage}
    />
    <View style={styles.providerInfo}>
      <Text style={styles.providerName}>{provider.name}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFC107" />
        <Text style={styles.ratingText}>{provider.rating}</Text>
        <Text style={styles.reviewCount}>({provider.reviews} reviews)</Text>
      </View>
      <Text style={styles.price}>{provider.price}</Text>
      <View style={styles.providerMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={14} color="#757575" />
          <Text style={styles.metaText}>{provider.distance}</Text>
        </View>
        {provider.available && (
          <View style={styles.availableBadge}>
            <Text style={styles.availableText}>Available Now</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

// Main Screen Component
export default function ServiceScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState('recommended');
  const [filteredProviders, setFilteredProviders] = useState(PROVIDERS);

  useEffect(() => {
    filterProviders();
  }, [searchQuery, selectedCategory, activeFilter]);

  const filterProviders = () => {
    let filtered = [...PROVIDERS];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(provider =>
        provider.category === selectedCategory.name
      );
    }

    // Apply sorting
    switch (activeFilter) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'distance':
        filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      // Default is recommended, no sorting needed
    }

    setFilteredProviders(filtered);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#757575" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services or providers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#757575"
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map(category => (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={selectedCategory?.id === category.id}
              onPress={() => setSelectedCategory(
                selectedCategory?.id === category.id ? null : category
              )}
            />
          ))}
        </ScrollView>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          <FilterButton
            label="Recommended"
            isActive={activeFilter === 'recommended'}
            onPress={() => setActiveFilter('recommended')}
          />
          <FilterButton
            label="Top Rated"
            isActive={activeFilter === 'rating'}
            onPress={() => setActiveFilter('rating')}
          />
          <FilterButton
            label="Price: Low to High"
            isActive={activeFilter === 'price'}
            onPress={() => setActiveFilter('price')}
          />
          <FilterButton
            label="Nearest"
            isActive={activeFilter === 'distance'}
            onPress={() => setActiveFilter('distance')}
          />
        </ScrollView>

        {/* Providers List */}
        <FlatList
          data={filteredProviders}
          renderItem={({ item }) => (
            <ProviderCard
              provider={item}
              onPress={() => router.push(`/provider/${item.id}`)}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.providersListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000000',
  },
  categoriesContainer: {
    maxHeight: 100,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginRight: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: 100,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedCategoryButton: {
    backgroundColor: '#2196F3',
  },
  categoryText: {
    marginTop: 8,
    fontSize: 12,
    color: '#757575',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  filtersContainer: {
    maxHeight: 50,
    marginVertical: 16,
  },
  filtersContent: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  activeFilterButton: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    color: '#757575',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#ffffff',
  },
  providersListContent: {
    padding: 16,
  },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  providerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '500',
    color: '#000000',
  },
  reviewCount: {
    marginLeft: 4,
    color: '#757575',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2196F3',
    marginBottom: 4,
  },
  providerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
    color: '#757575',
  },
  availableBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  availableText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '500',
  },
});