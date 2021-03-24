import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import firebaseSvc from "../firebase";

export default function LoadingScreen({ navigation }) {
  const checkIfLoggedIn = () => {
    firebaseSvc.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("LogoScreen");
      } else {
        navigation.navigate("LoginScreen");
      }
    });
  };

  checkIfLoggedIn();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "orange",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      fontStyle: "italic",
    },
    logo: {
      width: 125,
      height: 125,
    },
    text: {
      paddingTop: 20,
      fontSize: 17,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}
