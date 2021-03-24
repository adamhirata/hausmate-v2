import { StatusBar } from "expo-status-bar";
import React from "react";
import { TouchableOpacity, StyleSheet, Image, Text, View } from "react-native";

export default function CreateJoinScreen({ navigation }) {
  const onPressCreate = () => {
    navigation.navigate("CreateHausScreen");
  };

  const onPressJoin = () => {
    navigation.navigate("JoinHausScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressCreate}>
        <Image
          style={styles.logo}
          source={require("../assets/createHaus.png")}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Create a Haus</Text>
      <Text style={styles.text}></Text>
      <TouchableOpacity onPress={onPressJoin}>
        <Image style={styles.logo} source={require("../assets/joinHaus.png")} />
      </TouchableOpacity>
      <Text style={styles.text}>Join a Haus</Text>
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
  },
  text: {
    paddingTop: 20,
    fontSize: 17,
  },
});
