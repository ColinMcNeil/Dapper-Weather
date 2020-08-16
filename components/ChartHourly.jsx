import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { flattenDiagnosticMessageText } from "typescript";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const prettyPrintTime = (date) => {
  let time = new Date(date.dt * 1000).toLocaleTimeString();
  const day = new Date(date.dt * 1000).getDay();
  time = parseInt(time.split(":")[0]);

  if (time / 12 > 1) time = time - 12 + "PM";
  else if (time / 12 == 1) time = time + "PM";
  else if (time == 0) time = 12 + "AM";
  else time = time + "AM";
  return days[day] + " " + time;
};

const styles = StyleSheet.create({
  dotText: {
    color: "white",
    position: "absolute",
    fontSize: 10,
  },
});

export default ({ data }) => {
  const hideAt = data
    .map((d, i) => ({ index: i, rain: d.rain ? d.rain["1h"] : 0 }))
    .filter((d, i) => d.rain == 0 && i !== 0)
    .map((d) => d.index);
  const times = data.map(prettyPrintTime);
  const dataParse = {
    labels: times.map((t) => t),
    datasets: [
      {
        data: data.map((d) => (d.rain ? d.rain["1h"] : 0)),
      },
    ],
  };
  const renderDotContent = ({ x, y, index }) => {
    let left = x + -55;
    let top = y - 8;
    let showIn = true;
    const currentVal = dataParse.datasets[0].data[index];
    if (index > 0) {
      const lastVal = dataParse.datasets[0].data[index - 1];
      if (Math.abs(1 - currentVal / lastVal) < 0.2) {
        left = x + 8;
        showIn = false;
      }
    }
    return (
      <View key={"dot-" + index}>
        <Text style={{ ...styles.dotText, top, left }}>
          {dataParse.labels[index]}
        </Text>
      </View>
    );
  };
  return (
    <LineChart
      data={dataParse}
      width={Dimensions.get("window").width} // from react-native
      height={270}
      yAxisSuffix="in"
      verticalLabelRotation={0}
      getDotProps={(val, index) =>
        index == 0 ? { r: 6, fill: "#00ff00", stroke: "#bbbbff" } : { r: 5 }
      }
      hidePointsAtIndex={hideAt}
      renderDotContent={renderDotContent}
      withVerticalLabels={false}
      chartConfig={{
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(255, 110, 110, ${opacity})`,
      }}
    />
  );
};
