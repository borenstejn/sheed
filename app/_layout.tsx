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
