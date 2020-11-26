import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Text, SafeAreaView, Image, View } from 'react-native';
import { AuthContext } from '../App';

const dimensions = Dimensions.get('window');

export default function ProfileSettings({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (

    <SafeAreaView style={styles.container}>
        <Image style={styles.banner} source={require('../assets/profileBanner.png')}/>
        <View style={styles.headingView}>
            <Text style={styles.heading}>Settings</Text>
        </View>

        <View style={styles.bottomButtonView}>
            <TouchableOpacity style={styles.logoutButtonBody} onPress={() => signOut()} >
                <Text style={styles.buttonText}>Logout</Text>
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
    },    
    logoutButtonBody: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        /* darkgreen */
        height: 60,
        backgroundColor: '#FC5A5A',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomButtonView: {
        position: 'absolute',
        width: 350,
        height: 53,
        // left: 24,
        // top: 298,
        bottom: 0,
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 30,
        height: 55,
        padding: 20,
    },
    buttonBody: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        /* darkgreen */
        height: 60,
        backgroundColor: '#165F22',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        position: 'absolute',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 22,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        /* light */
        color: '#FFFFFF',
    },
});
