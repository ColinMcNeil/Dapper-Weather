import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  AsyncStorage,
  Button,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { FetchWeather, ScheduleDailyNotification } from "./tasks/FetchWeather";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

TaskManager.defineTask("BACKGROUND_WEATHER", () => {
  RunRainReport();
  ScheduleDailyNotification();
});
BackgroundFetch.registerTaskAsync("BACKGROUND_WEATHER", {
  minimumInterval: 1800,
});

import { AppLoading } from "expo";
import {
  useFonts,
  RobotoMono_400Regular,
} from "@expo-google-fonts/roboto-mono";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

import TokenScreen from "./screens/TokenScreen";

export default function App() {
  const resources = useCachedResources();
  const [loadStages, setLoadStages] = useState({
    fonts: false,
    resources: false,
  });
  let [fontsLoaded] = useFonts({
    RobotoMono_400Regular,
  });
  if (fontsLoaded && !loadStages.fonts)
    setLoadStages({ ...loadStages, fonts: true });
  if (resources && !loadStages.resources)
    setLoadStages({ ...loadStages, resources });
  if (Object.values(loadStages).findIndex((v) => v === false) !== -1) {
    return <AppLoading />;
  }
  return (
    <SafeAreaProvider>
      <Navigation colorScheme={"dark"} />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 25,
  },
  TextInput: {
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    color: "black",
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
