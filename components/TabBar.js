import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    useDerivedValue,
  } from "react-native-reanimated";
  import { StyleSheet, View } from "react-native";
  import { useState } from "react";
  import TabBarButton from "./TabBarButton";
  import { Colors } from "../constants/Colors";
  
  export function TabBar({ state, descriptors, navigation }) {
    const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
    const buttonWidth = dimensions.width / state.routes.length;
    const indicatorWidth = 40; 
  
    const onTabbarLayout = (e) => {
      setDimensions({
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width,
      });
    };
  
    const tabPositionX = useSharedValue(0);
  
    const animatedTabPositionX = useDerivedValue(() => {
      return withTiming(state.index * buttonWidth + (buttonWidth - indicatorWidth) / 2, {
        duration: 200,
      });
    });
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: animatedTabPositionX.value }],
      };
    });
  
    return (
      <View onLayout={onTabbarLayout} style={styles.tabbar}>
        <Animated.View
          style={[
            animatedStyle,
            styles.indicator,
          ]}
        />
        
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
  
          return (
            <TabBarButton
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={route?.name}
              label={label}
            />
          );
        })}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    tabbar: {
      flexDirection: "row",
      paddingTop: 16,
      paddingBottom: 40,
      backgroundColor: Colors.white,
    },
    indicator: {
      position: "absolute",
      backgroundColor: Colors.tint,
      top: 52,
      height: 8,
      width: 40, 
      borderRadius: 4, 
    },
  });
  