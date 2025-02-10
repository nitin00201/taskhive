import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  StyleSheet,
  Dimensions,
  Platform,
  Modal,
  FlatList,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MotiView, MotiText } from 'moti';

const { width } = Dimensions.get('window');

// Sample data for dropdowns
const SERVICES = [
  { id: '1', name: 'Plumbing Service', basePrice: '85' },
  { id: '2', name: 'Electrical Service', basePrice: '95' },
  { id: '3', name: 'HVAC Service', basePrice: '120' },
  { id: '4', name: 'Cleaning Service', basePrice: '75' },
  { id: '5', name: 'Pest Control', basePrice: '65' },
];

const SERVICE_PROVIDERS = {
  'Plumbing Service': [
    { id: '1', name: 'Quick Fix Plumbers' },
    { id: '2', name: 'Pro Plumbing Co.' },
    { id: '3', name: 'Expert Plumbers' },
  ],
  'Electrical Service': [
    { id: '1', name: 'Power Electric' },
    { id: '2', name: 'Volt Masters' },
    { id: '3', name: 'Electric Experts' },
  ],
  'HVAC Service': [
    { id: '1', name: 'Cool Air Systems' },
    { id: '2', name: 'Climate Control Pro' },
    { id: '3', name: 'HVAC Masters' },
  ],
  'Cleaning Service': [
    { id: '1', name: 'Sparkle Clean' },
    { id: '2', name: 'Clean Masters' },
    { id: '3', name: 'Pro Cleaners' },
  ],
  'Pest Control': [
    { id: '1', name: 'Pest Away' },
    { id: '2', name: 'Bug Busters' },
    { id: '3', name: 'Pest Control Pro' },
  ],
};

const BookingPage = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState({
    service: '',
    date: new Date(),
    time: '10:00',
    provider: '',
    price: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);
  
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBookingData(prev => ({ ...prev, date: selectedDate }));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setBookingData(prev => ({ ...prev, time: `${hours}:${minutes}` }));
    }
  };

  const handleServiceSelect = (service) => {
    setBookingData(prev => ({
      ...prev,
      service: service.name,
      provider: '',
      price: `$${service.basePrice}`
    }));
    setShowServiceModal(false);
  };

  const handleProviderSelect = (provider) => {
    setBookingData(prev => ({
      ...prev,
      provider: provider.name
    }));
    setShowProviderModal(false);
  };

  const handleSubmit = () => {
    const formattedBooking = {
      id: Math.random().toString(36).substr(2, 9),
      ...bookingData,
      status: 'confirmed',
      date: bookingData.date.toISOString().split('T')[0],
    };
    router.push('/screens/confirmation');
  };

  const DropdownModal = ({ visible, onClose, data, onSelect, title }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#9C27B0', '#673AB7']}
        style={styles.gradientHeader}
      >
        <MotiText
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
          style={styles.headerText}
        >
          Book Service
        </MotiText>
      </LinearGradient>

      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 1500 }}
        style={styles.formContainer}
      >
        <TouchableOpacity 
          style={styles.inputGroup}
          onPress={() => setShowServiceModal(true)}
        >
          <MaterialCommunityIcons name="tools" size={24} color="#FF6B6B" />
          <Text style={[styles.input, !bookingData.service && styles.placeholder]}>
            {bookingData.service || 'Select Service'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#FF6B6B" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.inputGroup}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialCommunityIcons name="calendar" size={24} color="#FF6B6B" />
          <Text style={styles.dateText}>
            {bookingData.date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.inputGroup}
          onPress={() => setShowTimePicker(true)}
        >
          <MaterialCommunityIcons name="clock-outline" size={24} color="#FF6B6B" />
          <Text style={styles.dateText}>
            {bookingData.time}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.inputGroup, !bookingData.service && styles.disabledInput]}
          onPress={() => bookingData.service && setShowProviderModal(true)}
          disabled={!bookingData.service}
        >
          <MaterialCommunityIcons name="store" size={24} color="#FF6B6B" />
          <Text style={[styles.input, !bookingData.provider && styles.placeholder]}>
            {bookingData.provider || 'Select Provider'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#FF6B6B" />
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <MaterialCommunityIcons name="currency-usd" size={24} color="#FF6B6B" />
          <Text style={styles.input}>
            {bookingData.price || '$0'}
          </Text>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={bookingData.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={new Date(`2024-01-01T${bookingData.time}`)}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <DropdownModal
          visible={showServiceModal}
          onClose={() => setShowServiceModal(false)}
          data={SERVICES}
          onSelect={handleServiceSelect}
          title="Select Service"
        />

        <DropdownModal
          visible={showProviderModal}
          onClose={() => setShowProviderModal(false)}
          data={SERVICE_PROVIDERS[bookingData.service] || []}
          onSelect={handleProviderSelect}
          title="Select Provider"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          <LinearGradient
            colors={['#FF6B6B','#9C27B0', '#673AB7']}
            style={styles.gradient}
          >
            <Text style={styles.submitButtonText}>Confirm Booking</Text>
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  gradientHeader: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  formContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    opacity: 0.7,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#666',
  },
  dateText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default BookingPage;