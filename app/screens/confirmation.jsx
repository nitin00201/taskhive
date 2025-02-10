import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';

const BookingConfirmation = () => {
  const router = useRouter();

  // Sample booking data - replace with your actual data passing method
  const bookingData = {
    id: '2',
    service: 'Plumbing Service',
    date: '2025-02-20',
    time: '10:00',
    provider: 'Quick Fix Plumbers',
    status: 'confirmed',
    price: '$85'
  };

  useEffect(() => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Booking Confirmation\n\nService: ${bookingData.service}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nProvider: ${bookingData.provider}\nPrice: ${bookingData.price}`,
        title: 'Booking Details',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#9C27B0', '#673AB7']}
        style={styles.header}
      >
        <MotiView
          from={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 1000 }}
        >
          <MaterialCommunityIcons
            name="check-circle"
            size={80}
            color="#fff"
          />
        </MotiView>
        <MotiView
          from={{ translateY: 20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ delay: 300 }}
        >
          <Text style={styles.headerText}>Booking Confirmed!</Text>
        </MotiView>
      </LinearGradient>

      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 500 }}
        style={styles.card}
      >
        <View style={styles.bookingIdContainer}>
          <Text style={styles.bookingIdLabel}>Booking ID</Text>
          <Text style={styles.bookingId}>{bookingData.id}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <DetailItem
            icon="tools"
            label="Service"
            value={bookingData.service}
          />
          <DetailItem
            icon="calendar"
            label="Date"
            value={formatDate(bookingData.date)}
          />
          <DetailItem
            icon="clock-outline"
            label="Time"
            value={bookingData.time}
          />
          <DetailItem
            icon="store"
            label="Provider"
            value={bookingData.provider}
          />
          <DetailItem
            icon="currency-usd"
            label="Price"
            value={bookingData.price}
          />
          <DetailItem
            icon="check-decagram"
            label="Status"
            value={bookingData.status}
            valueStyle={{ color: '#4CAF50', textTransform: 'capitalize' }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.shareButton]}
            onPress={handleShare}
          >
            <MaterialCommunityIcons name="share-variant" size={24} color="#FF6B6B" />
            <Text style={[styles.buttonText, { color: '#FF6B6B' }]}>Share Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.homeButton]}
            onPress={() => router.push('/')}
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8E53', '#FFA647']}
              style={styles.gradientButton}
            >
              <MaterialCommunityIcons name="home" size={24} color="#fff" />
              <Text style={styles.buttonText}>Back to Home</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </MotiView>
    </ScrollView>
  );
};

const DetailItem = ({ icon, label, value, valueStyle = {} }) => (
  <MotiView
    from={{ opacity: 0, translateX: -20 }}
    animate={{ opacity: 1, translateX: 0 }}
    transition={{ delay: 700 }}
    style={styles.detailItem}
  >
    <MaterialCommunityIcons name={icon} size={24} color="#FF6B6B" />
    <View style={styles.detailTextContainer}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, valueStyle]}>{value}</Text>
    </View>
  </MotiView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  card: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingIdContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bookingIdLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingId: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    marginBottom: 10,
  },
  homeButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});

export default BookingConfirmation;