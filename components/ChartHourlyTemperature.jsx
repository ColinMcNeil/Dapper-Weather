import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

import { prettyPrintTime } from "../constants/Translations";

export default ({ data }) => {
  data = data.reduce(
    (acc, cur, index) => (index % 3 == 0 ? [...acc, cur] : acc),
    []
  );
  // const hideAt = data.map((d, i) => ({index: i, rain: d.rain ? d.rain['1h'] : 0})).filter((d, i) => (d.rain == 0) && i !== 0).map(d=> d.index)
  const times = data.map((d) => prettyPrintTime(d.dt, true));
  const dataParse = {
    labels: times.map((t) => t),
    datasets: [
      {
        data: data.map((d) => d.feels_like),
      },
    ],
  };
  return (
    <LineChart
      data={dataParse}
      width={Dimensions.get("window").width} // from react-native
      height={270}
      yAxisSuffix="°F"
      verticalLabelRotation={30}
      getDotProps={(val, index) =>
        index == 0 ? { r: 6, fill: "#00ff00", stroke: "#bbbbff" } : { r: 5 }
      }
      // hidePointsAtIndex={hideAt}
      chartConfig={{
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(150, 230, 150, ${opacity})`,
      }}
    />
  );
};
