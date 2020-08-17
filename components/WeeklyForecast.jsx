import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  Animated,
} from "react-native";
const styles = StyleSheet.create({
  dayPopup: {
    backgroundColor: "rgba(0,0,0,0.85)",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  Text: {
    color: "white",
    margin: 5,
  },
  TextMed: {
    fontSize: 16,
  },
  TextBig: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    flexBasis: "100%",
    margin: 5,
    marginVertical: 8,
    color: "#ABEDC6",
  },
  dayPopupButton: {
    flexBasis: "100%",
    backgroundColor: "grey",
    padding: 10,
    justifyContent: "center",
    marginVertical: 10,
  },
  dayPopupButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  dayView: {
    borderColor: "#B9FFB7",
    borderWidth: 2,
    elevation: 5,
    padding: 5,
    margin: 4,
    flexGrow: 1,
    flexShrink: 1,
  },
});

import { prettyPrintDay, prettyPrintWeather } from "../constants/Translations";
import { useState } from "react";
import { Easing } from "react-native";
export default ({ data, navigation }) => {
  const [modalOpacity] = useState(new Animated.Value(0));
  const forecast = data.daily.slice(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const select = async (day) => {
    setSelectedDay(day);
    Animated.timing(modalOpacity, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };
  const close = () => {
    Animated.timing(modalOpacity, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => setSelectedDay(null));
  };
  return (
    <View style={styles.container}>
      {selectedDay ? (
        <Modal transparent onRequestClose={close}>
          <Animated.View style={{ ...styles.dayPopup, opacity: modalOpacity }}>
            <Text style={styles.TextBig}>{prettyPrintDay(selectedDay.dt)}</Text>
            <Text style={styles.TextBig}>Temperature</Text>
            <Text style={[styles.Text, styles.TextMed]}>
              Morning: {selectedDay.feels_like.morn}°F
            </Text>
            <Text style={[styles.Text, styles.TextMed]}>
              Daytime: {selectedDay.feels_like.day}°F
            </Text>
            <Text style={[styles.Text, styles.TextMed]}>
              Evening: {selectedDay.feels_like.eve}°F
            </Text>
            <Text style={[styles.Text, styles.TextMed]}>
              Night: {selectedDay.feels_like.night}°F
            </Text>
            <Text style={styles.TextBig}>Weather</Text>
            <Text style={[styles.Text, styles.TextMed]}>
              Humidity: {selectedDay.humidity}%
            </Text>
            <Text style={[styles.Text, styles.TextMed]}>
              Wind: {selectedDay.wind_speed}MPH
            </Text>
            <TouchableOpacity style={styles.dayPopupButton} onPress={close}>
              <Text
                style={[
                  [styles.Text, styles.TextMed],
                  styles.dayPopupButtonText,
                ]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Modal>
      ) : null}
      {forecast.map((day, i) => (
        <TouchableOpacity
          style={styles.dayView}
          key={`daily-forecast-${i}`}
          onPress={() => select(day)}
        >
          <Text style={{ ...styles.TextBig, fontWeight: "bold" }}>
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
        </TouchableOpacity>
      ))}
    </View>
  );
};
