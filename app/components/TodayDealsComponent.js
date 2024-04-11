import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Image,
} from "react-native";

function TodayDealsComponent({ offers }) {
  const navigation = useNavigation();
  return (
    <>
      <Text style={styles.title}>Today's deals</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {offers.map((item, index) => (
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
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: 150, height: 150, resizeMode: "contain" }}
              source={{ uri: item?.image }}
            />
            <View
              style={{
                backgroundColor: "#E31837",
                paddingVertical: 5,
                width: 130,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                Upto {item?.offer} Off
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: { padding: 10, fontSize: 18, fontWeight: "bold" },
});

export default TodayDealsComponent;
