// Configure NativeWind dark mode before importing global.css
import { Platform } from 'react-native';

// For web, set dark mode flag before NativeWind initializes
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  // Add dark class before CSS loads
  document.documentElement.classList.add('dark');
}

import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryProvider } from '@/hooks/useQueryClient';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <QueryProvider>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: '#101012' }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </QueryProvider>
  );
}
