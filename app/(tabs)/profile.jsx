import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../config/firebaseConfig';

const ProfileScreen = () => {
  const router = useRouter();
  
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    avatar: 'JD'
  };

  const menuItems = [
    {
      title: 'Services Booked',
      icon: 'home-repair-service',
      route: '/profile/services',
      badge: '3 active'
    },
    {
      title: 'Payment Methods',
      icon: 'credit-card',
      route: '/profile/payment',
      badge: '2 cards'
    },
    {
      title: 'Past Reviews',
      icon: 'star',
      route: '/profile/reviews',
      badge: '12 reviews'
    },
    {
      title: 'Settings',
      icon: 'settings',
      route: '/profile/settings'
    },
    {
      title: 'Help & Support',
      icon: 'help-outline',
      route: '/profile/support'
    }
  ];

  const handleLogout= async()=>{
    try {
      const response = await auth.signOut()
      console.log("logged out ",response);
      router.replace("/signin")
      
    } catch (error) {
      console.log("error doing loggin out");
      
    }
  }

  const MenuItem = ({ title, icon, route, badge }) => (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={() => router.push(route)}
    >
      <View style={styles.menuItemLeft}>
        <MaterialIcons name={icon} size={24} color="#4a90e2" />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {badge && <Text style={styles.badge}>{badge}</Text>}
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#9C27B0', '#673A7']}
        style={styles.headerGradient}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userInfo.avatar}</Text>
          </View>
          <Text style={styles.name}>{userInfo.name}</Text>
        </View>
      </LinearGradient>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <MaterialIcons name="email" size={20} color="#666" />
          <Text style={styles.infoText}>{userInfo.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="phone" size={20} color="#666" />
          <Text style={styles.infoText}>{userInfo.phone}</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20,
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 40,
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
  },
});

export default ProfileScreen;