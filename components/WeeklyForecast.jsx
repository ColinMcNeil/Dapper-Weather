import React from "react";
import {
  FlatList,
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
} from "react-native";
const styles = StyleSheet.create({
  Text: {
    color: "white",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  dayView: {
    backgroundColor: "#320D6D",
    padding: 5,
    margin: 4,
    flexGrow: 1,
    flexShrink: 1,
  },
});

import { prettyPrintDay, prettyPrintWeather } from "../constants/Translations";
export default ({ data }) => {
  const forecast = data.daily.slice(1);
  return (
    <View style={styles.container}>
      {forecast.map((day, i) => (
        <View style={styles.dayView} key={`daily-forecast-${i}`}>
          <Text style={{ ...styles.Text, fontWeight: "bold" }}>
            {prettyPrintDay(day.dt, true)}
          </Text>
          <Text style={styles.Text}>
            {Math.floor(parseFloat(day.feels_like.day))}°F
          </Text>
          {day.weather.map((w) => (
            <Text style={styles.Text} key={`weather-${i}-${w.id}`}>
              {prettyPrintWeather(w.description)}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};
