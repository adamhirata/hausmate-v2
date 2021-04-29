import React, { useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { InputLabel, FormControl, Input } from "@material-ui/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";
import firebaseSvc from "../firebase";

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

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  return (
    <View style={styles.container}>
      <View>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input type="text" value={name} onChange={handleName} />
        </FormControl>
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
