import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, useWindowDimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialLayout = { width: Dimensions.get('window').width };


export default function GuestEventScreen({ route, navigation }) {
    const [code, onChangeCode] = React.useState('Enter an event code');
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Guests' },
        { key: 'second', title: 'Locations' },
        { key: 'third', title: 'Times' }
    ]);
    const [eventName, setEventName] = React.useState("New Event")
    const [currentTab, setCurrentTab] = React.useState("Guests")
    const [timeList, setTimesList] = React.useState([])
    const [locationList, setLocationList] = React.useState([])
    const [guestList, setGuestList] = React.useState([])
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newEventName, setNewEventName] = React.useState("")
    const [guestsCanInvitePeople, setGuestsCanInvitePeople] = React.useState(false);
    const [guestsCanAddLocations, setGuestsCanAddLocations] = React.useState(false);
    const [guestsCanAddTimes, setGuestsCanAddTimes] = React.useState(false);

    const windowHeight = useWindowDimensions().height;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [token, setToken] = React.useState('')
    const [API_BASE_URL, setAPIURL] = React.useState('')
    const { eventId } = route.params

    React.useEffect(() => {
        (async () => {
            let api = await AsyncStorage.getItem('api')
            let token2 = await AsyncStorage.getItem('userToken')
            setToken(token2)
            setAPIURL(api)
            getEventDetails(api, token2)
        })()
    }, [])

    const getEventDetails = (api, token) => {
        fetch(`${api}/event/${eventId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'GET',
        }).then(res => res.json())
            .then(body => {
                console.log(body)
                // setEventName(body.event.name)
                // setLocationList(body.event.locations)
                // setTimesList(body.event.times)
                // setGuestList(body.event.guests)
                // setGuestsCanAddTimes(body.event.permissions.guestsCanAddTimes)
                // setGuestsCanAddLocations(body.event.permissions.guestsCanAddLocations)
                // setGuestsCanInvitePeople(body.event.permissions.guestsCanInvitePeople)
                forceUpdate()
            })

    }
    const nth = (d) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    const handleAddLocationVote = (location) => {
        let tempList = locationList

        tempList.map(l => {
            if (l.name === location.name) {
                l.votes++
                fetch(`${API_BASE_URL}/event/vote/location`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': token
                    },
                    method: 'PUT',
                    body: JSON.stringify({
                        "eventId": eventId,
                        "location": l.name,
                    })
                })

            }
        })
        tempList.sort((a, b) => {
            return b.votes - a.votes
        })
        setLocationList(tempList)
        forceUpdate()
    }


    const handleAddTimeVote = (time) => {
        let tempList = timeList

        tempList.map(t => {
            if (t.startDate === time.startDate) {
                t.votes++

                fetch(`${API_BASE_URL}/event/vote/time`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': token
                    },
                    method: 'PUT',
                    body: JSON.stringify({
                        "eventId": eventId,
                        "start": t.startDate,
                        "end": t.endDate
                    })
                })
            }
        })
        tempList.sort((a, b) => {
            return b.votes - a.votes
        })
        setTimesList(tempList)
        forceUpdate()
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
                                        backgroundColor="white"
                                        color="orange"
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
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon.Button
                                        name="chevron-up"
                                        size={30}
                                        iconStyle={styles.upvoteButton}
                                        backgroundColor="white"
                                        color="black"
                                        onPress={() => {
                                            handleAddLocationVote(location)
                                        }}
                                    ><Text> {location.votes}</Text></Icon.Button>
                                    <Text style={styles.locationInformationText}>{location.name}</Text>
                                </View>


                            )
                        })
                        }
                    </ScrollView >)
            case 'third':
                return (
                    <ScrollView style={[styles.scene, { backgroundColor: 'white' }]} >
                        {timeList.map((time) => {
                            return (


                                <View style={{ flexDirection: 'row' }}>
                                    <Icon.Button
                                        name="chevron-up"
                                        size={30}
                                        iconStyle={styles.upvoteButton}
                                        backgroundColor="white"
                                        color="black"
                                        onPress={() => {
                                            handleAddTimeVote(time)
                                        }}
                                    ><Text> {time.votes}</Text></Icon.Button>
                                    <Text style={styles.timeInformationText} numberOfLines={2}>
                                        <Text>{time.date.getHours()}:{time.date.getUTCMinutes() < 10 ? '0' + time.date.getMinutes() : time.date.getMinutes()}{time.date.getHours() > 12 ? "pm" : "am"}</Text>
                                        <Text> {days[time.date.getDay()]}</Text>
                                        <Text> {time.date.getDate()}{nth(time.date.getDate())}</Text>
                                        <Text> {months[time.date.getMonth()]}</Text>

                                    </Text>
                                </View>


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

    const onChangeText = (text) => {
        setNewEventName(text)
    }

    const handleGoing = () => {
        fetch(`${API_BASE_URL}/event/status`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'PUT',
            body: JSON.stringify({
                "eventId": eventId,
                "status": "GOING"
            })
        })
    }


    const handleMaybe = () => {
        fetch(`${API_BASE_URL}/event/status`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'PUT',
            body: JSON.stringify({
                "eventId": eventId,
                "status": "MAYBE"
            })
        })
    }

    const handleNotGoing = () => {
        fetch(`${API_BASE_URL}/event/status`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'PUT',
            body: JSON.stringify({
                "eventId": eventId,
                "status": "NOT GOING"
            })
        })
    }

    const handleLeaveEvent = () => {
        fetch(`${API_BASE_URL}/event/leave`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'PUT',
            body: JSON.stringify({
                "eventId": eventId,
            })
        })
    }
    return (

        <SafeAreaView style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.backButton} source={require('../assets/backButton.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerView} >

                <Text style={styles.headerText} numberOfLines={3}>
                    <Text>{((eventName).length > 20) ?
                        (((eventName).substring(0, 20 - 3)) + '...') :
                        eventName}
                    </Text>
                    {/* {eventName} */}
                </Text>
                <View style={styles.settingsButton} >
                    <TouchableOpacity
                        onPress={() => handleLeaveEvent()}>
                        <Text style={{ color: 'red' }}>Leave Event</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.eventDetailsView}>
                <Text>
                    <Text style={styles.eventDetailsBoldText}>Host:</Text><Text style={styles.eventDetailsNormalText}> Anton</Text>
                </Text>
                <Text>
                    <Text style={styles.eventDetailsBoldText}>Location:</Text><Text style={styles.eventDetailsNormalText}> {locationList.length > 0 ? locationList[0].name : "TBD"}</Text>
                </Text>
                <Text>
                    <Text style={styles.eventDetailsBoldText}>Time:</Text><Text style={styles.eventDetailsNormalText}> {timeList.length > 0 ? <Text style={styles.timeInformationText} numberOfLines={2}>
                        <Text>{timeList[0].startDate.getHours()}:{timeList[0].startDate.getUTCMinutes() < 10 ? '0' + timeList[0].startDate.getMinutes() : timeList[0].startDate.getMinutes()}{timeList[0].startDate.getHours() > 12 ? "pm" : "am"}</Text>
                        <Text> {days[timeList[0].startDate.getDay()]}</Text>
                        <Text> {timeList[0].startDate.getDate()}{nth(timeList[0].startDate.getDate())}</Text>
                        <Text> {months[timeList[0].startDate.getMonth()]}</Text>

                    </Text> : "TBD"}</Text>
                </Text>
            </View>
            <View style={styles.choiceView}>
                <Icon.Button
                    name="check-circle"
                    size={50}
                    iconStyle={styles.upvoteButton}
                    backgroundColor="white"
                    color="green"
                    onPress={() => handleGoing()}
                ></Icon.Button>
                <Text style={styles.choiceText}> Going</Text>
                <Icon.Button
                    name="question-circle"
                    size={50}
                    iconStyle={styles.upvoteButton}
                    backgroundColor="white"
                    color="orange"

                    onPress={() => handleMaybe()}
                ></Icon.Button>
                <Text style={styles.choiceText}>Maybe</Text>
                <Icon.Button
                    name="times-circle"
                    size={50}
                    iconStyle={styles.upvoteButton}
                    backgroundColor="white"
                    color="red"
                    onPress={() => handleNotGoing()}
                ></Icon.Button>
                <Text style={styles.choiceText}> Not Going</Text>
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
        width: 180,
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
        top: "45%",
        height: "55%",
    },
    scene: {
        flex: 1,
        marginTop: 20,
        // width: "100%"

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
        marginTop: 10,
        left: "60%",
        // marginBottom: 10,
        display: 'flex',
    },
    locationInformationText: {
        bottom: -15,
        marginLeft: "20%",
        fontSize: 18,
        // lineHeight: 10,
        fontWeight: "600",
        // backgroundColor: "black",
        left: "50%",

    },
    upvoteButton: {
        left: 10,

        height: 50,

        right: 0,

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
    ,
    settingsButton: {
        position: 'absolute',
        width: 60,
        left: "60%",
        top: -5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#e5e5e5",
        borderRadius: 20,
        padding: 35,
        width: "80%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
        width: 100,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontWeight: "bold",
        marginBottom: 15,
        fontSize: 20,
        textAlign: "center"
    },
    modalInput: {
        backgroundColor: "white",
        marginBottom: 15,
        textAlign: "center",
        width: "100%",
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        // width: 00,
    },
    choiceView: {
        position: 'absolute',
        flexDirection: 'row',
        // backgroundColor: "black",
        top: "30%",
        height: 100,
        width: "80%",
    },
    choiceText: {
        fontWeight: "bold",
        lineHeight: 25,
        marginTop: 60,
        left: -50

    }

})