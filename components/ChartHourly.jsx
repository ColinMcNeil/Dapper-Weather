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

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const prettyPrintTime = (date) => {
  let time = new Date(date.dt * 1000).toLocaleTimeString()
  const day = new Date(date.dt * 1000).getDay()
  time = parseInt(time.split(':')[0])
  
  if(time % 12 >= 1) time = time%12 + 'PM'
  else if(time % 12 == 0) time = time + 'PM'
  else time = time + 'AM'
  return days[day] + ' ' + time
}


export default ({data}) => {
  
  data = data.reduce((acc, cur, index) => index % 2 == 0 ? [...acc, cur] : acc, [])
  const hideAt = data.map((d, i) => ({index: i, rain: d.rain ? d.rain['1h'] : 0})).filter((d, i) => (d.rain == 0) && i !== 0).map(d=> d.index)
  const times = data.map(prettyPrintTime)
  const dataParse = {
    labels: times.map(t=>t),
    datasets: [
      {
        data: data.map(d => d.rain ? d.rain['1h'] : 0)
      }
    ]
  }
  return (
    <LineChart 
      data={dataParse} 
      width={Dimensions.get("window").width} // from react-native
      height={270}
      yAxisSuffix="in"
      verticalLabelRotation={30}
      getDotProps={(val, index) => (index == 0 ? {r: 6, fill: "#00ff00", stroke: "#bbbbff"} : {r: 5})}
      hidePointsAtIndex={hideAt}
      chartConfig={{
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(255, 110, 110, ${opacity})`,
      }}
    />
  )
}