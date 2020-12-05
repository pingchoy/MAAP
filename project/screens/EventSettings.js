import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Text, SafeAreaView, View, Image, CheckBox, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
const dimensions = Dimensions.get('window');

export default function EventSettings({ route, navigation }) {
    const [guestsCanInvitePeople, setGuestsCanInvitePeople] = React.useState(false);
    const [guestsCanAddLocations, setGuestsCanAddLocations] = React.useState(false);
    const [guestsCanAddTimes, setGuestsCanAddTimes] = React.useState(false);
    const [, updateState] = React.useState();
    const [token, setToken] = React.useState('')
    const [API_BASE_URL, setAPIURL] = React.useState('')
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const { eventId } = route.params

    React.useEffect(() => {
        (async () => {
            let api = await AsyncStorage.getItem('api')
            let token2 = await AsyncStorage.getItem('userToken')
            setToken(token2)
            setAPIURL(api)
            getEventSettings(api, token2)
        })()
    }, [])

    const getEventSettings = (api, token) => {
        fetch(`${api}/event/${eventId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'GET',
        }).then(res => res.json())
            .then(body => {
                setGuestsCanInvitePeople(body.event.permissions.guestsCanInvite)
                setGuestsCanAddLocations(body.event.permissions.guestsCanAddLocations)
                setGuestsCanAddTimes(body.event.permissions.guestsCanAddTimes)
                forceUpdate()
            })

    }
    const handleEventSettingsChange = () => {

        fetch(`${API_BASE_URL}/event/settings`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'PUT',
            body: JSON.stringify({
                "eventId": eventId,
                "newPermissions": {
                    "guestsCanInvite": guestsCanInvitePeople,
                    "guestsCanAddLocations": guestsCanAddLocations,
                    "guestsCanAddTimes": guestsCanAddTimes
                }
            })
        })
    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.backButton} source={require('../assets/backButton.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerView} >

                <Text style={styles.headerText}>Setttings</Text>
                <View style={styles.checkButton} >
                    <Icon.Button
                        // Change this onPress to affect state of guests later on
                        onPress={() => {
                            handleEventSettingsChange()
                            navigation.goBack()
                        }}
                        name="check"
                        size={30}
                        backgroundColor="transparent"
                        color="green"

                    // onPress={this.loginWithFacebook}
                    >
                    </Icon.Button>
                </View>
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
    checkButton: {
        position: 'absolute',
        width: 70,
        left: "60%",
        top: -5,
        // backgroundColor: "black",
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
    headerView: {
        position: 'absolute',
        width: "100%",
        top: "7%",
        left: "20%",
    },
    headerText: {
        position: 'absolute',
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 32,
        lineHeight: 37,
        display: 'flex',
        alignItems: 'center'
    },
    checkButton: {
        position: 'absolute',
        width: 70,
        left: "60%",
        top: -5,
        // backgroundColor: "black",
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
