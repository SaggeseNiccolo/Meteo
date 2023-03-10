import { View, Text, TouchableOpacity } from "react-native";

export default function Info({
  pressure,
  humidity,
  feelsLike,
  min,
  wind,
  max,
}) {
  wind = (wind * 3.6).toFixed();

  return (
    <View
      className="rounded-2xl my-4 p-4 w-11/12 top-2 space-y-2"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <View className="flex-row">
        <TouchableOpacity className="flex-1 items-center">
          <Text className="text-gray-400 text-sm">Minima</Text>
          <Text className="text-white text-xl">{min}°C</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Text className="text-gray-400 text-sm">Percepita</Text>
          <Text className="text-white text-xl ">{feelsLike}°C</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Text className="text-gray-400 text-sm">Massima</Text>
          <Text className="text-white text-xl">{max}°C</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row">
        <TouchableOpacity className="flex-1 items-center">
          <Text className="text-gray-400 text-sm">Pressione</Text>
          <Text className="text-white text-xl">{pressure} hPa</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Text className="text-gray-400 text-sm">Umidità</Text>
          <Text className="text-white text-xl">{humidity}%</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Text className="text-gray-400 text-sm">Vento</Text>
          <Text className="text-white text-xl ">{wind} km/h</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
