import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView  } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 


const dimensions = Dimensions.get('window');

export default function Events({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.bannerView}>
        <View style={styles.headingView}>
          <Text style={styles.heading}>Events</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name='md-add' size={65} color='white'/>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBarView}>
          <Text style={styles.heading}>Searchbar here</Text>
        </View>  

      </View>

      <ScrollView>

      </ScrollView>


      <StatusBar style="auto" />
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
  bannerView: {
    position: 'absolute',
    height: 150,
    width: dimensions.width,
    top: 0,
    backgroundColor: '#165f22',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.75,
    shadowRadius: 3,
    elevation: 5,
  },
  // Event text and button
  headingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,

  },
  heading: {
    position: 'absolute',
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },

  searchBarView : {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },


});
