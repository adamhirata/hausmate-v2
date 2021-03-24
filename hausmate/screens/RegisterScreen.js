import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, TextInput, Button, Text, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";
import firebaseSvc from "../firebase";

//import PhoneInput from "../react-phone-number-input/input";

export default function RegisterScreen({ navigation }) {
  const onPressCreate = async () => {
    console.log("create account... email:" + email);
    try {
      const user = {
        name: name,
        email: email,
        password: password,
      };

      await firebaseSvc
        .createAccount(user)
        .then(
          navigation.reset([
            NavigationActions.navigate({ routeName: "CreateJoinScreen" }),
          ])
        );
    } catch ({ message }) {
      console.log("create account failed. catch error:" + message);
    }
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

  // const onChangeTextEmail = (email) => useState({ email });
  // const onChangeTextPassword = (password) => useState({ password });
  // const onChangeTextName = (name) => setState({ name });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={setName}
          placeholder={"Enter name"}
        />
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={setEmail}
          placeholder={"Enter email"}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={setPassword}
          placeholder={"Enter password"}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onPressCreate}>
        <Button
          title="Create Account"
          color="darkorange"
          onPress={onPressCreate}
        />
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

//<img style={iconStyles} src={favicon} alt="Logo" />
