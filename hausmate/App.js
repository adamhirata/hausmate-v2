import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainMenuScreen from "./screens/MainMenuScreen";
import CreateJoinScreen from "./screens/CreateJoinScreen";
import CreateHausScreen from "./screens/CreateHausScreen";
import JoinHausScreen from "./screens/JoinHausScreen";
import LogoScreen from "./screens/LogoScreen";
import LoadingScreen from "./screens/LoadingScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ChatTool from "./screens/ChatTool";

const changeScreen = (navigation) => {
  console.log("test");
};

//Stack Navigator Stuffs

const screens = {
  //LoadingScreen: { screen: LoadingScreen, navigationOptions: { header: null } },
  CalendarScreen: {
    screen: CalendarScreen,
    navigationOptions: { headerStyle: { backgroundColor: "darkorange" } },
  },
  LogoScreen: { screen: LogoScreen, navigationOptions: { header: null } },
  RegisterScreen: { screen: RegisterScreen },
  LoginScreen: { screen: LoginScreen },
  JoinHausScreen: { screen: JoinHausScreen },
  CreateJoinScreen: { screen: CreateJoinScreen },
  CreateHausScreen: { screen: CreateHausScreen },
  ChatTool: { screen: ChatTool },
  MainMenuScreen: {
    screen: MainMenuScreen,
    navigationOptions: { header: null },
  },
};
const Stack = createStackNavigator(screens);
const Navigator = createAppContainer(Stack);

export default function App() {
  return <Navigator />;
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
  },
  text: {
    paddingTop: 20,
    fontSize: 17,
  },
});
