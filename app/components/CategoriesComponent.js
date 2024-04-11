import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Text,
} from "react-native";

function CategoriesComponent({ list }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {list.map((item, index) => (
        <Pressable
          key={index}
          style={{
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50, resizeMode: "contain" }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: "500",
              marginTop: 5,
            }}
          >
            {item?.name}
          </Text>
        </Pressable>
      ))}

      <Image
        source={{ uri: list[0].image }}
        height={20}
        width={25}
        resizeMode="contain"
      />
    </ScrollView>
  );
}

export default CategoriesComponent;
