import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Pressable, Text } from "react-native";

function AddAddress({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 140,
        height: 140,
        borderColor: "#D0D0D0",
        // backgroundColor: "#f0f0f0",
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,

        // marginLeft: 70,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "#2b5b53",
          fontWeight: "500",
        }}
      >
        Adicionar endereço, ou Selecionar um Ponto
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AddAddress;
