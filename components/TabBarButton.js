import { Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { icon } from "../constants/Icon.js";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "../constants/Colors.js";
import { Ionicons } from "@expo/vector-icons";
const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 50 }
    );
  }, [opacity, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacityValue = interpolate(opacity.value, [0, 1], [1, 0]);

    return {
      opacity: opacityValue,
    };
  });

  const renderIcon = icon[routeName]
    ? icon[routeName]
    : () => <Ionicons name="help-circle-outline" size={24} color="gray" />;
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarBtn}
    >
      {renderIcon({
        color: isFocused ? Colors.tabIconSelected : Colors.tabIconDefault,
        focused: isFocused,
      })}
      <Animated.Text
        style={[
          {
            color: isFocused ? Colors.tabIconSelected : Colors.tabIconDefault,
            fontSize: 12,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabbarBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default TabBarButton;
