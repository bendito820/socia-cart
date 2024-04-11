import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import axios from "axios";

// import client from '../config/client'

import { Formik } from "formik";
import * as Yup from "yup";

import { useNavigation } from "@react-navigation/native";

import registerApi from "../api/register";

import client from "../config/client";
const BASE_URL = client.baseUrl;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é um campo obrigatório"),
  email: Yup.string()
    .required("Email é um campo obrigatório")
    .email("Insira um email válido")
    .label("Email"),
  password: Yup.string()
    .required("Password é um campo obrigatório")
    .min(4, "Palavra passe deve ter no min 5 dígitos")
    .label("Password"),
});

function RegisterScreen(props) {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleRegister = async ({ name, email, password }) => {
    const user = new Object({
      name: name,
      email: email,
      password: password,
    });

    setLoading(true);

    // send post request to the backend
    axios
      .post(`${client.baseUrl}/register`, user)
      .then((res) => {
        setLoading(false);
        Alert.alert("Successo", "O seu Registro foi Concluido Com successo!");
        1;
        navigation.replace("Main");
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(
          "Erro ao Registrar",
          "* Email já Foi utilizado para criar uma Conta..."
        );
        console.log("Registration Failed", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={{ width: 150, height: 150, resizeMode: "contain" }}
          source={require("../../assets/images/logo-1.png")}
        />
      </View>
      <KeyboardAvoidingView>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values) => {
            handleRegister(values);
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, handleReset }) => (
            <>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "800",
                    marginTop: 0,
                    color: "#041E42",
                  }}
                >
                  Criar Uma Conta!
                </Text>
              </View>

              <View style={{ marginTop: 50 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    backgroundColor: "#D0D0D0",
                    padding: 5,
                    borderRadius: 5,
                    marginTop: 3,
                  }}
                >
                  <Ionicons
                    style={{ marginLeft: 8 }}
                    name="ios-person"
                    size={24}
                    color={"grey"}
                  />
                  <TextInput
                    onChangeText={handleChange("name")}
                    style={{
                      color: "grey",
                      marginVertical: 10,
                      width: 300,
                      fontSize: 16,
                    }}
                    placeholder="Inserir Nome"
                    autoCapitalize="words"
                    autoCorrect={false}
                    textContentType="name"
                  />
                </View>
                {errors.name && (
                  <Text style={{ color: "red" }}>{errors.name}</Text>
                )}
              </View>

              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    backgroundColor: "#D0D0D0",
                    padding: 5,
                    borderRadius: 5,
                    marginTop: 30,
                  }}
                >
                  <MaterialIcons
                    style={{ marginLeft: 8 }}
                    name="email"
                    size={24}
                    color={"grey"}
                  />
                  <TextInput
                    onChangeText={handleChange("email")}
                    style={{
                      color: "grey",
                      marginVertical: 10,
                      width: 300,
                      fontSize: 16,
                    }}
                    placeholder="Inserir Email"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                  />
                </View>
                {errors.email && (
                  <Text style={{ color: "red" }}>{errors.email}</Text>
                )}
              </View>

              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    backgroundColor: "#D0D0D0",
                    padding: 5,
                    borderRadius: 5,
                    marginTop: 30,
                  }}
                >
                  <AntDesign
                    style={{ marginLeft: 8 }}
                    name="lock"
                    size={24}
                    color={"grey"}
                  />
                  <TextInput
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    style={{
                      color: "grey",
                      marginVertical: 10,
                      width: 300,
                      fontSize: 16,
                    }}
                    placeholder="inserir Password"
                  />
                </View>
                {errors.password && (
                  <Text style={{ color: "red" }}>{errors.password}</Text>
                )}
              </View>

              <View
                style={{
                  marginTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* <Text> Keep me logged in</Text> */}

                {/* <Text style={{ color: "#007FFF" }}> Forgot Password</Text> */}
              </View>

              <View style={{ marginTop: 80 }}>
                <Pressable
                  disabled={loading}
                  onPress={handleSubmit}
                  style={{
                    width: 200,
                    backgroundColor: "#FEbE10",
                    borderRadius: 6,
                    marginLeft: "auto",
                    marginRight: "auto",
                    padding: 15,
                  }}
                >
                  {!loading && (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#fff",
                      }}
                    >
                      Registrar
                    </Text>
                  )}

                  {loading && (
                    <ActivityIndicator
                      color={"#fff"}
                      animating={loading}
                      size={"small"}
                    />
                  )}
                </Pressable>

                <Pressable
                  onPress={() => navigation.goBack()}
                  style={{ marginTop: 15 }}
                >
                  <Text
                    style={{ textAlign: "center", color: "grey", fontSize: 16 }}
                  >
                    Já tem uma conta? Entra Agora
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default RegisterScreen;
