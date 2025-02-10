import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Sample data
const SAMPLE_BOOKINGS = [
  {
    id: '1',
    service: 'Plumbing Service',
    date: '2025-02-20',
    time: '10:00',
    provider: 'Quick Fix Plumbers',
    status: 'pending',
    price: '$85',
    description: 'Leaky faucet repair',
  },
  {
    id: '2',
    service: 'Electrical Service',
    date: '2025-02-18',
    time: '14:30',
    provider: 'Power Pros',
    status: 'confirmed',
    price: '$120',
    description: 'Circuit breaker installation',
  },
  {
    id: '3',
    service: 'HVAC Service',
    date: '2025-02-15',
    time: '09:00',
    provider: 'Cool Air Systems',
    status: 'completed',
    price: '$200',
    description: 'AC maintenance',
  },
  {
    id: '4',
    service: 'Cleaning Service',
    date: '2025-02-10',
    time: '11:00',
    provider: 'Clean Masters',
    status: 'cancelled',
    price: '$75',
    description: 'Deep house cleaning',
  },
];

const ServiceHistory = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F9A825';
      case 'confirmed': return '#7CB342';
      case 'completed': return '#43A047';
      case 'cancelled': return '#E53935';
      default: return '#757575';
    }
  };

  const StatusBadge = ({ status }) => (
    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) + '20' }]}>
      <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );

  const ServiceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedService(selectedService?.id === item.id ? null : item)}
    >
      <LinearGradient
        colors={['#9C27B0', '#673AB7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.cardHeader}
      >
        <View style={styles.cardHeaderContent}>
          <MaterialCommunityIcons name="tools" size={24} color="#fff" />
          <Text style={styles.serviceTitle}>{item.service}</Text>
        </View>
        <StatusBadge status={item.status} />
      </LinearGradient>

      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={20} color="#673AB7" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="clock-outline" size={20} color="#673AB7" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="store" size={20} color="#673AB7" />
          <Text style={styles.detailText}>{item.provider}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="currency-usd" size={20} color="#673AB7" />
          <Text style={styles.detailText}>{item.price}</Text>
        </View>

        {selectedService?.id === item.id && (
          <View style={styles.expandedContent}>
            <Text style={styles.descriptionTitle}>Description:</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => router.push(`/booking/${item.id}`)}
            >
              <LinearGradient
                colors={['#9C27B0', '#673AB7']}
                style={styles.detailsButtonGradient}
              >
                <Text style={styles.detailsButtonText}>View Full Details</Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#9C27B0', '#673AB7']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Service History</Text>
      </LinearGradient>

      <FlatList
        data={SAMPLE_BOOKINGS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ServiceCard item={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    padding: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  descriptionText: {
    color: '#666',
    lineHeight: 20,
  },
  detailsButton: {
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  detailsButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
});

export default ServiceHistory;