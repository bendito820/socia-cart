import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SliderBox } from "react-native-image-slider-box";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { useSelector } from "react-redux";
import { UserType } from "../../UserContext";
import ProductItem from "../components/ProductItem";
import { deals, images, list, offers } from "./HomeScreen";

export function HomeScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("Jewelery");
  const [items, setItems] = useState([
    { label: "Men's Cloding", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  const [selectedAddress, setSelectedAddress] = useState("");
  console.log(selectedAddress);

  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error rethrieving data ", error);
      }
    };
    fetchData();
  }, []);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.26:8000/addresses/${userId}`
      );

      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");

      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#00CED1",
            padding: 10,
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: "white",
              borderRadius: 3,
              height: 38,
              flex: 1,
            }}
          >
            <AntDesign
              style={{ paddingLeft: 10 }}
              name="search1"
              size={24}
              color={"black"}
            />
            <TextInput
              style={{ width: "100%", height: "100%" }}
              placeholder="Search Amazon.in"
            />
          </Pressable>
          <Feather name="mic" size={24} color={"black"} />
        </View>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: 10,
            backgroundColor: "#AFEEEE",
          }}
        >
          <Ionicons name="location-outline" size={24} color={"black"} />
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            {selectedAddress ? (
              <Text style={{ fontSize: 13, fontWeight: "500" }}>
                Deliver to {selectedAddress?.name} - {selectedAddress?.street}
              </Text>
            ) : (
              <Text style={{ fontSize: 13, fontWeight: "500" }}>
                Add an address
              </Text>
            )}
          </Pressable>
          <MaterialIcons name="keyboard-arrow-down" size={24} color={"black"} />
        </Pressable>

        <ScrollView>
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

          <SliderBox
            autoPlay
            circleLoop
            dotColor="#13274F"
            inactiveDotColor="#90A4AE"
            images={images}
            imageComponentStyle={{ width: "100%" }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Treanding Deals of the week
          </Text>

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
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Today's deals
          </Text>
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
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              width: "45%",
              // marginBottom: open ? 50 : 15
              marginBottom: false ? 50 : 15,
              zIndex: 1,
              marginTop: 20,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                // marginBottom: genderOpen ? 120 : 15,
                marginBottom: false ? 120 : 15,
              }}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              // placeholderSetyle={style.placeholderSetyle}
              // placeholderSetyle={style.placeholderSetyle}
              onOpen={onGenderOpen}
              // onChangeValue={onchange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your location
            </Text>

            <Text
              style={{
                marginTop: 5,
                fontSize: 16,
                color: "grey",
              }}
            >
              Select a delivery location to see product availability and
              delivery optiions
            </Text>

            <ScrollView
              // style={{ backgroundColor: "red" }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {/* Already added adresses */}
              {addresses?.map((item, index) => (
                <Pressable
                  onPress={() => setSelectedAddress(item)}
                  style={{
                    width: 140,
                    height: 140,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    marginRight: 20,
                    marginTop: 10,
                    backgroundColor:
                      selectedAddress === item ? "#FBCEB1" : "#fff",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo
                      style={{ paddingLeft: 1 }}
                      name="location-pin"
                      size={24}
                      color={"red"}
                    />
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{
                      width: 130,
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    {item?.houseNo}, {item?.landmark}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      width: 130,
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    {item?.street}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      width: 130,
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    india, Banglore
                  </Text>
                </Pressable>
              ))}

              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Adress");
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  // backgroundColor: "#f0f0f0",
                  marginTop: 10,
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#0066b2",
                    fontWeight: "500",
                  }}
                >
                  Add an adress or pick-up point
                </Text>
              </Pressable>
            </ScrollView>

            <View
              style={{
                flexDirection: "column",
                gap: 7,
                marginBottom: 30,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Entypo name="location-pin" size={22} color="#0066b2" />
                <Text
                  style={{
                    color: "#0066b2",
                    fontWeight: "400",
                  }}
                >
                  Enter an Indian pincode
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Ionicons name="locate-sharp" size={22} color="#0066b2" />
                <Text
                  style={{
                    color: "#0066b2",
                    fontWeight: "400",
                  }}
                >
                  Use my current location
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <AntDesign name="earth" size={22} color="#0066b2" />
                <Text
                  style={{
                    color: "#0066b2",
                    fontWeight: "400",
                  }}
                >
                  Deliver outside of Indian
                </Text>
              </View>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
}
