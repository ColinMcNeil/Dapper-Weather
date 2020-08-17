import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

import { prettyPrintTime, prettyPrintWeather } from "../constants/Translations";

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#68A691",
    padding: 15,
    marginVertical: 10,
  },
  text: {
    color: "white",
  },
});

export default ({ data }) => {
  return (
    <View style={styles.view}>
      {data.current.weather.map((w, i) => (
        <Text key={"main-" + w.id} style={{ ...styles.text, fontSize: 20 }}>
          {prettyPrintWeather(w.description)}
        </Text>
      ))}
      <Text style={styles.text}>
        Weather Loaded: {prettyPrintTime(data.current.dt)}
      </Text>
      <Text style={styles.text}>Feels like: {data.current.feels_like}F</Text>
      <Text style={styles.text}>
        Wind: {Math.round(data.current.wind_speed)}MPH w/{" "}
        {data.current.wind_gust || 1}MPH gusts
      </Text>
    </View>
  );
};
