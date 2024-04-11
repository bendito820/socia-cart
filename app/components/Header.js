import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Text,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Header({ goBackButton = true }) {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          padding: 5,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {goBackButton && (
            <Pressable onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={48}
                color="#41897c"
              />
            </Pressable>
          )}
          <Text style={{ fontSize: 28, fontWeight: "600", color: "#41897c" }}>
            SociaCart
          </Text>
        </View>

        <Image
          source={require("../../assets/images/logo-1.png")}
          style={{ width: 60, height: 60, resizeMode: "contain" }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Header;
