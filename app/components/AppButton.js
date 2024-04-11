import { TouchableOpacity, Text } from "react-native";

export default function AppButton({ onPress, title, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 10,
        backgroundColor: "#E0E0E0",
        borderRadius: 25,
        flex: 1,
        ...style,
      }}
    >
      <Text style={{ textAlign: "center" }}>{title}</Text>
    </TouchableOpacity>
  );
}
