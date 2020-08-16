import React, { useEffect, useState } from "react";
import { StyleSheet, AsyncStorage } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Button } from "react-native";
import { Text, View } from "../components/Themed";

import * as Updates from "expo-updates";

export default function TabTwoScreen(props) {
  const [token, setToken] = useState("");
  const [updateStatus, setUpdateStatus] = useState("Check for Updates");
  useEffect(() => {
    const unsubscribe = props.navigation.addListener(
      "focus",
      () => {
        AsyncStorage.getItem("token").then(setToken);
        return unsubscribe;
      },
      [props.navigation]
    );
  });
  const checkUpdate = async () => {
    setUpdateStatus("Checking...");
    try {
      const result = await Updates.checkForUpdateAsync();
      if (result.isAvailable) {
        setUpdateStatus("Updating...");
        await Updates.fetchUpdateAsync();
        setUpdateStatus("Restarting...");
        Updates.reloadAsync();
      } else {
        setUpdateStatus("Up to Date!");
        setTimeout(() => setUpdateStatus("Check for Updates"), 1000);
      }
    } catch (e) {
      setUpdateStatus("Failed - not on prod?");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.text}>Token: {token}</Text>
      <Button
        title="Edit Token"
        onPress={() => props.navigation.navigate("Token")}
      />
      <Text style={styles.title}>Updates</Text>
      <View
        style={styles.separatorSm}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        title={updateStatus}
        onPress={checkUpdate}
        style={styles.Button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    color: "white",
    marginTop: 20,
  },
  text: {
    color: "white",
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  separatorSm: {
    marginVertical: 10,
    height: 1,
    width: "70%",
    backgroundColor: "grey",
  },
  Button: {
    marginVertical: 10,
  },
});
