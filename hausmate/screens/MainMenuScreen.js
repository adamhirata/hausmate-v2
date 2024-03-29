import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
} from "react-native";

export default function MainMenuScreen({ navigation }) {
  const onPressChat = async () => {
    navigation.navigate("ChatTool");
  };

  const onPressTodo = async () => {
    navigation.navigate("TodoList");
  };

  const onPressCalendar = async () => {
    navigation.navigate("CalendarScreen");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.shadow, { color: "white" }]}>
        Haus Code: OS125
      </View>
      <ScrollView
        style={{ alignSelf: "stretch" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={[styles.name, styles.shadow1]}>
          Welcome To Finals Week
        </Text>
        <TouchableOpacity onPress={onPressChat}>
          <Image
            style={styles.logo}
            source={require("../assets/joinHaus.png")}
          />
          Haus Chat
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTodo}>
          <Image style={styles.logo} source={require("../assets/todo.png")} />
          To-do Lists
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressCalendar}>
          <Image
            style={styles.logo}
            source={require("../assets/Calendar.png")}
          />
          Calendar
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    fontSize: 20,
    fontStyle: "italic",
    overflow: "scroll",
  },
  header: {
    alignSelf: "stretch",
    height: 100,
    backgroundColor: "darkorange",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2.0,
    shadowRadius: 4.0,
    overflow: "visible",
  },
  shadow1: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.0,
    overflow: "visible",
  },
  name: {
    textAlign: "center",
    width: "85%",
    maxWidth: 600,
    fontSize: 40,
    padding: 7,
    borderWidth: 7,
    borderColor: "darkorange",
    backgroundColor: "#ffd085",
    fontFamily: "Arial",
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 30,
  },
  box: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "darkorange",
    width: 350,
    backgroundColor: "#ffd085",
  },
  icon: {
    borderWidth: 7,
    borderColor: "darkorange",
    backgroundColor: "#ffd085",
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  widget: {
    borderWidth: 7,
    padding: 7,
    borderColor: "darkorange",
    backgroundColor: "#ffd085",
    width: 300,
    marginBottom: 30,
    marginTop: 30,
  },
  text: {
    paddingTop: 20,
    fontSize: 17,
  },
  indented: {
    paddingLeft: 20,
    fontSize: 20,
  },
  logo: {
    width: 125,
    height: 125,
  },
});

//<img style={iconStyles} src={favicon} alt="Logo" />
