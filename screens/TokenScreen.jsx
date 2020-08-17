import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AsyncStorage,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

import { AdMobRewarded } from "expo-ads-admob";

export default function TokenScreen({ navigation }) {
  const [tempToken, setTempToken] = useState("");
  const [adText, setAdText] = useState("Watch an ad to get a token");
  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) navigation.navigate("Root");
  };
  const submitToken = async () => {
    await AsyncStorage.setItem("token", tempToken);
    checkToken();
  };
  const getToken = async () => {
    setAdText("Loading ad...");
    AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () => {
      setAdText("Rewarding token...");
      AsyncStorage.setItem(
        "token",
        "56c8ba12c306cbca52db40e7b300d369"
      ).then(() => navigation.navigate("Root"));
    });
    await AdMobRewarded.setAdUnitID("ca-app-pub-3310317900579840/8807467347");
    await AdMobRewarded.requestAdAsync();
    setAdText("Ad loaded");
    await AdMobRewarded.showAdAsync();
  };

  // const token = await AsyncStorage.getItem('token')
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Text style={styles.Text}>Weather Token</Text>
      <Text style={styles.Text}>
        Dapper Weather depends on the Open Weather API. Make an account and get
        an API key
      </Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Enter Token"
        onChangeText={setTempToken}
      />
      <Button
        style={styles.Button}
        title="Submit Token"
        onPress={submitToken}
      />
      <Text style={styles.Text}>OR</Text>
      <Button style={styles.Button} title={adText} onPress={getToken} />
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    color: "white",
    marginVertical: 10,
  },
  TextInput: {
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    color: "white",
    padding: 10,
    margin: 10,
    width: 250,
  },
  SafeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    fontSize: 20,
  },
});
