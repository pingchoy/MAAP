import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const dimensions = Dimensions.get('window');
const { height } = Dimensions.get('window');
const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} >

    </View>
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'purple' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };


export default function NewEventScreen({ navigation }) {
    const [code, onChangeCode] = React.useState('Enter an event code');
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Guests' },
        { key: 'second', title: 'Locations' },
        { key: 'third', title: 'Times' }
    ]);
    const [currentTab, setCurrentTab] = React.useState("Guests")
    const [timeList, setTimesList] = React.useState([])
    const [locationList, setLocationList] = React.useState([])
    const [guestList, setGuestList] = React.useState([])
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const windowHeight = useWindowDimensions().height;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const nth = (d) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    const renderScene = ({ route }) => {

        switch (route.key) {
            case 'first':
                return (
                    <ScrollView style={[styles.scene, { backgroundColor: 'white' }]} >
                        {guestList.map((guest) => {
                            return (
                                <Text style={styles.guestInformationText}>
                                    <Icon
                                        name="question"
                                        size={30}
                                        backgroundColor="orange"
                                        color="orange"

                                    // onPress={this.loginWithFacebook}
                                    >
                                    </Icon>
                                    <Text style={styles.guestUsernameText}>   {guest.username}</Text>
                                </Text>

                            )
                        })}
                    </ScrollView>)
            case 'second':
                return (
                    <ScrollView style={[styles.scene, { backgroundColor: 'white' }]} >
                        {locationList.map((location) => {
                            return (
                                <Text style={styles.locationInformationText}>
                                    <Text>{location.name}</Text>
                                </Text>

                            )
                        })}
                    </ScrollView>)
            case 'third':
                return (
                    <ScrollView style={[styles.scene, { backgroundColor: 'white' }]} >
                        {timeList.map((time) => {
                            return (
                                <Text style={styles.timeInformationText} numberOfLines={2}>
                                    <Text>{time.date.getHours()}:{time.date.getUTCMinutes() < 10 ? '0' + time.date.getMinutes() : time.date.getMinutes()}{time.date.getHours() > 12 ? "pm" : "am"}</Text>
                                    <Text> {days[time.date.getDay()]}</Text>
                                    <Text> {time.date.getDate()}{nth(time.date.getDate())}</Text>
                                    <Text> {months[time.date.getMonth()]}</Text>

                                </Text>

                            )
                        })}
                    </ScrollView>)
        }
    }


    const renderTabBar = props => (
        <TabBar
            {...props}
            onTabPress={({ route, preventDefault }) => {
                // preventDefault()
                setCurrentTab(route.title)
            }}

            renderLabel={({ route, focused, color }) => (
                <Text style={{ color: "black", margin: 8, fontSize: 16, fontWeight: 'bold', lineHeight: 20 }}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ backgroundColor: 'green', height: 5 }}
            style={{ backgroundColor: "white", }}
        />
    )

    const handleDateTimeChange = (date) => {

        // Add new time to time list
        let temp = timeList
        // Check for duplicate times

        if (timeList.filter(t => t.date.getTime() === date.getTime()).length === 0) {
            temp.push({ date: date, votes: 0 })
        }
        setTimesList(temp)
        forceUpdate()
    }

    const handleLocationChange = (locations) => {
        let temp = locationList
        let filteredList = []
        // Get unique locations from locationList
        locationList.map(location => {
            if (filteredList.indexOf(location.name) === -1) {
                filteredList.push(location.name)
            }
        })
        // get unique locations from locations
        locations.map(location => {
            if (location) {
                if (filteredList.indexOf(location) === -1) {
                    filteredList.push(location)
                    temp.push({ name: location, votes: 0 })
                }
            }
        })
        setLocationList(temp)
        forceUpdate()
    }

    const handleGuestChange = (guests) => {
        let temp = guestList
        let filteredList = []
        // Get unique guests from guestList
        guestList.map(guest => {
            if (filteredList.indexOf(guest.username) === -1) {
                filteredList.push(guest.username)
            }
        })
        // get unique guests from guests
        guests.map(guest => {
            if (guest) {
                if (filteredList.indexOf(guest) === -1) {
                    filteredList.push(guest)
                    temp.push({ username: guest, status: "maybe" })
                }
            }
        })

        setGuestList(temp)
        forceUpdate()
    }

    return (

        <SafeAreaView style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.backButton} source={require('../assets/backButton.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerView} >

                <Text style={styles.headerText}>New Event</Text>
                <View style={styles.editButton} >
                    <Icon.Button
                        name="edit"
                        size={30}
                        backgroundColor="transparent"
                        color="black"
                    // onPress={this.loginWithFacebook}
                    >
                    </Icon.Button>
                </View>
            </View>
            <View style={styles.eventDetailsView}>
                <Text>
                    <Text style={styles.eventDetailsBoldText}>Host:</Text><Text style={styles.eventDetailsNormalText}> Anton</Text>
                </Text>
                <Text>
                    <Text style={styles.eventDetailsBoldText}>Location:</Text><Text style={styles.eventDetailsNormalText}> Anton's House</Text>
                </Text>
                <Text>
                    <Text style={styles.eventDetailsBoldText}>Time:</Text><Text style={styles.eventDetailsNormalText}> 6:30pm Sat. 14 Nov.</Text>
                </Text>
            </View>
            <View style={styles.tabBar}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    renderTabBar={renderTabBar}
                    swipeEnabled={false}
                />
            </View>
            <View style={styles.bottomButtonView}>
                <TouchableOpacity style={styles.buttonBody} onPress={() => navigation.navigate('Add'.concat(currentTab),
                    {
                        handleDateTimeChange: handleDateTimeChange, handleLocationChange: handleLocationChange, handleGuestChange: handleGuestChange,
                        guestList: guestList, locationList: locationList
                    })}>
                    <Text style={styles.buttonText}>Add {currentTab}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >

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
    editButton: {
        position: 'absolute',
        width: 60,
        left: "40%",
        top: -5,
        // backgroundColor: "black",
    },
    eventDetailsView: {
        position: 'absolute',
        width: 250,
        height: 150,
        top: "20%",
        left: "10%",
    },
    eventDetailsBoldText: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: "bold",
    },
    eventDetailsNormalText: {
        fontSize: 18,
        lineHeight: 20,
    },
    tabBar: {
        position: 'absolute',
        width: 360,
        top: "30%",
        height: "55%",
    },
    scene: {
        flex: 1,
        marginTop: 20,

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
    timeInformationText: {
        fontSize: 18,
        fontWeight: "600",
        width: "60%",
        marginTop: 20,
        left: "40%",
        marginBottom: 20,
        display: 'flex',
    },
    locationInformationText: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        left: "50%",
        width: "50%",
        marginBottom: 20,
        display: 'flex',
        // backgroundColor: 
    },

    guestInformationText: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        left: "5%",
        marginBottom: 20,
        display: 'flex',
    },
    guestUsernameText: {
        // position: 'absolute',
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,

    }



})