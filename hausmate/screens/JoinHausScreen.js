import React, { useState } from "react";
import { StyleSheet, TextInput, Button, Text, Image, View } from "react-native";
import firebaseSvc from "../firebase";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function JoinHausScreen({ navigation }) {
  const onPressCreate = async () => {
    console.log("joining haus... hausID:" + hausID);

    navigation.navigate("MainMenuScreen");
    // try {
    //   const user = firebase.auth().currentUser;
    //   await firebaseSvc.addToHaus(user, hausID);
    // } catch ({ message }) {
    //   console.log("join haus failed. catch error:" + message);
    // }
  };

  const [hausID, setHausID] = useState();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>hausID:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={setHausID}
          placeholder={"Enter House ID"}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onPressCreate}>
        <Button title="Join Haus" color="darkorange" onPress={onPressCreate} />
      </TouchableOpacity>
    </View>
  );
}

const offset = 16;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontStyle: "italic",
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: "#111111",
    borderWidth: 1,
    fontSize: offset,
    backgroundColor: "#ffd085",
  },
  button: {
    marginTop: 50,
    marginBottom: 20,
  },
});
