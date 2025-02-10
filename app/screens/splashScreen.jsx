import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const SplashScreen = () => {
  const router = useRouter();
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 2,
        tension: 40,
        useNativeDriver: true
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true
      })
    ]).start(() => {
      setTimeout(() => {
        router.replace('/signin');
      }, 1500);
    });
  }, []);

  return (
    <LinearGradient 
      colors={['#9C27B0', '#673AB7']} 
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.logoContainer, 
          { 
            transform: [{ scale: logoScale }],
            opacity: logoOpacity
          }
        ]}
      >
        <MaterialIcons name="home-repair-service" size={100} color="white" />
        <Text style={styles.logoText}>TASKHIVE</Text>
        <View style={styles.serviceIconsContainer}>
          <MaterialIcons name="plumbing" size={40} color="white" style={styles.serviceIcon} />
          <MaterialIcons name="electrical-services" size={40} color="white" style={styles.serviceIcon} />
          <MaterialIcons name="moving" size={40} color="white" style={styles.serviceIcon} />
          <MaterialIcons name="school" size={40} color="white" style={styles.serviceIcon} />
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a90e2'
  },
  logoContainer: {
    alignItems: 'center'
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    letterSpacing: 2
  },
  serviceIconsContainer: {
    flexDirection: 'row',
    marginTop: 30
  },
  serviceIcon: {
    marginHorizontal: 15,
    opacity: 0.8
  }
});

export default SplashScreen;