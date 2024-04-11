import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

function Addresses({ selectedAddress, item, setSelectedAddress }) {
  return (
    <Pressable
      onPress={() => setSelectedAddress(item)}
      style={{
        width: 140,
        height: 140,
        borderColor: "#D0D0D0",
        borderWidth: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        marginRight: 20,
        marginTop: 10,
        backgroundColor: selectedAddress === item ? "#41897c" : "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: selectedAddress === item ? "#fff" : "#000",
            color: selectedAddress === item ? "#fff" : "#000",
          }}
        >
          {item?.name}
        </Text>
        <Entypo
          style={{ paddingLeft: 1 }}
          name="location-pin"
          size={24}
          color={"red"}
        />
      </View>
      <Text
        numberOfLines={1}
        style={{
          width: 130,
          fontSize: 12,
          textAlign: "center",
          color: selectedAddress === item ? "#fff" : "#000",
        }}
      >
        {item?.houseNo}, {item?.landmark}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          width: 130,
          fontSize: 12,
          textAlign: "center",
          color: selectedAddress === item ? "#fff" : "#000",
        }}
      >
        {item?.street}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          width: 130,
          fontSize: 12,
          textAlign: "center",
          color: selectedAddress === item ? "#fff" : "#000",
        }}
      >
        Angola, Luanda
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Addresses;
