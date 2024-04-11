import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../../UserContext";
import RemoveAddressButtom from "../components/RemoveAddressButtom";
import { cleanCart } from "../redux/CartReducer";

import addressesApi from "../api/addresses";

import client from "../config/client";
const BASE_URL = client.baseUrl;

function ConfirmationScreen() {
  const steps = [
    { title: "Endereço", content: "Address form" },
    { title: "Entrega", content: "Delivery Options" },
    { title: "Pagamento", content: "Delivery Options" },
    { title: "Encomendar", content: "Order Summary" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOpiton, setSelectedOption] = useState("");
  const [addressDeleted, setAddressDeleted] = useState(false);

  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   fetchAddresses();
  //   setCurrentStep(0);
  // }, []);

  useEffect(() => {
    fetchAddresses();
    setCurrentStep(0);
  }, [addressDeleted]);

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const response = await addressesApi.getAddressesByUserUd(userId);

      setLoadingAddresses(false);
      if (response?.error) {
        console.log(response.error);
        return;
      }

      setAddresses(response);
    } catch (error) {
      setLoadingAddresses(false);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOpiton,
      };

      setPlacingOrder(true);
      const response = await axios.post(`${BASE_URL}/orders`, orderData);

      setPlacingOrder(false);
      if (response.status === 200) {
        navigation.replace("Order");
        dispatch(cleanCart());
      } else {
        setPlacingOrder(false);
        Alert.alert("Error", "Não Foi Possivel Concluir a Sua Encomenda!");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 40,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps.map((step, index) => (
            <View
              key={index}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "#7f0" },
                    index <= currentStep && { backgroundColor: "#7f0" },
                  ]}
                />
              )}

              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep === 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Selecionar Endereço de Entrega
          </Text>

          <Pressable
            onPress={() => navigation.navigate("Add")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingVertical: 7,
              paddingHorizontal: 5,
            }}
          >
            <Text>Adicionar novo Endereço</Text>
            <MaterialIcons
              style={{ paddingLeft: 10 }}
              name="keyboard-arrow-right"
              size={24}
              color={"black"}
            />
          </Pressable>

          {loadingAddresses && (
            <ActivityIndicator
              style={{ paddingTop: 30 }}
              animating={loadingAddresses}
              color={"#000"}
              size={"large"}
            />
          )}

          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedAddress(item)}
                style={{
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5
                    onPress={() => setSelectedAddress(item)}
                    name="dot-circle"
                    size={20}
                    color="#008397"
                  />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAddress(item)}
                    name="circle"
                    size={20}
                    color="grey"
                  />
                )}

                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo
                      style={{ paddingLeft: 10 }}
                      name="location-pin"
                      size={24}
                      color={"red"}
                    />
                  </View>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.houseNo}, {item.landmark}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.street}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Angola, Luanda
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    phone No : {item?.mobileNo}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    pin code : {item?.postalCode}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 7,
                    }}
                  >
                    <RemoveAddressButtom
                      addressId={item?._id}
                      addressDeleted={addressDeleted}
                      setAddressDeleted={setAddressDeleted}
                    />
                  </View>

                  <View>
                    {selectedAddress && selectedAddress._id === item?._id ? (
                      <TouchableOpacity
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: "#008397",
                          padding: 12,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          Entregar Neste Endereço
                        </Text>
                      </TouchableOpacity>
                    ) : undefined}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep === 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Escolha Sua Opção de Entrega
          </Text>

          <Pressable
            onPress={() => setOption(!option)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {option ? (
              <FontAwesome5
                onPress={() => setSelectedAddress(item)}
                name="dot-circle"
                size={20}
                color="#008397"
              />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={20}
                color="grey"
              />
            )}
            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                Amanhã dentro de 24h.
              </Text>
              <Text> - Entrega ao Domicílio</Text>
            </Text>
          </Pressable>

          {option && (
            <TouchableOpacity
              onPress={() => setCurrentStep(2)}
              style={{
                backgroundColor: "#2b5b53",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text style={{ color: "#fff" }}>Continuar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {currentStep === 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Escolha Seu Método de Pagamento
          </Text>

          <Pressable
            onPress={() => setSelectedOption("cash")}
            style={{
              backgroundColor: "white",
              padding: 8,
              borderRadius: 25,
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOpiton === "cash" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={20}
                color="grey"
              />
            )}

            <Text>Dinheiro na Entrage</Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedOption("card")}
            style={{
              backgroundColor: "#fff",
              padding: 8,
              borderRadius: 25,
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOpiton === "card" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("card")}
                name="circle"
                size={20}
                color="grey"
              />
            )}

            <Text>TPA / Express</Text>
          </Pressable>

          {selectedOpiton && (
            <Pressable
              onPress={() => setCurrentStep(3)}
              style={{
                backgroundColor: "#2b5b53",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text style={{ color: "#fff" }}>Continuar</Text>
            </Pressable>
          )}
        </View>
      )}

      {currentStep === 3 && selectedOpiton && (
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Encomendar Agora
          </Text>

          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              backgroundColor: "white",
              padding: 0,
              borderColor: "#D0D0D0",
              borderEndWidth: 1,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Save 5% and never rum out
              </Text>
              <Text style={{ fontSize: 15, color: "grey", marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View> */}

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>Entregando à {selectedAddress?.name}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
                Items
              </Text>

              <Text style={{ fontSize: 16, color: "grey" }}>{total} Kz</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
                Entrega
              </Text>

              <Text style={{ fontSize: 16, color: "grey" }}>1500Kz</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "800", color: "grey" }}>
                Encomenda Total
              </Text>

              <Text
                style={{ fontSize: 17, color: "#C60C30", fontWeight: "bold" }}
              >
                AOA {total}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "grey" }}>
              Método de Pagamento:
            </Text>

            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
              Pagar Na Entrega (
              {selectedOpiton === "card" ? "Cartão" : "Dinheiro"})
            </Text>
          </View>

          <Pressable
            disabled={placingOrder}
            onPress={handlePlaceOrder}
            style={{
              backgroundColor: "#2b5b53",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#fff" }}>
              Concluir Encomenda{" "}
              {<ActivityIndicator animating={placingOrder} color={"#fff"} />}
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

export default ConfirmationScreen;
