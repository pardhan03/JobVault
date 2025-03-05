import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)"  options={{
            title: "Jobs",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "bold",
              color: colorScheme === 'dark' ? "#facc15" : "#0f172a", 
            },
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? "#1e293b" : "#f8fafc", 
            }
          }}  />
        <Stack.Screen name="job-detail"  options={{
            title: "Job Description",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "bold",
              color: colorScheme === 'dark' ? "#facc15" : "#0f172a", 
            },
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? "#1e293b" : "#f8fafc", 
            }
          }}  />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
