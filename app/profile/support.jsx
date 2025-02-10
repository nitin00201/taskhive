import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const HelpSupport = () => {
  const router = useRouter();

  // Sample help topics
  const helpTopics = [
    { id: "1", title: "How to Book a Service?", icon: "question-circle" },
    { id: "2", title: "Payment Issues", icon: "credit-card" },
    { id: "3", title: "Account Management", icon: "user-cog" },
    { id: "4", title: "Service Cancellation", icon: "times-circle" },
  ];

  return (
    <View style={styles.container}>
        <LinearGradient colors={['#9C27B0', '#673AB7']} style={styles.header}>
        <Text style={styles.headerText}>Reviews</Text>
      </LinearGradient>            

      <FlatList
        data={helpTopics}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/screens/support/${item.id}`)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderContent}>
                <FontAwesome5 name={item.icon} size={20} color="#125" />
                <Text style={styles.serviceTitle}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#4CAF50",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceTitle: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default HelpSupport;
