import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Pressable,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

function OrderComponent({ item }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("OrderInfo", { item });
      }}
      style={{
        flexDirection: "column",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
        marginTop: 32,
        borderWidth: 1,
        borderColor: "#FBCEB1",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {item?.products?.map((product, i) => (
            <View style={{ marginHorizontal: 4 }}>
              <Image
                source={{ uri: product?.image }}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: "contain",
                }}
              />
            </View>
          ))}
        </ScrollView>

        <View style={{ justifyContent: "center", gap: 2, padding: 10 }}>
          <Text style={{ fontSize: 19, fontWeight: "600" }}>
            {item?.user?.name}
          </Text>
          <Text>{item?.shippingAddress?.mobileNo}</Text>
          <Text>{item?.shippingAddress?.houseNo}</Text>
          <Text>Codigo Postal: {item?.shippingAddress?.postalCode}</Text>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {item?.paymentMethod}
          </Text>
        </View>
      </View>
      <Text>Data: {item?.createdAt}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OrderComponent;
