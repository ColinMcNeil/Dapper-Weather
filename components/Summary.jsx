import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const prettyPrintTime = (date) => {
  let time = new Date(date.dt * 1000).toLocaleTimeString();
  const day = new Date(date.dt * 1000).getDay();
  let hours = parseInt(time.split(":")[0]);
  const minutes = parseInt(time.split(":")[1]);
  const pm = hours > 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  return days[day] + " " + hours + ":" + minutes + pm;
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
});

export default ({ data }) => {
  return (
    <View style={styles.view}>
      {data.current.weather.map((w) => (
        <Text
          key={"main-" + w.id}
          style={{ ...styles.text, textTransform: "capitalize", fontSize: 20 }}
        >
          {w.description}
        </Text>
      ))}
      <Text style={styles.text}>
        Weather Loaded: {prettyPrintTime(data.current)}
      </Text>
      <Text style={styles.text}>Feels like: {data.current.feels_like}F</Text>
      <Text style={styles.text}>
        Wind: {data.current.wind_speed} MPH w/ {data.current.wind_gust} MPH
        gusts
      </Text>
    </View>
  );
};
