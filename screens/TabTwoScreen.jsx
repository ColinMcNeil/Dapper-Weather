import React, {useEffect, useState} from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Button } from 'react-native'
import { Text, View } from '../components/Themed';

export default function TabTwoScreen(props) {
  const [token, setToken] = useState('')
  useEffect(() => {
    AsyncStorage.getItem('token').then(setToken)
  })
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.title}>Token: {token}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Edit Token" onPress={() => props.navigation.navigate('Token')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
