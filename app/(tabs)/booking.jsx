// app/bookings.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Pressable,
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data for demonstration
const BOOKINGS_DATA = {
  upcoming: [
    {
      id: '1',
      service: 'House Cleaning',
      date: '2025-02-15',
      time: '14:00',
      provider: 'CleanPro Services',
      status: 'pending',
      price: '$120'
    },
    {
      id: '2',
      service: 'Plumbing Service',
      date: '2025-02-20',
      time: '10:00',
      provider: 'Quick Fix Plumbers',
      status: 'confirmed',
      price: '$85'
    }
  ],
  past: [
    {
      id: '3',
      service: 'Lawn Mowing',
      date: '2025-01-25',
      time: '09:00',
      provider: 'Green Thumb Gardens',
      status: 'completed',
      price: '$45'
    }
  ]
};

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFA726',
      confirmed: '#66BB6A',
      completed: '#78909C',
      'in-progress': '#42A5F5'
    };
    return colors[status] || '#757575';
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.serviceName}>{booking.service}</Text>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: getStatusColor(booking.status) }
        ]}>
          <Text style={styles.statusText}>{booking.status}</Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{booking.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{booking.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{booking.provider}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="pricetag-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{booking.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const router = useRouter();

  const renderBooking = ({ item }) => (
    <BookingCard booking={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      <View style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tab,
            activeTab === 'upcoming' && styles.activeTab
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'upcoming' && styles.activeTabText
          ]}>Upcoming</Text>
        </Pressable>
        <Pressable
          style={[
            styles.tab,
            activeTab === 'past' && styles.activeTab
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'past' && styles.activeTabText
          ]}>Past</Text>
        </Pressable>
      </View>

      <FlatList
        data={BOOKINGS_DATA[activeTab]}
        renderItem={renderBooking}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={styles.newBookingButton}
        onPress={() => router.push('/screens/new-booking')}
      >
        <Text style={styles.buttonText}>Schedule New Service</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#e3f2fd',
  },
  tabText: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1976d2',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  cardDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  newBookingButton: {
    backgroundColor: '#1976d2',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});