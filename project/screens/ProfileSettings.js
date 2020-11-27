import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Text, SafeAreaView, View, Image } from 'react-native';
import { AuthContext } from '../App';

const dimensions = Dimensions.get('window');

export default function ProfileSettings({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (

    <SafeAreaView style={styles.container}>
        <View style={styles.bannerView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={styles.backButton} source={require('../assets/whiteBackButton.png')} />
            </TouchableOpacity>
        </View>
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
    headingView: {
      flex: 1,
      position: 'absolute',
      width: "100%",
      justifyContent: 'center',
      // alignItems: 'center',
      textAlign: 'center',
      top: "9%",
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
        color: '#FFFFFF',
        alignSelf: "center",
    },
    backButton: {
        position: 'absolute',
        left: 23,
        top: 58,
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
