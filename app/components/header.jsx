import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import useUserStore from '../stores/useUserStore';
import { Ionicons } from '@expo/vector-icons';

const GreetingHeader = () => {
  const { user, resetUser } = useUserStore();
  const [modalVisible, setModalVisible] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>{getGreeting()},</Text>
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {/* Profile Image */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
      </TouchableOpacity>

      {/* Modal for User Info */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: user.image }} style={styles.modalImage} />
            <Text style={styles.modalName}>{user.name}</Text>
            <Text style={styles.modalEmail}>{user.email}</Text>
            <Text style={styles.modalRole}>{user.role}</Text>
            <Text style={styles.modalPhone}>{user.phone}</Text>

            <TouchableOpacity
              style={styles.signOutButton}
              onPress={() => {
                resetUser(); // Clear user data
                setModalVisible(false);
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="white" />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  greetingSection: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalEmail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  modalRole: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  modalPhone: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  closeButton: {
    marginTop: 10,
  },
  closeText: {
    color: '#4158D0',
    fontWeight: 'bold',
  },
});

export default GreetingHeader;
