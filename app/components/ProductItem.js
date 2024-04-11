import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

function ProductItem({ item }) {
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState();
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => setAddedToCart(false), 60000);
  };

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Info", {
          id: item?.id,
          title: item?.title,
          price: item?.price,
          carouselImages: item?.images,
          description: item?.description,
          size: item?.size,
          oldPrice: item?.oldPrice,
          item: item,
        })
      }
      style={{ marginHorizontal: 20, marginVertical: 25 }}
    >
      <Image
        style={{ width: 140, height: 140, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} style={{ width: 140, marginTop: 10 }}>
        {item?.title}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {item?.price} Kz
        </Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating?.rate}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#2b5b53",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <Text style={{ color: "#fff" }}>Added to Cart</Text>
        ) : (
          <View>
            <Text style={{ color: "#fff" }}>Add to Cart</Text>
          </View>
        )}
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProductItem;
