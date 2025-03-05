import { Ionicons } from "@expo/vector-icons";

export const icon = {
  index: function ({ color, focused }) {
    return focused ? (
      <Ionicons name="home" size={24} color={color} />
    ) : (
      <Ionicons name="home-outline" size={24} color={color} />
    );
  },
  discover: function ({ color, focused }) {
    return focused ? (
      <Ionicons name="compass" size={25} color={color} />
    ) : (
      <Ionicons name="compass-outline" size={25} color={color} />
    );
  },
  saved: function ({ color, focused }) {
    return focused ? (
      <Ionicons name="bookmarks" size={22} color={color} />
    ) : (
      <Ionicons name="bookmarks-outline" size={22} color={color} />
    );
  },
  setting: function ({ color, focused }) {
    return focused ? (
      <Ionicons name="settings" size={24} color={color} />
    ) : (
      <Ionicons name="settings-outline" size={24} color={color} />
    );
  },
};
