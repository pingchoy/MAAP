import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView } from 'react-native';

const dimensions = Dimensions.get('window');

export default function Events({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.banner} source={require('../assets/eventsBanner.png')}/>

      <View style={styles.headingView}>
        <Image style={styles.add} source={require('../assets/add.png')}/>
        <Text style={styles.heading}>Events</Text>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    height: 180,
    width: dimensions.width,
    top: 0,
  },
  add: {
    position: 'absolute',
    height: 40,
    width: 40,
    right: 25,
    top: -20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingView: {
    position: 'absolute',
    width:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    top: 80,
  },
  heading: {
    position: 'absolute',
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 37,
    textAlign: 'center',
    color: '#FFFFFF',
    alignSelf: "center",
  },
});
