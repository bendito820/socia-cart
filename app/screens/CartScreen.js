import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";

function CartScreen(props) {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    ?.reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();

  const incriseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#fff",
          paddingTop: Constants.statusBarHeight + 1,
        }}
      />

      <Header goBackButton={false} />

      <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 19, fontWeight: "400" }}>Subtotal : </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total} Kz</Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>Detalhes do Carrinho</Text>

      {cart.length > 0 && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Confirm")}
          style={{
            backgroundColor: "#2b5b53",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff" }}>
            Continuar Compra ({cart.length}) item(s)
          </Text>
        </TouchableOpacity>
      )}

      <Text style={{ height: 1, borderColor: "#D0D0D0" }}></Text>

      <View style={{ marginHorizontal: 10 }}>
        {cart?.map((item, index) => (
          <View
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              borderBottomColor: "#F0F0F0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
            key={index}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Image
                  style={{ width: 140, resizeMode: "contain", height: 140 }}
                  source={{ uri: item?.image }}
                />
              </View>

              <View>
                <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                  {item?.title}
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                >
                  {item?.price} kz
                </Text>

                <Image
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text style={{ color: "green" }}>In Stock</Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                marginTop: 15,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                {item?.quantity > 1 ? (
                  <Pressable
                    onPress={() => decreaseQuantity(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="minus" size={24} color="#000" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="delete" size={24} color="#000" />
                  </Pressable>
                )}

                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>

                <Pressable
                  onPress={() => incriseQuantity(item)}
                  style={{
                    backgroundColor: "#D8D8D8",
                    padding: 7,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <Feather name="plus" size={24} color="#000" />
                </Pressable>
              </View>

              <Pressable
                onPress={() => deleteItem(item)}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>Apagar</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CartScreen;
