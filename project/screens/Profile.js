import React from 'react';
import { StyleSheet, Dimensions, Text, SafeAreaView } from 'react-native';

const dimensions = Dimensions.get('window');

export default function Profile({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Profile</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 32,
    color: '#3C3C3C',
    position: 'absolute',
    alignSelf: "flex-start",
    margin: 20,
  },
});
