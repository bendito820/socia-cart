import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import "core-js/stable/atob";
import jwt_decode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { UserType } from "../../UserContext";
import Header from "../components/Header";

import client from "../config/client";
const BASE_URL = client.baseUrl;

import { Formik } from "formik";
import * as Yup from "yup";

const message = "* Campo obrigatório";

const AddressValidationSchema = Yup.object().shape({
  name: Yup.string().required(message),
  mobileNo: Yup.string().required(message).min(9, "* Insira um Nº Tel. Válio"),
  houseNo: Yup.string().required(message),
  street: Yup.string().required(message),
  landmark: Yup.string().required(message),
  postalCode: Yup.string().required(message),
});

const initialValues = {
  name: "",
  mobileNo: "",
  houseNo: "",
  street: "",
  landmark: "",
  postalCode: "",
};

function AddressScreen(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");

      console.log("Token: " + token);

      const decodedToken = jwt_decode(token);
      console.log("Decoded Token: " + decodedToken);

      const userId = decodedToken.userId;
      console.log("User Id: " + userId);

      setUserId(userId);
    };

    fetchUser();
  }, []);

  const handleAddAddress = async ({
    name,
    mobileNo,
    houseNo,
    street,
    landmark,
    postalCode,
  }) => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };

    console.log("User Id: " + userId);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://socia-cart-api-v1.onrender.com/addresses",
        {
          userId,
          address,
        }
      );
      setLoading(false);
      Alert.alert("Successo", "Endereço adicionado com successo!");
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Não Foi Possivel adicionar endereço");
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          paddingTop: Constants.statusBarHeight + 1,
        }}
      />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles?.inputContainer}>
          <Formik
            initialValues={initialValues}
            // onSubmit={(values) => {
            //   alert("Here");
            //   alert(values.name);
            //   // handleAddAddress(values);
            // }}
            onSubmit={handleAddAddress}
            validationSchema={AddressValidationSchema}
          >
            {({ handleChange, handleSubmit, errors, handleReset }) => (
              <>
                <Text style={styles?.label}>Adicione um Endereço Novo</Text>
                <AppTextInput
                  placeholderTextColor={"black"}
                  placeholder="Angola"
                />

                <View style={styles?.inputContainer}>
                  <Text style={styles.label}>
                    Nome Completo (Primeiro/Último Nome)
                  </Text>
                  <AppTextInput
                    onChangeText={handleChange("name")}
                    placeholder="Insira Seu Nome"
                    autoCapitalize="words"
                    autoCorrect={false}
                    keyboardType="name"
                    textContentType="name"
                  />
                  <ErrorMessage errors={errors.name} />
                </View>

                <View style={styles?.inputContainer}>
                  <Text style={styles?.label}>Número de Telefone</Text>
                  <AppTextInput
                    onChangeText={handleChange("mobileNo")}
                    placeholder="Nº Tel."
                  />
                  <ErrorMessage errors={errors.mobileNo} />
                </View>

                <View style={styles?.inputContainer}>
                  <Text style={styles.label}>
                    Número de Casa, Edificio, Compania
                  </Text>
                  <AppTextInput
                    onChangeText={handleChange("houseNo")}
                    placeholder=""
                  />
                  <ErrorMessage errors={errors.houseNo} />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles?.label}>Rua, Area, Municipio</Text>
                  <AppTextInput
                    onChangeText={handleChange("street")}
                    placeholder=""
                  />
                  <ErrorMessage errors={errors.street} />
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    ...styles.inputContainer,
                  }}
                >
                  <Text style={styles?.label}>Ponto de Referência</Text>
                  <AppTextInput
                    onChangeText={handleChange("landmark")}
                    placeholder="Ex. Proximo ao Hospital do Luanda Sul"
                  />
                  <ErrorMessage errors={errors.landmark} />
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    ...styles.inputContainer,
                  }}
                >
                  <Text style={styles.label}>Código Postal</Text>
                  <AppTextInput
                    onChangeText={handleChange("postalCode")}
                    placeholder="Inserir Código Postal"
                  />
                  <ErrorMessage errors={errors.postalCode} />
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: "#ffc72c",
                    padding: 19,
                    borderRadius: 6,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 30,
                  }}
                >
                  {!loading && (
                    <Text style={{ fontWeight: "800", color: "white" }}>
                      Adicionar Endereço
                    </Text>
                  )}

                  {loading && (
                    <ActivityIndicator
                      size={"large"}
                      animating={loading}
                      color={"#fff"}
                    />
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: { fontSize: 15, fontWeight: "bold" },
  inputContainer: { padding: 10 },
});

const AppTextInput = ({
  value,
  onChangeText,
  placeholder,
  style,
  ...props
}) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholderTextColor={"black"}
    placeholder={placeholder}
    style={{
      padding: 10,
      borderColor: "#D0D0D0",
      borderWidth: 1,
      marginTop: 10,
      borderRadius: 5,
      ...style,
    }}
    {...props}
  />
);

const ErrorMessage = ({ errors }) => (
  <>{errors && <Text style={{ color: "red", fontSize: 11 }}>{errors}</Text>}</>
);

export default AddressScreen;
