import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Image, Text, View, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";

export default function LogoScreen({ navigation }) {
  const handleNavigation = () => {
    navigation.reset([
      NavigationActions.navigate({ routeName: "LoginScreen" }),
    ]);
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 25, marginBottom: 20 }}>
        Welcome to Hausmate
      </Text>
      <Text style={{ color: "white", fontSize: 20, marginBottom: 50 }}>
        The app for house mates
      </Text>
      <Image style={styles.logo} source={require("../assets/favicon.png")} />
      <TouchableOpacity style={styles.button} onPress={handleNavigation}>
        <Button
          title="Get Started"
          color="darkorange"
          onPress={handleNavigation}
        />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 4.0,
    overflow: "visible",
  },
  button: {
    marginTop: 50,
  },
});

//<img style={iconStyles} src={favicon} alt="Logo" />
