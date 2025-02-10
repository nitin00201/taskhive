import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    console.log('Reset password for:', email);
  };

  return (
    <LinearGradient colors={['#4c00ff', '#ff5f6d']} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you instructions to reset your password.
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signin')} style={styles.backToSignIn}>
          <Ionicons name="arrow-back-outline" size={18} color="#4c00ff" />
          <Text style={styles.backToSignInText}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  formContainer: { backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 20, borderRadius: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 10, marginBottom: 15, paddingHorizontal: 15 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, fontSize: 16 },
  resetButton: { backgroundColor: '#4c00ff', padding: 15, borderRadius: 10, alignItems: 'center', width: '100%' },
  resetButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  backToSignIn: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  backToSignInText: { color: '#4c00ff', fontSize: 16, marginLeft: 5 },
});

export default ForgotPasswordScreen;
