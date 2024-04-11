import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { UserType } from "../../UserContext";
import Header from "../components/Header";
import RemoveAddressButtom from "../components/RemoveAddressButtom";

import addressesApi from "../api/addresses";

import client from "../config/client";
const BASE_URL = client.baseUrl;

import axios from "axios";

function AddAdressScreen(props) {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);

  const [addresses, setAddresses] = useState([]);
  const [addressDeleted, setAddressDeleted] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/addresses/${userId}`);

      const { addresses } = response?.data;

      setLoading(false);

      if (response?.data) {
        setAddresses(addresses);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [addressDeleted]);

  //Refresh the addresses when component comes to the focus(When we navigate back)
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          paddingTop: Constants.statusBarHeight + 1,
        }}
      />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Os Seus Endereços
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Add")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingVertical: 7,
              paddingHorizontal: 5,
            }}
          >
            <Text>Adicionar novo Endereço</Text>
            <MaterialIcons
              style={{ paddingLeft: 10 }}
              name="keyboard-arrow-right"
              size={24}
              color={"black"}
            />
          </Pressable>

          {loading && (
            <ActivityIndicator
              style={{ marginTop: 50 }}
              animating={loading}
              size={"large"}
            />
          )}

          <Pressable>
            {addresses &&
              addresses?.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: "#D0D0D0",
                    padding: 10,
                    flexDirection: "column",
                    gap: 5,
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo
                      style={{ paddingLeft: 10 }}
                      name="location-pin"
                      size={24}
                      color={"red"}
                    />
                  </View>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.houseNo}, {item.landmark}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.street}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Angola, Luanda
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Nº Tel. {item?.mobileNo}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Código Postal: {item?.postalCode}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 7,
                    }}
                  >
                    <RemoveAddressButtom
                      addressId={item?._id}
                      addressDeleted={addressDeleted}
                      setAddressDeleted={setAddressDeleted}
                    />
                  </View>
                </Pressable>
              ))}
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

export default AddAdressScreen;
