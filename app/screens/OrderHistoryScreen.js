import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import Constants from "expo-constants";
import axios from "axios";
import SectionSeparator from "../components/SectionSeparator";
import { Image } from "react-native";
// import order from "../../api/models/order";
import OrderComponent from "../components/OrderComponent";
import { useFocusEffect } from "@react-navigation/native";

import client from "../config/client";
const BASE_URL = client.baseUrl;

function OrderHistoryScreen(props) {
  const [orders, setOrders] = useState();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders`);
      const { orders } = response.data;
      setOrders(orders);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <View style={styles.screen} />

      <Header />

      <Text style={{ fontSize: 22, paddingHorizontal: 10, paddingTop: 10 }}>
        Historico de Pedidos ({orders?.length})
      </Text>

      <View
        style={{
          marginVertical: 10,
          justifyContent: "flex-start",
          height: "80%",
          marginTop: 0,
        }}
      >
        <View>
          <View style={styles.container}>
            <FlatList
              data={orders}
              renderItem={({ item }) => <OrderComponent item={item} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ec9301",
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    padding: 10,
  },
});

export default OrderHistoryScreen;
