import React from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from 'react-native'

const prettyPrintTime = (date) => {
  let time = new Date(date.dt * 1000).toLocaleTimeString()
  time = time.split(':')[1]
  return time
}


export default ({data}) => {
  data = data.reduce((acc, cur, index) => index % 4 == 0 ? [...acc, cur] : acc, [])
  const times = data.map(prettyPrintTime)
  const dataParse = {
    labels: times.map(t=>':' + t),
    datasets: [
      {
        data: data.map(d => d.precipitation)
      }
    ]
  }
  return (
    <LineChart 
      data={dataParse} 
      width={Dimensions.get("window").width} // from react-native
      height={160}
      yAxisSuffix="%"
      getDotProps={(val, index) => (index == 0 ? {r: 6, fill: "#00ff00", stroke: "#bbbbff"} : {r: 5})}
      chartConfig={{
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(150, 150, 255, ${opacity})`,
      }}
    />
  )
}