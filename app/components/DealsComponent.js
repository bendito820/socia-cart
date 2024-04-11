import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";

function DealsComponent({ deals }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {deals.map((item, index) => (
        <Pressable
          onPress={() =>
            navigation.navigate("Info", {
              id: item.id,
              title: item.title,
              price: item.price,
              carouselImages: item.carouselImages,
              color: item?.color,
              size: item.size,
              oldPrice: item?.oldPrice,
              item: item,
            })
          }
          key={index}
          style={{
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 180, height: 180, resizeMode: "contain" }}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DealsComponent;
