import React, { useState } from "react";
import {
  StyleSheet,
  RefreshControl,
  ScrollView,
  AsyncStorage,
  Modal,
  Button,
} from "react-native";
import * as Location from "expo-location";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import { Text, View } from "../components/Themed";

import ChartMinutely from "../components/ChartMinutely";
import ChartHourly from "../components/ChartHourly";
import ChartHourlyTemperature from "../components/ChartHourlyTemperature";
import Summary from "../components/Summary";
import Refresh from "../components/Refresh";
import { useEffect } from "react";
import WeeklyForecast from "../components/WeeklyForecast";

export default function TabOneScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [myLocation, setMyLocation] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("token").then((token) => {
        if (!token) navigation.navigate("Token");
        else onRefresh();
      });
    });
    return unsubscribe;
  }, [navigation]);
  const onRefresh = async () => {
    setRefreshing(true);
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted")
      return setError("Location is needed to get weather!");
    const token = await AsyncStorage.getItem("token");
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const reversed = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    const [reversedLocation] = reversed;
    const { city, street, region } = reversedLocation;
    setMyLocation(`${street} in ${city}, ${region}`);
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${token}&units=imperial`;
    console.log(url);
    const resp = await fetch(url);
    if (resp.status !== 200) return setError(await resp.text());
    setData(await resp.json());
    setRefreshing(false);
  };
  return error !== "" ? (
    <Modal>
      <Text>{error}</Text>
      <Button
        title="Close"
        onPress={() => {
          setError("");
          navigation.navigate("Token");
        }}
      />
    </Modal>
  ) : (
    <ScrollView
      alwaysBounceVertical
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {refreshing || !data.minutely ? (
        <Refresh refreshing={refreshing} />
      ) : (
        <View style={styles.View}>
          <Text style={styles.title}>Summary for {myLocation}</Text>
          <Summary data={data} />
          <WeeklyForecast data={data} />
          <Text style={styles.title}>Minutely Rain</Text>
          {data.minutely.find((d) => d.precipitation != 0) ? (
            <ChartMinutely data={data.minutely} />
          ) : (
            <Text style={styles.myLocation}>No rain in the next hour!</Text>
          )}
          <Text style={styles.title}>Hourly Rain</Text>
          <ChartHourly data={data.hourly} />
          <Text style={styles.title}>Hourly Temperature</Text>
          <ChartHourlyTemperature data={data.hourly} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: "black",
    paddingHorizontal: 10,
  },
  scrollView: {
    color: "#ffffff",
  },
  title: {
    fontSize: 20,
    color: "#f4b266",
    marginTop: 20,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  myLocation: {
    color: "white",
  },
});
