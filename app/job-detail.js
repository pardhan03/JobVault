import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

const JobDetail = () => {
  const job = useLocalSearchParams();
  const router = useRouter();

  const handleCallHR = () => {
    if (job?.hrPhone) {
      Linking.openURL(job?.custom_link);
    } else {
      alert("HR contact not available.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{job?.title}</Text>
        <Text style={styles.company}>{job?.company_name || "Not specified"}</Text>

        <View style={styles.section}>
          <Text style={styles.label}>📍 Location:</Text>
          <Text style={styles.value}>{job?.primary_details?.Place || "Not specified"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>💰 Salary:</Text>
          <Text style={styles.value}>{job?.salary_min || "N/A"} - {job?.salary_max || "N/A"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>🎓 Experience:</Text>
          <Text style={styles.value}>{job?.experience || "Not specified"} years</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>🛠 Job Type:</Text>
          <Text style={styles.value}>{job?.job_type || "Not specified"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>📌 Required Skills:</Text>
          <Text style={styles.value}>{job?.skills ? job.skills.join(", ") : "Not specified"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>📝 Description:</Text>
          <Text style={styles.description}>{job?.description || "No description available."}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>📞 Contact:</Text>
          <Text style={styles.value}>{job?.whatsapp_no || "Not available"}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => router.back()}>
          <Text style={styles.buttonText}>⬅ Go Back</Text>
        </TouchableOpacity>

        {job?.button_text && (
          <TouchableOpacity style={styles.buttonCall} onPress={handleCallHR}>
            <Text style={styles.buttonText}>📞 Call HR</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  company: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
  },
  section: {
    marginTop: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  value: {
    fontSize: 16,
    color: "#666",
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonBack: {
    flex: 1,
    backgroundColor: "#ccc",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  buttonCall: {
    flex: 1,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default JobDetail;
