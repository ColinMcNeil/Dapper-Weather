import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AsyncStorage, Button, Text, TextInput, StyleSheet} from 'react-native';

export default function TokenScreen({ navigation }) {
  const [tempToken, setTempToken] = useState('');
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token')
    if(token) navigation.navigate('Root')
  }
  const submitToken = async () => {
    await AsyncStorage.setItem('token', tempToken)
    checkToken()
  }

  // const token = await AsyncStorage.getItem('token')
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Text style={styles.Text}>No token</Text>
      <TextInput style={styles.TextInput} placeholder="Enter Token" onChangeText={setTempToken}/>
      <Button style={styles.Button} title="Submit" onPress={submitToken}/>
      <StatusBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 25,
  },
  TextInput: {
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: 'black',
    padding: 10,
    margin: 10,
    width: 250,
  },
  SafeAreaView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Button: {
    fontSize: 20
  }
})