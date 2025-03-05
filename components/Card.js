import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router";



const Card = ({ job, onBookmark  }) => {
  const router=useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handlePress = () => {
    router.push({
      pathname: "/job-detail",
      params: { ...job },
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(job); 
  };

  return (
    <TouchableOpacity  style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="briefcase" size={22} color="#0f172a" />
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {job.title}
          </Text>
        </View>
        <TouchableOpacity onPress={handleBookmark}>
          <FontAwesome
            name={isBookmarked ? "bookmark" : "bookmark-o"}
            size={24}
            color={isBookmarked ? "#facc15" : "#94a3b8"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Ionicons name="location-sharp" size={20} color="#64748b" />
        <Text style={styles.infoText}>{job?.primary_details?.Place}</Text>
      </View>

      <View style={styles.infoContainer}>
        <FontAwesome name="dollar" size={20} color="#16a34a" />
        <Text style={styles.salaryText}>
          {job?.salary_min} - {job?.salary_max}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Ionicons name="call" size={20} color="#2563eb" />
        <Text style={styles.infoText}>{job?.whatsapp_no}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    marginRight: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    flexShrink: 1,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#4b5563",
  },
  salaryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#16a34a",
  },
});

export default Card;
