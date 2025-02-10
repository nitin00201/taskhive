import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import {auth ,db } from './../config/firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUpScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async() => {
    console.log({ name, email, password, phone, role });
    try {
    const userCredential= await createUserWithEmailAndPassword(auth,email,password);
    const user = userCredential.user;
    const data ={
      name: name,
      email:email,
      uid: user?.uid,
      role: role
    }
    
    console.log("user created",user);
    await updateProfile(auth.currentUser, {
    displayName: name, photoURL: `https://ui-avatars.com/api/?name=${data.name}`
    })
    
    await setDoc(doc(db, 'users', user.uid), data);
    router.push("/home")

      } catch (error) {
      const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error occured ", errorMessage ,"and code is ",errorCode);
    
    }
  };

  return (
    <LinearGradient colors={['#4c00ff', '#ff5f6d']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join FitTrack Pro today!</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
          </View>
          
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showConfirmPassword} />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              <Ionicons name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          </View>

          

          <View style={styles.inputContainer}>
            <Ionicons name="people-outline" size={24} color="#666" style={styles.inputIcon} />
            <Picker
             selectedValue={role} style={styles.picker} onValueChange={(itemValue) => setRole(itemValue)}>
              <Picker.Item label="Customer" value="customer" />
              <Picker.Item label="Service Provider" value="service_provider" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/signin')}>
            <Text style={styles.signInText}>Already have an account? <Text style={styles.signInLink}>Sign In</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  formContainer: { backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 20, borderRadius: 20, margin: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 10, marginBottom: 15, paddingHorizontal: 15 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, fontSize: 16 },
  picker: { flex: 1, height: 50 },
  eyeIcon: { padding: 10 },
  signUpButton: { backgroundColor: '#4c00ff', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  signUpButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signInText: { textAlign: 'center', color: '#666' },
  signInLink: { color: '#4c00ff', fontWeight: 'bold' }
});

export default SignUpScreen;
