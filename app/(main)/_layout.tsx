import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function MainLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#101012' }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}
