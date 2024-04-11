import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../components/AppButton";
import SectionSeparator from "../components/SectionSeparator";
import Constants from "expo-constants";
import Header from "../components/Header";

import client from "../config/client";
const BASE_URL = client.baseUrl;

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "",
  //     headerStyle: {
  //       backgroundColor: "#ec9301",
  //     },
  //     headerLeft: () => (
  //       <View>
  //         <Text
  //           style={{
  //             paddingBottom: 20,
  //             fontSize: 24,
  //             fontWeight: "600",
  //             marginLeft: 20,
  //           }}
  //         >
  //           Bebuchito's
  //         </Text>
  //       </View>
  //     ),
  //     headerRight: () => (
  //       <Image
  //         style={{
  //           paddingBottom: 20,
  //           marginRight: 20,
  //           width: 50,
  //           height: 50,
  //           resizeMode: "contain",
  //         }}
  //         source={require("../../assets/images/logo-1.png")}
  //       />
  //     ),
  //   });
  // }, []);

  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/profile/${userId}`);
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);

  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders/${userId}`);
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, []);
  console.log(userId);
  console.log("orders", orders);
  return (
    <>
      <View
        style={{
          backgroundColor: "#ec9301",
          backgroundColor: "#fff",
          paddingTop: Constants.statusBarHeight + 1,
        }}
      />

      <Header goBackButton={false} />

      <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
        <Text style={styles.text}>Bem vindo(a) {user?.name}</Text>

        <View style={styles.viewContainer}>
          <AppButton onPress={() => {}} title="Seus Pedidos" />
          <AppButton onPress={() => {}} title="Sua Conta" />
        </View>

        {user?.role === "admin" && (
          <>
            <Text style={styles.text}>Para administradores</Text>
            <SectionSeparator />
            <View style={styles.viewContainer}>
              <AppButton
                onPress={() => navigation.navigate("History")}
                title="Historico de Pedidos"
              />
              <AppButton
                onPress={() => navigation.navigate("Deliver")}
                title="Entregas Para Hoje"
              />
            </View>
            <SectionSeparator />
          </>
        )}

        <View style={styles.viewContainer}>
          {/* <AppButton onPress={() => {}} title="Sua Conta" /> */}

          <AppButton onPress={logout} title="Terminar Sessão" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator
              animating={loading}
              size={"large"}
              color={"#fff"}
            />
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <Pressable
                style={{
                  marginTop: 20,
                  padding: 15,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#d0d0d0",
                  marginHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={order._id}
              >
                {/* Render the order information here */}
                {order.products.slice(0, 1)?.map((product) => (
                  <View style={{ marginVertical: 10 }} key={product._id}>
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: 100, height: 100, resizeMode: "contain" }}
                    />
                  </View>
                ))}
              </Pressable>
            ))
          ) : (
            <Text>No orders found</Text>
          )}
        </ScrollView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  text: { fontSize: 16, fontWeight: "bold", paddingTop: 25 },
});

export default ProfileScreen;
