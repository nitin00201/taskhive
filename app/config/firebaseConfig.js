import { initializeApp } from "firebase/app";
import {initializeAuth , getReactNativePersistence} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import {getFirestore} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDdo6kf3vGch0fzlfhLQsOqq5c2ZVAjoww",
  authDomain: "taskhive-d8a88.firebaseapp.com",
  projectId: "taskhive-d8a88",
  storageBucket: "taskhive-d8a88.firebasestorage.app",
  messagingSenderId: "766398413112",
  appId: "1:766398413112:web:2a7ea97496b4dedf8769cd",
  measurementId: "G-GT1VX8QV06"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,
   {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
}
)
export const db = getFirestore(app)
const analytics = getAnalytics(app);