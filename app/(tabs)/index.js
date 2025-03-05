import {  StyleSheet,View, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 

  const fetchData = async () => {
    if (loading || !hasMore) return; 

    setLoading(true);
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const newData = response?.data?.results; 

      if (newData.length > 0) {
        setData(prevData => [...prevData, ...newData]);
        setPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
   <View>
     <FlatList
        data={data}
        renderItem={({ item }) => <Card job={item} />}
        keyExtractor={item => item?.id}
        onEndReached={fetchData} 
        onEndReachedThreshold={0.5} 
        ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
   </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
