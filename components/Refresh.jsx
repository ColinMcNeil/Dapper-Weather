import React, { useState } from 'react'
import {View, Image, Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native'

export default ({refreshing}) => {
  const [touched, setTouched] = useState(false)
  const AnimatedTassel = Animated.createAnimatedComponent(Image);
  const marginTop = new Animated.Value(-20);
  const touchIn = () => {
    Animated.timing(marginTop, {
      toValue: 100,
      duration: 300,
      useNativeDriver: false
    }).start(touchOut);
  }
  const touchOut = () => {
    Animated.timing(marginTop, {
      delay: 200,
      toValue: -20,
      duration: 500,
      useNativeDriver: false
    }).start();
  }
  return (
    <View style={styles.View}>
      {
        refreshing || 
        <TouchableWithoutFeedback onPressIn={touchIn}>
          <AnimatedTassel style={{...styles.Image, marginTop}}  source={require('../assets/tassel.png')} />
        </TouchableWithoutFeedback >
      }
      <Text style={styles.Text}>{refreshing ? "Loading..." : "Pull to Refresh"}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  Text: {
    color: 'white',
    fontSize: 30,
    paddingTop: 10,
    flex: 1
  },
  View: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  Image: {
    height: 600,
    width: 200,
    resizeMode: 'contain',
  },
})