import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PaymentScreen = () => {
  const router = useRouter();

  const [savedCards, setSavedCards] = useState([
    { id: "1", cardNumber: "**** **** **** 4521", cardHolder: "John Doe", expiryDate: "12/25", type: "visa" },
    { id: "2", cardNumber: "**** **** **** 8742", cardHolder: "John Doe", expiryDate: "09/24", type: "mastercard" },
  ]);

  const getCardIcon = (type) => {
    switch (type.toLowerCase()) {
      case "visa":
        return <FontAwesome5 name="cc-visa" size={32} color="#1A1F71" />;
      case "mastercard":
        return <FontAwesome5 name="cc-mastercard" size={32} color="#EB001B" />;
      default:
        return <MaterialCommunityIcons name="credit-card" size={32} color="#333" />;
    }
  };

  const CardItem = ({ card }) => (
    <TouchableOpacity style={styles.cardContainer}>
      <LinearGradient colors={['#215425', '#452365']} style={styles.cardGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.cardHeader}>
          <View style={styles.chipIcon}>
            <MaterialCommunityIcons name="chip" size={32} color="#FFD700" />
          </View>
          {getCardIcon(card.type)}
        </View>
        <Text style={styles.cardNumber}>{card.cardNumber}</Text>
        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.cardLabel}>Card Holder</Text>
            <Text style={styles.cardText}>{card.cardHolder}</Text>
          </View>
          <View>
            <Text style={styles.cardLabel}>Expires</Text>
            <Text style={styles.cardText}>{card.expiryDate}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Rounded Back Button */}
      <LinearGradient colors={['#9C27B0', '#673AB7']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#125" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment Methods</Text>
      </LinearGradient>

      <ScrollView style={styles.cardsContainer}>
        {savedCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <LinearGradient colors={['#9C27B0', '#HG52KK']} style={styles.addButtonGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <MaterialCommunityIcons name="plus" size={24} color="white" />
          <Text style={styles.addButtonText}>Add New Card</Text>
        </LinearGradient>
      </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 45,
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#125",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    padding: 20,
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardGradient: {
    padding: 20,
    borderRadius: 15,
    height: 200,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  chipIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 5,
    borderRadius: 8,
  },
  cardNumber: {
    color: "white",
    fontSize: 22,
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    marginBottom: 5,
  },
  cardText: {
    color: "white",
    fontSize: 16,
  },
  addButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default PaymentScreen;
