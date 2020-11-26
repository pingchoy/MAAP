import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { } from 'react-native-gesture-handler'
const dimensions = Dimensions.get('window');

export default function Events({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.banner} source={require('../assets/eventsBanner.png')} />

      <View style={styles.headingView}>
        <Text style={styles.heading}>Events</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateEvent')}>
          <MaterialCommunityIcons style={styles.add} name="plus" color={"white"} size={50} />
        </TouchableOpacity>
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
    right: 25,
    top: -10,
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
  addButton: {
    zIndex: 1,
    height: 40,
    // height: 40,
    // width: 40,
    // right: 25,
    // top: -20,
  }

});
