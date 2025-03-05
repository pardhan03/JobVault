import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../../components/Card";
import { useFocusEffect } from "@react-navigation/native";

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem("bookmarkedJobs"); 
      if (savedBookmarks) {
        setBookmarkedJobs(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    }
  };

  // Refresh bookmarks when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const handleUnbookmark = async (job) => {
    const updatedBookmarks = bookmarkedJobs.filter((item) => item.id !== job.id);
    setBookmarkedJobs(updatedBookmarks);
    await AsyncStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks));
  };

  return (
    <View style={styles.container}>
      {bookmarkedJobs.length === 0 ? (
        <Text style={styles.emptyText}>No Bookmarked Jobs</Text>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          renderItem={({ item }) => (
            <Card
              job={item}
              onBookmark={handleUnbookmark}
              isBookmarked={true} 
            />
          )}
          keyExtractor={(item) => item?.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Bookmarks;
