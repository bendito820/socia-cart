import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  ImageBackground,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import Header from "../components/Header";
import constants from "expo-constants";

function ProductInfoScreen(props) {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();

  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;

  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => setAddedToCart(false), 60000);
  };

  const cart = useSelector((state) => state.cart.cart);

  console.log(cart);

  return (
    <>
      <View
        style={{
          height: constants.statusBarHeight,
          backgroundColor: "#ec9301",
          backgroundColor: "#fff",
        }}
      />
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route?.params?.carouselImages?.map((item, index) => (
            <ImageBackground
              style={{ width, height, marginTop: 25, resizeMode: "contain" }}
              source={{ uri: item?.url }}
              key={index}
            >
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#E0E0E0",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color={"white"}
                  />
                </View>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginTop: "auto",
                  marginLeft: 20,
                  marginBottom: 20,
                }}
              >
                <AntDesign name="hearto" size={24} color={"white"} />
              </View>
            </ImageBackground>
          ))}
        </ScrollView>

        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {route?.params?.title}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
            AOA {route?.params?.price}
          </Text>
        </View>

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 10,
          }}
        >
          <Text>Descrição: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.description}
          </Text>
        </View>

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
            Total: {route?.params?.price} Kz
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => addItemToCart(route?.params?.item)}
          style={{
            backgroundColor: "#2b5b53",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          {addedToCart ? (
            <Text style={{ color: "#fff" }}>Adicionado ao Carrinho</Text>
          ) : (
            <View>
              <Text style={{ color: "#fff" }}>Adicionar ao Carrinho</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart");
            addItemToCart(route?.params?.item);
          }}
          style={{
            backgroundColor: "#41897c",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "#fff" }}>Comprar Agora</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProductInfoScreen;
