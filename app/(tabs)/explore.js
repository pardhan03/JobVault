import { StyleSheet, Image, Platform, View,Text } from 'react-native';
import React from 'react';


export default function TabTwoScreen() {
  return (
   <View>
    <Text>Hello exlore</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
