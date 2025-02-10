// app/profile/settings.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Switch,
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const SettingsScreen = () => {
  const router = useRouter();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    locationServices: true,
    autoplay: false,
    dataUsage: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const settingsSections = [
    {
      title: 'Notifications',
      items: [
        {
          key: 'pushNotifications',
          label: 'Push Notifications',
          description: 'Receive push notifications for updates'
        },
        {
          key: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Receive email updates and newsletters'
        },
        {
          key: 'smsNotifications',
          label: 'SMS Notifications',
          description: 'Receive text message updates'
        }
      ]
    },
    {
      title: 'App Settings',
      items: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Enable dark theme'
        },
        {
          key: 'locationServices',
          label: 'Location Services',
          description: 'Enable location-based features'
        },
        {
          key: 'autoplay',
          label: 'Autoplay Media',
          description: 'Automatically play videos'
        },
        {
          key: 'dataUsage',
          label: 'Data Saving Mode',
          description: 'Reduce data usage when on cellular'
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.settingsContainer}>
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.key} style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={styles.settingDescription}>
                    {item.description}
                  </Text>
                </View>
                <Switch
                  value={settings[item.key]}
                  onValueChange={() => toggleSetting(item.key)}
                  trackColor={{ false: '#D1D1D6', true: '#007AFF' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            ))}
          </View>
        ))}

        <View style={styles.infoSection}>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.infoButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.infoButtonText}>Terms of Service</Text>
          </TouchableOpacity>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsContainer: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginVertical: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  infoButton: {
    paddingVertical: 12,
  },
  infoButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  version: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
});

export default SettingsScreen;