import { Text, View } from "react-native";
import Signin from './(auth)/signin'
import HomeScreen from './(tabs)/home'
import { useRouter } from "expo-router";
import { auth } from "./config/firebaseConfig";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          router.replace("/home"); 
        } else {
          router.replace("/signin"); 
        }
      }, 3000); 
    });

    return () => unsubscribe(); 
  }, []);
  return (
    // <Signin/>
    // <HomeScreen/>
    <>
    </>
  );
}
