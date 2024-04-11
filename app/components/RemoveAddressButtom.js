import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { UserType } from "../../UserContext";
import { useContext } from "react";
import axios from "axios";

import client from "../config/client";
const BASE_URL = client.baseUrl;

function RemoveAddressButtom({ addressId, addressDeleted, setAddressDeleted }) {
  const { userId, setUserId } = useContext(UserType);
  setAddressDeleted(false);
  const handleDeleteAddress = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/addresses/${addressId}/${userId}`
      );

      if (response.status === 200) {
        Alert.alert("Concluido", "O seu Endereço foi Removido com Sucesso.");

        // navigation.goBack();
        setAddressDeleted(!addressDeleted);

        console.log("Order deleted successfully", response.data?.result);
      } else {
        console.log("Error Deleting order", response.data);
      }
    } catch (error) {
      console.log("Error: ", error);
      Alert.alert("Erro ao Remover Endereço", "Error: " + error);
    }
  };

  return (
    <>
      {
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Remover Endereço",
              "Tem a certeza que deseja Remover este Endereço?",
              [
                {
                  text: "Cancelar",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => handleDeleteAddress() },
              ]
            );
          }}
          style={{
            backgroundColor: "#F5F5F5",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 5,
            borderWidth: 0.9,
            borderColor: "#D0D0D0",
          }}
        >
          <Text>Remover</Text>
        </TouchableOpacity>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default RemoveAddressButtom;
