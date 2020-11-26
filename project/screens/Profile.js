import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Text, SafeAreaView, Image, View } from 'react-native';
import { AuthContext } from '../App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const dimensions = Dimensions.get('window');

export default function Profile({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (

    <SafeAreaView style={styles.container}>
        <Image style={styles.banner} source={require('../assets/profileBanner.png')}/>
        
        <View style={styles.headingView}>
          <Text style={styles.heading}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')} >
            <MaterialCommunityIcons style={styles.settings} name="settings" color={"#165F22"} size={50} />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    banner: {
      position: 'absolute',
      height: 300,
      width: dimensions.width,
      top: 0,
      aspectRatio: 3/2,
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        position: 'absolute',
        //fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 32,
        lineHeight: 37,
        textAlign: 'center',
        color: '#3C3C3C',
        alignSelf: "center",
    },
    settings: {
      position: 'absolute',
      right: 25,
      top: -10,
    }
});
