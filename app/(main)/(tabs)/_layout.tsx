import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: focused ? '#FF3B7A' : '#8A8A8E', fontSize: 10 }}>{name}</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1C1C1E',
          borderTopColor: '#3A3A3C',
          height: 80,
          paddingBottom: 20,
        },
        tabBarActiveTintColor: '#FF3B7A',
        tabBarInactiveTintColor: '#8A8A8E',
      }}
    >
      <Tabs.Screen
        name="sheeds"
        options={{
          title: 'Sheeds',
          tabBarIcon: ({ focused }) => <TabIcon name="💕" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused }) => <TabIcon name="💬" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => <TabIcon name="👤" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
