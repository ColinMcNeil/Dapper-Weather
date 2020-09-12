import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { AsyncStorage } from "react-native";
import { prettyPrintWeather } from "../constants/Translations";
const QueryWeather = async() => {
  const token = await AsyncStorage.getItem("token");
  if (!token) return false;
  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${token}&units=imperial`;
  const resp = await fetch(url);
  if (resp.status !== 200) return false;
  return resp.json();
}
const RunRainReport = async() => {
  console.log('Running rain report')
  try {
    const data = await QueryWeather()
    if (!data) return BackgroundFetch.Result.Failed
    const nextRain = data.minutely.findIndex(
      ({ precipitation }) => precipitation > 0
    );
    let rainMessage = "";
    if (nextRain == -1) return BackgroundFetch.Result.NewData; //No rain!
    if (nextRain == 0) {
      const endRain = data.minutely.findIndex(
        ({ precipitation }) => precipitation === 0
      );
      if (endRain == -1) rainMessage = "Rain expected for the next hour :(";
      else rainMessage = `Rain should let up in about ${endRain} minutes!`;
    } else {
      rainMessage = `Rain expected in about ${nextRain} minutes!`;
    }
    const content = {
      title: "Rain update!",
      subtitle: "New update",
      body: rainMessage,
    };

    Notifications.scheduleNotificationAsync({ content, trigger: null });
    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error(error);
    return BackgroundFetch.Result.Failed;
  }
};

const ScheduleDailyNotification = async(immediate = false) => {
  console.log('Preparing tomorrows report')
  const data = await QueryWeather()
  const content = {
    title: "Daily Weather Report!",
    subtitle: "Report",
    body: "We had a problem getting your weather data! Please open the app and make sure you can load your local weather.",
  };
  if (data) {
    const today = data.daily[0]
    const lowerCase = (string) => (string.charAt(0).toLowerCase() + string.slice(1));
    const prettyPrintedWeather = today.weather.map((w) => lowerCase(prettyPrintWeather(w.description))).join(', and ')
    const body = `Today's high is ${today.temp.max} with ${prettyPrintedWeather}`
    content.body = body
  }
  const scheduled = await Notifications.getAllScheduledNotificationsAsync()
  if (scheduled.length > 0)
    await Notifications.cancelScheduledNotificationAsync(scheduled[0].identifier);
  Notifications.scheduleNotificationAsync({
    content,
    trigger: immediate ? null : {
      hour: 8,
      minute: 0,
      repeats: true
    }
  });

}

export { RunRainReport, ScheduleDailyNotification }