const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daysLong = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const weatherMappings = {
  "thunderstorm with rain": "Oh dear! Thunderstorms and rain!",
  "thunderstorm with heavy rain": "Oh dear! Thunderstorms and heavy rain!",
  "light thunderstorm": "Unfortunately, a spot of thunder",
  thunderstorm: "Oh dear! Thunderstorm!",
  "heavy thunderstorm": "Heavy Thunderstorm!",
  "ragged thunderstorm": "Ragged Thunderstorm!",
  "thunderstorm with light drizzle":
    "Oh dear! Thunderstorms and light drizzles!",
  "thunderstorm with drizzle": "Oh dear! Thunderstorms and and drizzles!",
  "thunderstorm with heavy drizzle":
    "Oh dear! Thunderstorms and and heavy drizzles!",
  "light intensity drizzle": "Quite light drizzles",
  drizzle: "Trying for drizzles",
  "heavy intensity drizzle": "Heavy Drizzles? Don't you mean rain?",
  "light intensity drizzle rain": "Light dizzles with a spot of rain",
  "drizzle rain": "Drizzles and rain",
  "heavy intensity drizzle rain": "Drizzles and heavy rain",
  "shower rain and drizzle": "Just a shower",
  "heavy shower rain and drizzle": "Quite heavy showers!",
  "shower drizzle": "Just a shower and some drizzles",
  "light rain": "Trying for rain",
  "moderate rain": "A fair amount of rain",
  "very heavy rain ": "Quite some rain",
  "extreme rain": "Batten down the hatches! Extreme rain incoming!",
  "freezing rain": "Watch out! Freezing rain",
  "heavy intensity rain": "Tipping down",
  "light intensity shower rain": "Spot of showers",
  "shower rain": "Some showers",
  "heavy intensity shower rain": "Some showers on the heavier side",
  "ragged shower rain": "Some showers on the ragged side",
  "light snow": "Some lovely flurries!",
  Snow: "Snow time!",
  "Heavy snow": "Quite some heavy snow!",
  Sleet: "Sleet",
  "Light shower sleet": "Spot of showers and some sleet",
  "Shower sleet": "Showers and sleet!",
  "Heavy shower snow": "Heavy showers and sleet!",
  mist: "A bit of mist for the spooky atmos",
  Smoke: "Smokey!",
  Haze: "A bit hazy",
  "sand/ dust whirls": "Sand and dust twirls",
  fog: "London Fog",
  sand: "Sandy times",
  "volcanic ash": "Volcanic ash!",
  squalls: "Squalls!",
  tornado: "Yes, there appears to be a TORNADO!",
  "clear sky": "Clean as a whistle",
  "few clouds": "A spot of clouds",
  "scattered clouds": "A spattering of clouds scattered about",
  "broken clouds": "Cloudy with some cheeky sun here and there",
  "overcast clouds": "Overcast as usual...",
};
const prettyPrintTime = (date, short = false) => {
  let time = new Date(date * 1000).toLocaleTimeString();
  const day = new Date(date * 1000).getDay();

  let hours = parseInt(time.split(":")[0]);
  const minutes = parseInt(time.split(":")[1]);
  const pm = hours > 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  if (short) return days[day] + hours + pm;
  return days[day] + " " + hours + ":" + minutes + pm;
};

const prettyPrintDay = (date, short = false) => {
  const dateParse = new Date(date * 1000);
  const day = dateParse.getDay();
  const dateOfMonth = dateParse.getDate();
  const month = dateParse.getMonth() + 1;
  if (short) return days[day];
  return daysLong[day] + ` (${month}/${dateOfMonth})`;
};

const prettyPrintWeather = (desc) => {
  return weatherMappings[desc] || desc;
};

export { prettyPrintTime, prettyPrintWeather, prettyPrintDay };
