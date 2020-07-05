import React, {useState} from 'react';
import { StyleSheet, RefreshControl, ScrollView, AsyncStorage, Modal, Button } from 'react-native';
import * as Location from 'expo-location';

import { Text, View } from '../components/Themed';

import ChartMinutely from '../components/ChartMinutely'
import ChartHourly from '../components/ChartHourly'
import ChartHourlyTemperature from '../components/ChartHourlyTemperature'
import Summary from '../components/Summary'
import Refresh from '../components/Refresh'

export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState({})
  const [error, setError] = useState('')
  const [myLocation, setMyLocation] = useState('')
  const onRefresh = async () => {
    setRefreshing(true)
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') return setError('Location is needed to get weather!')
    const token = await AsyncStorage.getItem('token')
    const location = await Location.getCurrentPositionAsync({});
    const {latitude, longitude} = location.coords
    const reversed = await Location.reverseGeocodeAsync({latitude, longitude})
    const [reversedLocation] = reversed
    const {city, street, region} = reversedLocation
    setMyLocation(`${street} in ${city}, ${region}`)
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${token}`
    console.log(token)
    const resp = await fetch(url)
    if(resp.status !== 200) return setError(await resp.text())
    setData(await resp.json())
    setRefreshing(false)
  }
  return (
    error !== '' ? <Modal>
      <Text>{error}</Text>
      <Button title="Close" onPress={() => setError('')} />
    </Modal>
    :
    <ScrollView
        alwaysBounceVertical
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {refreshing || !data.minutely ?
          (
            <Refresh refreshing={refreshing}/>
          )
          :
          (
            <View style={styles.View}>
              <Text style={styles.myLocation}>{myLocation}</Text>
              <Text style={styles.title}>Minutely Rain</Text>
              <ChartMinutely data={data.minutely} />
              <Text style={styles.title}>Hourly Rain</Text>
              <ChartHourly data={data.hourly} />
              <Text style={styles.title}>Hourly Temperature</Text>
              <ChartHourlyTemperature data={data.hourly} />
            </View>
          )
        }
        
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: 'black'
  },
  scrollView: {
    color: '#ffffff'
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  myLocation: {
    padding: 10,
    color: 'white'
  }
});
