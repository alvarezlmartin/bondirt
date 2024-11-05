import { useEffect, useCallback, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible initially

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  const paperTheme = colorScheme === 'dark' ? { ...MD3DarkTheme } : { ...MD3LightTheme };

  useEffect(() => {
    // Simulate an async task like data fetching, preparing themes, etc.
    const prepareApp = async () => {
      try {
        // Perform any async operations you need here
      } catch (e) {
        console.warn(e);
      } finally {
        // Set the app as ready to render
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Show nothing until the app is ready
  }

  return (
    <PaperProvider theme={paperTheme}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </PaperProvider>
  );
}