import { Entypo } from "@expo/vector-icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box"; // import { SliderBox } from "react-native-image-slider-box";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";

import axios from "axios";
import jwt_decode from "jwt-decode";
import DropDownPicker from "react-native-dropdown-picker";

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../../UserContext";
import Header from "../components/Header";

import Constants from "expo-constants";
import AddAddress from "../components/AddAddress";
import Addresses from "../components/Addresses";
import DeliverAddress from "../components/DeliverAddress";
import ProductsComponent from "../components/ProductsComponent";
import data from "../data/data";

import client from "../config/client";
const BASE_URL = client.baseUrl;

const { images } = data;

function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([
    { label: "Todos os Produtos", value: "" },
    { label: "Frescos, Carnes, Congelados", value: "frozen" },
    { label: "Peixaria, Peixe", value: "fish" },
    { label: "Arroz & Massas", value: "cereal" },
    { label: "Aves, Carnes, e Cortes de Frango", value: "chicken" },
    { label: "Lacteo, Ovos e Natas", value: "lacteo" },
    { label: "Frutas, Legumes e Tuberculos", value: "vegetable" },
  ]);

  const [selectedAddress, setSelectedAddress] = useState("");

  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(BASE_URL + "/api/listings");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error rethrieving data ", error);
      }
    };
    fetchData();
  }, []);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const response = await axios.get(`${BASE_URL}/addresses/${userId}`);

      const { addresses } = response?.data;

      setLoadingAddresses(false);

      if (response?.data) {
        setAddresses(addresses);
      }
    } catch (error) {
      setLoadingAddresses(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");

      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          paddingTop: Constants.statusBarHeight + 1,
        }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <Header goBackButton={false} />

        <DeliverAddress
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedAddress={selectedAddress}
        />

        <ScrollView>
          <SliderBox
            autoPlay
            circleLoop
            dotColor="#13274F"
            inactiveDotColor="#90A4AE"
            images={images}
            imageComponentStyle={{ width: "100%" }}
          />

          <View
            style={{
              display: "flex",
              alignItems: "center",
              zIndex: 1,
              marginTop: 18,
              height: 15,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                // marginHorizontal: 10,
                width: "90%",
              }}
            >
              <DropDownPicker
                style={{
                  borderColor: "#6CE4Cf",
                  backgroundColor: "#6CE4Cf",
                  height: 5,
                  marginBottom: 15,
                  borderRadius: 20,
                  // borderTopLeftRadius: 0,
                  // borderBottomLeftRadius: 0,
                }}
                open={open}
                value={category}
                items={items}
                setOpen={setOpen}
                setValue={setCategory}
                setItems={setItems}
                placeholder="Escolha a categoria"
                // placeholderSetyle={style.placeholderSetyle}
                onOpen={onGenderOpen}
                // onChangeValue={onchange}
                zIndex={3000}
                zIndexInverse={1000}
                textStyle={{
                  fontWeight: open ? "500" : "700",
                  color: "#1f1f1f",
                  fontSize: open ? 15 : 16,
                  fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
                }}
                itemSeparator={true}
              />
            </View>
          </View>

          {loading && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: 60,
              }}
            >
              <ActivityIndicator
                style={{ alignSelf: "center" }}
                animating={loading}
                size={"large"}
              />
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <ProductsComponent
              products={products}
              loading={loading}
              category={category}
            />

            {/* {loading && <ProductComponentSckeleton />} */}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent
          style={{
            width: "100%",
            height: 400,
          }}
        >
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Escolha a sua localização
            </Text>

            <Text
              style={{
                marginTop: 5,
                fontSize: 16,
                color: "grey",
              }}
            >
              Selecione uma localização de entrega...
            </Text>
          </View>

          <>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              horizontal
              showsHorizontalScrollIndicator={true}
            >
              <AddAddress
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Adress");
                }}
              />
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                  maxHeight: 160,
                }}
              >
                {loadingAddresses && (
                  <ActivityIndicator
                    animating={loadingAddresses}
                    size={"large"}
                  />
                )}
                {!loadingAddresses &&
                  addresses?.map((item, index) => (
                    <Addresses
                      key={index}
                      item={item}
                      selectedAddress={selectedAddress}
                      setSelectedAddress={setSelectedAddress}
                    />
                  ))}
              </View>
            </ScrollView>
          </>

          <View
            style={{
              flexDirection: "column",
              gap: 7,
              marginBottom: 30,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#6CE4Cf" />
              <Text
                style={{
                  color: "#6CE4Cf",
                  fontWeight: "400",
                }}
              >
                Insira uma localização em Angola
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  title: { padding: 10, fontSize: 18, fontWeight: "bold" },
});
export default HomeScreen;
