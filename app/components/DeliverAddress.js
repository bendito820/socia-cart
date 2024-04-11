import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

function DeliverAddress({ selectedAddress, setModalVisible, modalVisible }) {
  return (
    <Pressable
      onPress={() => setModalVisible(!modalVisible)}
      style={{
        flexDirection: "column",
        gap: 5,
        padding: 10,
        backgroundColor: "#6CE4Cf",
      }}
    >
      <Text style={{ fontWeight: "600", color: "#fff" }}>Entregar para:</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Entypo name="location-pin" size={36} color="white" />
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          {selectedAddress ? (
            <Text style={{ fontSize: 19, fontWeight: "500", color: "#fff" }}>
              {selectedAddress?.name} - {selectedAddress?.street}
            </Text>
          ) : (
            <Text style={{ fontSize: 19, fontWeight: "800", color: "#fff" }}>
              Adicionar um Endereço
            </Text>
          )}
        </Pressable>
        <MaterialIcons name="keyboard-arrow-down" size={32} color={"white"} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DeliverAddress;
