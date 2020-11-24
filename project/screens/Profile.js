import React from 'react';
import { StyleSheet, Dimensions, Text, SafeAreaView, Image } from 'react-native';
import { AuthContext } from '../App';

const dimensions = Dimensions.get('window');

export default function Profile({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (

    <SafeAreaView style={styles.container}>
        <Image style={styles.banner} source={require('../assets/profileBanner.png')}/>
        <TouchableOpacity onPress={() => signOut()} >
          <Text>Back to login</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Profile</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    banner: {
        //position: 'absolute',
        height: 180,
        width: dimensions.width,
        //top: 0,
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
});
