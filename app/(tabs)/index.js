import { StyleSheet, View, FlatList, ActivityIndicator, useWindowDimensions } from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Card from "../../components/Card";

const initialPage = 1;  

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  const { width } = useWindowDimensions();

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
      } else {
        setData([]); 
        setPage(initialPage);
        fetchData(initialPage); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(initialPage);
  }, []);

  const onRefresh = () => {
    if (loading) return;
    setData([]);
    setPage(initialPage);
    fetchData(initialPage);
  };

  const renderItem = useCallback(({ item }) => <Card job={item} />, []);

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
        keyExtractor={(item, index) => index.toString()} 
        onEndReached={() => fetchData(page)}
        onEndReachedThreshold={5}
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
