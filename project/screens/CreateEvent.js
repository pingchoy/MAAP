import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';

import { LoginButton } from '../components/LoginButton'

const dimensions = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default function CreateEventScreen({ navigation }) {
    const [code, onChangeCode] = React.useState('Enter an event code');

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.backButton} source={require('../assets/backButton.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.buttonBody} >
                    <Text style={styles.buttonText}>Create an Event</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.subtextView}>
                <Text style={styles.subtext}>OR</Text>
            </View>

            <View style={styles.inputView}>
                <TextInput
                    placeholder={code}
                    onChangePassword={text => onChangeCode(text)}
                    code={code}
                    style={styles.inputBody}
                />
            </View>

            <View style={styles.goButtonView}>
                <TouchableOpacity style={styles.goButtonBody} >
                    <Text style={styles.buttonText}>Go!</Text>
                </TouchableOpacity>
            </View>

            <Image style={styles.banner} source={require('../assets/bottomBanner.png')} />
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonView: {
        position: 'absolute',
        left: 23,
        top: 58,
    },
    buttonView: {
        position: 'absolute',
        width: 350,
        height: 53,
        left: 24,
        top: 298,
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
        height: 50,
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
    subtextView: {
        position: 'absolute',
        width: 19,
        height: 19,
        // left: 170,
        top: 369,
    },
    subtext: {
        position: 'absolute',
        left: "0%",
        right: "-36.84%",
        top: "0%",
        bottom: "-5.26%",
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 20,
        /* identical to box height */


        /* dark */
        color: '#3C3C3C',
    },
    inputView: {
        position: 'absolute',
        width: 203,
        height: 51,
        left: 24,
        top: 413,
        borderRadius: 10,
    },
    inputBody: {
        position: 'absolute',
        paddingLeft: 20,
        height: 55,
        width: '100%',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 21,
        color: '#3C3C3C',
        backgroundColor: 'white',
        borderRightColor: 'black',
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
    },
    goButtonView: {
        position: 'absolute',
        width: 95,
        height: 53,
        left: 270,
        top: 413,
    },
    goButtonBody: {
        position: 'absolute',
        left: "0%",
        right: "0%",
        top: "0%",
        bottom: "0%",
        alignItems: 'center',
        justifyContent: 'center',
        /* darkgreen */

        backgroundColor: '#165F22',
        borderRadius: 5,
    },
    banner: {
        position: 'absolute',
        height: 112,
        width: dimensions.width,
        bottom: 0,
        top: height - 70,
    },


})