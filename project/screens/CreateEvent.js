import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, useWindowDimensions } from 'react-native';


const dimensions = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default function CreateEventScreen({ navigation }) {
    const [code, onChangeCode] = React.useState('Enter an event code');
    const windowHeight = useWindowDimensions().height;

    return (
        <SafeAreaView style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.backButton} source={require('../assets/backButton.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.buttonBody} onPress={() => navigation.navigate('NewEvent')}>
                    <Text style={styles.buttonText}>Create an Event</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.subtextView}>
                <Text  style={styles.subtext}>OR</Text>
            </View>
            <View style={styles.subButtonView}>
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
        flex: 5,
        width: dimensions.width,
        height: 53,
        justifyContent: 'flex-end',
        alignItems: "center",

    },
    buttonBody: {
        position: 'absolute',
        width: dimensions.width - 40,
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
        width: dimensions.width,
        height: 19,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subtext: {
        flex: 1,
        position: 'absolute',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 20,
        /* identical to box height */
        /* dark */
        color: '#3C3C3C',
    },
    subButtonView: {
        flexDirection: 'row', 
        flex: 5, 
        width: dimensions.width-40,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    inputView: {
        flex: 3,
        height: 51,
        borderRadius: 10,
        paddingRight: 20,
    },
    inputBody: {
        position: 'absolute',
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
        paddingLeft: 20,
    },
    goButtonView: {
        flex: 1,
        height: 53,
    },
    goButtonBody: {
        alignItems: 'center',
        justifyContent: 'center',
        /* darkgreen */
        backgroundColor: '#165F22',
        borderRadius: 5,
        height: 53
    },
    banner: {
        position: 'absolute',
        height: 112,
        width: dimensions.width,
        bottom: 0,
        // top: height - 70,
    },
})