import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const PastReviews = () => {
  // Sample reviews
  const [reviews, setReviews] = useState([
    {
      id: "1",
      name: "John Doe",
      serviceType: "House Cleaning",
      stars: 4,
      date: "2024-02-05",
      content: "Great service! The house was spotless. Would recommend.",
      likes: 12,
      dislikes: 2,
    },
    {
      id: "2",
      name: "Jane Smith",
      serviceType: "Car Repair",
      stars: 5,
      date: "2024-01-20",
      content: "Fantastic work! My car is running like new again.",
      likes: 20,
      dislikes: 1,
    },
    {
      id: "3",
      name: "Michael Brown",
      serviceType: "Lawn Mowing",
      stars: 3,
      date: "2023-12-15",
      content: "Decent job but missed a few spots. Could be better.",
      likes: 5,
      dislikes: 4,
    },
  ]);

  // Function to handle like & dislike
  const handleReaction = (id, type) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              likes: type === "like" ? review.likes + 1 : review.likes,
              dislikes: type === "dislike" ? review.dislikes + 1 : review.dislikes,
            }
          : review
      )
    );
  };

  return (
    <View style={styles.container}>
        <LinearGradient colors={['#9C27B0', '#673AB7']} style={styles.header}>
        <Text style={styles.headerText}>Reviews</Text>
      </LinearGradient>      

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.cardHeader, { backgroundColor: "#4CAF50" }]}>
              <View style={styles.cardHeaderContent}>
                <FontAwesome name="user-circle" size={24} color="#fff" />
                <Text style={styles.serviceTitle}>{item.name}</Text>
              </View>
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                {item.date}
              </Text>
            </View>

            <View style={styles.cardBody}>
              {/* Service Type */}
              <View style={styles.detailRow}>
                <MaterialIcons name="miscellaneous-services" size={20} color="#4CAF50" />
                <Text style={styles.detailText}>{item.serviceType}</Text>
              </View>

              {/* Star Rating */}
              <View style={styles.detailRow}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <FontAwesome
                    key={index}
                    name="star"
                    size={20}
                    color={index < item.stars ? "#FFD700" : "#ccc"}
                  />
                ))}
              </View>
              

              {/* Review Content */}
              <View style={styles.expandedContent}>
                <Text style={styles.descriptionTitle}>Review</Text>
                <Text style={styles.descriptionText}>{item.content}</Text>
              </View>

              {/* Like & Dislike Buttons */}
              <View style={styles.reactionContainer}>
                <TouchableOpacity
                  style={styles.reactionButton}
                  onPress={() => handleReaction(item.id, "like")}
                >
                  <FontAwesome name="thumbs-up" size={20} color="#4CAF50" />
                  <Text style={styles.reactionText}>{item.likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.reactionButton}
                  onPress={() => handleReaction(item.id, "dislike")}
                >
                  <FontAwesome name="thumbs-down" size={20} color="#FF5252" />
                  <Text style={styles.reactionText}>{item.dislikes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardBody: {
    padding: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    color: "#333",
    fontSize: 16,
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  descriptionText: {
    color: "#666",
    lineHeight: 20,
  },
  reactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  reactionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  reactionText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default PastReviews;
