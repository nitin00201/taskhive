import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const helpDetails = {
  "1": { title: "How to Book a Service?", content: "Go to the 'Bookings' tab and select the service you need." },
  "2": { title: "Payment Issues", content: "Ensure your payment method is valid or contact support." },
  "3": { title: "Account Management", content: "You can update your profile and settings in the 'Profile' section." },
  "4": { title: "Service Cancellation", content: "You can cancel services under 'Bookings' before confirmation." },
};

const HelpDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const topic = helpDetails[id] || { title: "Not Found", content: "This help topic does not exist." };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
<LinearGradient colors={['#9C27B0', '#673AB7']} style={styles.header}>
        <Text style={styles.headerText}>{topic.title}</Text>
      </LinearGradient>            

      <View style={styles.content}>
        <Text style={styles.descriptionText}>{topic.content}</Text>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  descriptionText: {
    fontSize: 18,
    color: "#333",
    lineHeight: 24,
  },
});

export default HelpDetail;
