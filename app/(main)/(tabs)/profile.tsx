import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#101012' }}>
      <Text style={{ color: '#F5F5F7', fontSize: 24, fontWeight: 'bold' }}>Mon Profil</Text>
      <Text style={{ color: '#8A8A8E', marginTop: 8 }}>Tes stats apparaîtront ici</Text>
    </View>
  );
}
