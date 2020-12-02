import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Text, SafeAreaView, View, Image, CheckBox } from 'react-native';

const dimensions = Dimensions.get('window');

export default function EventSettings({ navigation }) {
    const [guestsCanInvitePeople, setGuestsCanInvitePeople] = React.useState(false);
    const [guestsCanAddLocations, setGuestsCanAddLocations] = React.useState(false);
    const [guestsCanAddTimes, setGuestsCanAddTimes] = React.useState(false);
    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.bannerView}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/whiteBackButton.png')} />
                </TouchableOpacity>
                <Text style={styles.heading}>Settings</Text>

            </View>

            <View style={styles.settingsView}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={guestsCanInvitePeople}
                        onValueChange={setGuestsCanInvitePeople}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Guests can invite people</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={guestsCanAddLocations}
                        onValueChange={setGuestsCanAddLocations}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Guests can add locations</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={guestsCanAddTimes}
                        onValueChange={setGuestsCanAddTimes}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Guests can add times</Text>
                </View>
            </View>
            <View style={styles.bottomButtonView}>
                <TouchableOpacity style={styles.deleteButtonBody} >
                    <Text style={styles.buttonText}>Delete Event</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bannerView: {
        position: 'absolute',
        height: 125,
        width: dimensions.width,
        top: 0,
        backgroundColor: '#165f22',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 3,
        elevation: 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: 20,
    },
    settingsView: {
        height: dimensions.height - 400,
        position: 'absolute',
        top: 125,
        width: dimensions.width,
        justifyContent: 'center',
        // alignItems: 'center',
        left: "20%",

    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: 'flex-start',
        // textAlign: 'flex-start'
    },
    checkbox: {
        alignSelf: "center",

    },
    label: {
        margin: 8,
        fontSize: 20
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
        color: '#FFFFFF',
    },
    backButton: {
        alignSelf: 'flex-start',
    },
    settings: {
        position: 'absolute',
        right: 25,
        top: -10,
    },
    deleteButtonBody: {
        position: 'absolute',
        width: dimensions.width - 60,
        height: 63,
        backgroundColor: '#b10b0b',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomButtonView: {
        position: 'absolute',
        width: dimensions.width,
        bottom: 0,
        justifyContent: 'center',
        alignItems: "center",
        height: 120,
        padding: 20,

    },
    buttonText: {
        position: 'absolute',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 22,
        display: 'flex',
        color: '#FFFFFF',
    },

});
