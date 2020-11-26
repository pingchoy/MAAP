import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView } from 'react-native';

const dimensions = Dimensions.get('window');

export default function Events({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.banner} source={require('../assets/eventsBanner.png')}/>

      <View style={styles.headingView}>
        <Text style={styles.heading}>Incoming Invites</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingView: {
    flex: 1,
    position: 'absolute',
    width: "100%",
    justifyContent: 'center',
    // alignItems: 'center',
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
