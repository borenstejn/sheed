import { View, Text } from 'react-native';

export default function SheedsScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-neutral-950">
      <Text className="text-neutral-100 text-2xl font-bold">Mes Sheeds</Text>
      <Text className="text-neutral-400 mt-2">Tes matchs apparaîtront ici</Text>
    </View>
  );
}
