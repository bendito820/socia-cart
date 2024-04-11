import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import ProductItem from "./ProductItem";

function ProductsComponent({ products, category }) {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: 364,
        }}
      >
        {products
          ?.filter((item) => item.category === category)
          ?.map((item, index) => (
            <Pressable key={index}>
              <ProductItem item={item} key={index} />
            </Pressable>
          ))}
        {category === "" &&
          products
            // ?.filter((item) => item.category === category)
            ?.map((item, index) => (
              <Pressable key={index}>
                <ProductItem item={item} key={index} />
              </Pressable>
            ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProductsComponent;
