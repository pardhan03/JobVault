import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Card from "../../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialPage = 1;

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const fetchData = async (pageNum) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${pageNum}`);
      const result = await response.json();
      const newData = result?.results || [];

      if (newData.length > 0) {
        setData((prevData) => [...prevData, ...newData]);
        setPage(pageNum + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(initialPage);
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem("bookmarkedJobs");
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    }
  };

  const handleBookmark = async (job) => {
    let updatedBookmarks;
    if (bookmarks.some((item) => item.id === job.id)) {
      updatedBookmarks = bookmarks.filter((item) => item.id !== job.id);
    } else {
      updatedBookmarks = [...bookmarks, job];
    }

    setBookmarks(updatedBookmarks);
    await AsyncStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks));
  };

  const onRefresh = () => {
    if (loading) return;
    setData([]);
    setPage(initialPage);
    fetchData(initialPage);
    loadBookmarks(); 
  };

  const renderItem = useCallback(
    ({ item }) => (
      <Card
        job={item}
        onBookmark={handleBookmark}
        isBookmarked={bookmarks.some((b) => b.id === item.id)}
      />
    ),
    [bookmarks]
  );

  const itemHeight = 150;

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        minimumViewTime: 500,
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged: ({ changed }) => {
        changed.forEach((changedItem) => {
          if (changedItem.isViewable) {
            console.log("++ Impression for: ", changedItem.item.id);
          }
        });
      },
    },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id} 
        onEndReached={() => fetchData(page)}
        onEndReachedThreshold={0.5} 
        ListFooterComponent={() => loading && <ActivityIndicator size="large" color="#0000ff" />}
        refreshing={loading}
        onRefresh={onRefresh}
        getItemLayout={(data, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

