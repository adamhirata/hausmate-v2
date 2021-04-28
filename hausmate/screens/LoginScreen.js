import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View, Button } from "react-native";
import { InputLabel, FormControl, Input } from "@material-ui/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";
import firebaseSvc from "../firebase";

export default function LoginScreen({ navigation }) {
  const register = () => {
    navigation.navigate("RegisterScreen");
  };

  const onPressLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    navigation.reset([
      NavigationActions.navigate({ routeName: "MainMenuScreen" }),
    ]);
    //firebaseSvc.login(user, loginSuccess, loginFailed);
  };

  const loginSuccess = () => {
    console.log("login successful, navigate to chat.");
    navigation.reset([
      NavigationActions.navigate({ routeName: "MainMenuScreen" }),
    ]);
  };

  const loginFailed = () => {
    alert("Login failure. Please try again.");
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <View style={styles.container}>
      <View>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input type="text" value={email} onChange={handleEmail} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <Input
            id="filled-adornment-password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </FormControl>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPressLogin}>
        <Button title="Login" color="darkorange" onPress={onPressLogin} />
      </TouchableOpacity>
      <TouchableOpacity
        style={(styles.button, { marginTop: 0, backgroundColor: "darkorange" })}
        onPress={register}
      >
        <Button title="Register" color="orange" onPress={register} />
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
    backgroundColor: "#964000",
  },
});

/*
<TextInput
        style={styles.nameInput}
        onChangeText={onChangeTextName}
        value={state.name}
      />
      <Button
        title="Create Account"
        style={styles.buttonText}
        onPress={onPressCreate}
      />
      <Button
        title="Upload Avatar Image 2"
        style={styles.buttonText}
        onPress={onImageUpload}
      />
*/
