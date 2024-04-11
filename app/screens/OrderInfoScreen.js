import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../components/Header";
import Constants from "expo-constants";
import SectionSeparator from "../components/SectionSeparator";
import axios from "axios";
import client from "../config/client";
const BASE_URL = client.baseUrl;

function OrderInfoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    _id,
    createdAt,
    paymentMethod,
    products,
    shippingAddress,
    totalPrice,
    user,
    delivered,
  } = route?.params?.item;

  const handleDeleteOrder = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/orders/${_id}`);

      if (response.status === 200) {
        Alert.alert("Finalizado", "O seu pedido foi finalizado Com sucesso.");

        navigation.goBack();

        console.log("Order deleted successfully", response.data?.result);
      } else {
        console.log("Error deleting order", response.data);
      }
    } catch (error) {
      console.log("Error: ", error);
      Alert.alert("Erro ao Finalizar", "Error: " + error);
    }
  };

  const handleUpdateOrder = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/orders/${_id}`, {
        delivered: true,
      });

      if (response.status === 200) {
        Alert.alert("Finalizado", "O seu pedido foi finalizado Com sucesso.");

        navigation.goBack();

        console.log("Order deleted successfully", response.data?.result);
      } else {
        console.log("Error deleting order", response.data);
      }
    } catch (error) {
      console.log("Error: ", error);
      Alert.alert("Erro ao Finalizar", "Error: " + error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: Constants.statusBarHeight,
          backgroundColor: "#ec9301",
          backgroundColor: "#fff",
        }}
      />
      <Header />
      <Text
        style={{
          fontSize: 22,
          paddingHorizontal: 10,
          paddingTop: 10,
          fontWeight: "500",
        }}
      >
        Detalhes
      </Text>

      <ScrollView
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            // backgroundColor: "#fff",
            padding: 10,
            borderRadius: 20,
            marginTop: 24,
          }}
        >
          <Text style={{ fontSize: 18, paddingTop: 0, fontWeight: "400" }}>
            {createdAt}
          </Text>
          <Text>Pagamento: {paymentMethod}</Text>
          <Text
            style={{ fontWeight: "600", color: "yellowgreen", fontSize: 16 }}
          >
            Total: {totalPrice} Kz
          </Text>
        </View>

        <SectionSeparator />

        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontSize: 18, paddingTop: 10, fontWeight: "400" }}>
            Endereço de Entrega
          </Text>
          <View
            style={{ height: 1, backgroundColor: "#ccc", marginVertical: 10 }}
          />
          <Text>Nome: {shippingAddress?.name}</Text>
          <Text>Nº Casa: {shippingAddress?.houseNo}</Text>
          <Text>Contacto: {shippingAddress?.mobileNo}</Text>
          <Text>Código Postal: {shippingAddress?.postalCode}</Text>
          <Text>Ponto de Referencia: {shippingAddress?.landmark}</Text>
        </View>

        <SectionSeparator />

        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 20,
            // marginHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18, paddingTop: 10, fontWeight: "400" }}>
            Produtos
          </Text>
          <View
            style={{
              height: "auto",
              backgroundColor: "#ccc",
              marginVertical: 10,
            }}
          />
          {products.map((item, index) => (
            <View
              key={index}
              style={{
                // height: 150,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-around",
                marginVertical: 20,
              }}
            >
              <Image
                style={{ width: 140, height: 140 }}
                source={{ uri: item?.image }}
              />
              <View style={{ marginLeft: 20, gap: 12 }}>
                <Text>Nome: {item?.name}</Text>
                <Text>Preço: {item?.price} Kz</Text>
                <Text>Quantidade: {item?.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
        <View
          style={{
            height: 150,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {delivered ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Apagar",
                  "Tem a certeza que deseja Apagar a Encomenda?",
                  [
                    {
                      text: "Cancelar",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "OK", onPress: () => handleDeleteOrder() },
                  ]
                );
              }}
              style={{
                padding: 14,
                backgroundColor: "#ff0e0e",
                borderRadius: 50,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>
                Apagar Pedido!
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Finalizar",
                  "Tem a certeza que deseja Finalizar a Encomenda?",
                  [
                    {
                      text: "Cancelar",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "OK", onPress: () => handleUpdateOrder() },
                  ]
                );
              }}
              style={{
                padding: 14,
                backgroundColor: "#ff0e0e",
                borderRadius: 50,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>
                Finalizar Pedido!
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OrderInfoScreen;
