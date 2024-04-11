import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";

import AddAdressScreen from "../app/screens/AddAdressScreen";
import AddressScreen from "../app/screens/AddressScreen";
import CartScreen from "../app/screens/CartScreen";
import ConfirmationScreen from "../app/screens/ConfirmationScreen";
import DeliverScreen from "../app/screens/DeliverScreen";
import HomeScreen from "../app/screens/HomeScreen";
import LoginScreen from "../app/screens/LoginScreen";
import OrderInfoScreen from "../app/screens/OrderInfoScreen";
import OrderScreen from "../app/screens/OrderScreen";
import ProductInfoScreen from "../app/screens/ProductInfoScreen";
import ProfileScreen from "../app/screens/ProfileScreen";
import RegisterScreen from "../app/screens/RegisterScreen";

import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import useCart from "../app/hooks/useCart";
import OrderHistoryScreen from "../app/screens/OrderHistoryScreen";

function StackNavigator(props) {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();
  // const cart = useSelector((state) => state.cart.cart);

  function Bottontabs() {
    const cart = useCart();

    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#6CE4Cf" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color={"#6CE4Cf"} />
              ) : (
                <AntDesign name="home" size={24} color={"#6CE4Cf"} />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Perfil",
            tabBarLabelStyle: { color: "#6CE4Cf" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color={"#6CE4Cf"} />
              ) : (
                <Ionicons name="person-outline" size={24} color={"#6CE4Cf"} />
              ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: `Carrinho`,
            tabBarLabelStyle: { color: "#6CE4Cf" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <>
                  {cart.length > 0 && (
                    <View
                      style={{
                        backgroundColor: "#41897c",
                        position: "absolute",
                        top: 4,
                        right: "30%",
                        borderRadius: 100,
                        width: 14,
                        height: 14,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {cart.length}
                      </Text>
                    </View>
                  )}
                  <AntDesign name="shoppingcart" size={24} color={"#6CE4Cf"} />
                </>
              ) : (
                <>
                  {cart.length > 0 && (
                    <View
                      style={{
                        backgroundColor: "#41897c",
                        position: "absolute",
                        top: 4,
                        right: "30%",
                        borderRadius: 100,
                        width: 14,
                        height: 14,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {cart.length}
                      </Text>
                    </View>
                  )}
                  <AntDesign name="shoppingcart" size={24} color={"#6CE4Cf"} />
                </>
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Bottontabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Adress"
          component={AddAdressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Deliver"
          component={DeliverScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderInfo"
          component={OrderInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={OrderHistoryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
