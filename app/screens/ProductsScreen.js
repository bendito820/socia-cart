import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import colors from "../config/colors";
import Screen from "../components/Screen";
import { View } from "react-native";

const products = [
  {
    id: "1",
    name: "Bebuchito's",
    description: "O unico da banda",
    price: 1500,
  },
  {
    id: "2",
    name: "Xtrabica",
    description: "O sabor iconico da banda",
    price: 500,
  },
];

function ProductsScreen({}) {
  return (
    <>
      {/* <ActivityIndicator visible={loading} /> */}
      <View style={styles.screen}>
        <Text>Heelo World</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
    // backgroundColor: "#fff",
  },
});

export default ProductsScreen;
