import React, { useEffect, useState } from "react";
import { Alert, Image, ActivityIndicator } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import loginApi from "../api/login";
import client from "../config/client";
const BASE_URL = client.baseUrl;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email é um campo obrigatório")
    .email("Insira um email válido")
    .label("Email"),
  password: Yup.string()
    .required("Password é um campo obrigatório")
    .min(4, "Palavra passe deve ter no min 5 dígitos")
    .label("Password"),
});

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (err) {
        console.log("Error", err);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async ({ email, password }) => {
    const user = {
      email: email,
      password: password,
    };

    setLoading(true);
    axios
      .post(`${BASE_URL}/login`, user)
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .then((res) => {
        setLoading(false);
        Alert.alert("Successo", "Seje bem viondo de Volta...");
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(
          "Erro ao Entrar",
          "* Verifique o seu Email e a sua Password..."
        );
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={require("../../assets/images/logo-1.png")}
        />
      </View>
      <KeyboardAvoidingView>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "800",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Entre Na Sua Conta
          </Text>
        </View>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({ handleChange, handleSubmit, errors }) => (
            <>
              <View style={{ marginTop: 70 }}>
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
                    // value={email}
                    onChangeText={handleChange("email")}
                    style={{
                      color: "grey",
                      marginVertical: 10,
                      width: 300,
                      fontSize: 16,
                    }}
                    placeholder="Inserir Email"
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
                    // value={password}
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    style={{
                      color: "grey",
                      marginVertical: 10,
                      width: 300,
                      fontSize: 16,
                    }}
                    placeholder="Inserir Password"
                    textContentType="password"
                    autoCapitalize="none"
                    autoCorrect={false}
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
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
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
                      Entrar
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
                  onPress={() => navigation.navigate("Register")}
                  style={{ marginTop: 15 }}
                >
                  <Text
                    style={{ textAlign: "center", color: "grey", fontSize: 16 }}
                  >
                    Não tem uma Conta? Criar Conta
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

export default LoginScreen;
