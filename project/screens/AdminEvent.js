import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, useWindowDimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
var Upvote = require('react-upvote');

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


export default function AdminEventScreen({ route, navigation }) {
    const [code, onChangeCode] = React.useState('Enter an event code');
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Guests' },
        { key: 'second', title: 'Locations' },
        { key: 'third', title: 'Times' }
    ]);
    const [eventName, setEventName] = React.useState("")
    const [currentTab, setCurrentTab] = React.useState("Guests")
    const [timeList, setTimesList] = React.useState([])
    const [locationList, setLocationList] = React.useState([])
    const [guestList, setGuestList] = React.useState([])
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newEventName, setNewEventName] = React.useState("")
    const windowHeight = useWindowDimensions().height;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [token, setToken] = React.useState('')
    const [API_BASE_URL, setAPIURL] = React.useState('')
    const [user, setUser] = React.useState({})
    const { eventId } = route.params

    // Grab all information on screen load
    React.useEffect(() => {
        (async () => {
            let api = await AsyncStorage.getItem('api')
            let token2 = await AsyncStorage.getItem('userToken')
            let userid = await AsyncStorage.getItem('userId');

            getCurrentUser(api, token2)
            setToken(token2)
            setAPIURL(api)
            getEventDetails(api, token2, userid)
        })()
    }, [])

    const getEventDetails = (api, token, userid) => {
        fetch(`${api}/event/${eventId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'GET',
        }).then(res => res.json())
            .then(body => {
                setEventName(body.event.name)
                convertLocationList(userid, body.event.locations)
                convertTimeList(userid, body.event.times)
                convertGuestList(api, token, body.event.guests)
                // setGuestsCanAddTimes(body.event.permissions.guestsCanAddTimes)
                // setGuestsCanAddLocations(body.event.permissions.guestsCanAddLocations)
                // setGuestsCanInvitePeople(body.event.permissions.guestsCanInvitePeople)
                forceUpdate()
            })

    }

    // Convert backend location list format to a more friendly frontend format
    const convertLocationList = (userid, locations) => {
        let temp = []
        Object.keys(locations).map(location => {

            let hasVoted = false
            if (locations[location].includes(userid)) {
                hasVoted = true
            }
            temp.push({ name: location, votes: locations[location].length, hasVoted: hasVoted })

            setLocationList(temp)
            forceUpdate()
        })


    }

    // Convert backend time list format to a more friendly frontend format
    const convertTimeList = (userid, times) => {
        let temp = []
        times.map(time => {
            let hasVoted = false
            if (time.voters.includes(userid)) {
                hasVoted = true
            }
            temp.push({ startDate: new Date(time.start), endDate: new Date(time.end), votes: time.voters.length, hasVoted: hasVoted })
            setTimesList(temp)
            forceUpdate()
        })

    }

    // Convert backend guest list format to a more friendly frontend format
    const convertGuestList = (api, token, guests) => {
        let temp = []
        // console.log("Test" + api)
        Object.keys(guests).map(guest => {
            fetch(`${api}/user/${guest}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token
                },
                method: 'GET',
            }).then(res => res.json())
                .then(body => {
                    temp.push({ username: body.user.name, status: guests[guest] })
                    setGuestList(temp)
                    forceUpdate()
                })
        })


    }

    // Get information about the current user 
    const getCurrentUser = (api, token) => {
        fetch(`${api}/user`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'GET',
        }).then(res => res.json())
            .then(body => {
                setUser(body.user)
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
    // Handles the onClick event for when a user votes on a location
    const handleAddLocationVote = (location) => {
        let tempList = locationList

        tempList.map(l => {
            if (l.name === location.name) {
                fetch(`${API_BASE_URL}/event/${l.hasVoted ? 'unvote' : 'vote'}/location`, {
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

                if (l.hasVoted) {
                    l.votes--
                } else {
                    l.votes++
                }

                l.hasVoted = !l.hasVoted
            }
        })
        tempList.sort((a, b) => {
            return b.votes - a.votes
        })
        setLocationList(tempList)
        forceUpdate()
    }

    // Handles the onClick event for when a user votes on a time
    const handleAddTimeVote = (time) => {
        let tempList = timeList

        tempList.map(t => {
            if (t.startDate === time.startDate) {
                fetch(`${API_BASE_URL}/event/${t.hasVoted ? 'unvote' : 'vote'}/location`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': token
                    },
                    method: 'PUT',
                    body: JSON.stringify({
                        "eventId": eventId,
                        "location": t.name,
                    })
                })

                if (t.hasVoted) {
                    t.votes--
                } else {
                    t.votes++
                }

                t.hasVoted = !t.hasVoted
            }
        })
        tempList.sort((a, b) => {
            return b.votes - a.votes
        })
        setTimesList(tempList)
        forceUpdate()
    }

    // This is to control which scene is being shown in our tab view
    const renderScene = ({ route }) => {

        switch (route.key) {
            case 'first':
                return (
                    <ScrollView style={[styles.scene, { backgroundColor: 'white' }]} >
                        {guestList.map((guest) => {
                            return (
                                <Text style={styles.guestInformationText}>
                                    {guest.status === "MAYBE" ? <Icon
                                        name="question"
                                        size={30}
                                        backgroundColor="white"
                                        color="orange"
                                    >
                                    </Icon> :
                                        <Icon
                                            name="check"
                                            size={30}
                                            backgroundColor="white"
                                            color="green"
                                        >
                                        </Icon>
                                    }
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
                                        name={location.hasVoted ? "chevron-down" : "chevron-up"}
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
                                        name={time.hasVoted ? "chevron-down" : "chevron-up"}
                                        size={30}
                                        iconStyle={styles.upvoteButton}
                                        backgroundColor="white"
                                        color="black"
                                        onPress={() => {
                                            handleAddTimeVote(time)
                                        }}
                                    ><Text> {time.votes}</Text></Icon.Button>
                                    <Text style={styles.timeInformationText} numberOfLines={2}>
                                        <Text>{time.startDate.getHours()}:{time.startDate.getUTCMinutes() < 10 ? '0' + time.startDate.getMinutes() : time.startDate.getMinutes()}{time.startDate.getHours() > 12 ? "pm" : "am"}</Text>
                                        <Text> {days[time.startDate.getDay()]}</Text>
                                        <Text> {time.startDate.getDate()}{nth(time.startDate.getDate())}</Text>
                                        <Text> {months[time.startDate.getMonth()]}</Text>

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

    // when a time is added on the add time screen, we want it to update this screen's state
    // we pass this function as a props to our add time screen
    const handleDateTimeChange = (startDate, endDate) => {

        // Add new time to time list
        let temp = timeList
        // Check for duplicate times

        if (timeList.filter(t => t.startDate.getTime() === startDate.getTime()).length === 0) {
            temp.push({ startDate: startDate, endDate: endDate, votes: 0, hasVoted: false })
        }
        setTimesList(temp)


        // send post request api
        fetch(`${API_BASE_URL}/event/time`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'POST',
            body: JSON.stringify({
                "eventId": eventId,
                "start": startDate,
                "end": endDate
            })
        })


        forceUpdate()
    }

    // when a location is added on the add location screen, we want it to update this screen's state
    // we pass this function as a props to our add location screen
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
                    temp.push({ name: location, votes: 0, hasVoted: false })

                    // send post request api
                    fetch(`${API_BASE_URL}/event/location`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': token
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            "eventId": eventId,
                            "location": location,
                        })
                    })
                }
            }
        })
        setLocationList(temp)

        forceUpdate()
    }
    // when a guest is added on the add guest screen, we want it to update this screen's state
    // we pass this function as a props to our add guest screen
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
                if (filteredList.indexOf(guest.username) === -1) {
                    filteredList.push(guest.username)
                    temp.push({ username: guest.username, id: guest.id, status: "MAYBE" })
                    // send post request api
                    fetch(`${API_BASE_URL}/event/invite`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': token
                        },
                        method: 'PUT',
                        body: JSON.stringify({
                            "eventId": eventId,
                            "userId": guest.id
                        })
                    }).then(res => res.json())
                        .then(body => console.log(body))
                }
            }
        })

        setGuestList(temp)
        forceUpdate()
    }

    const onChangeText = (text) => {
        setNewEventName(text)
    }

    // Handles the event when the event name is changed
    const handleEventNameChange = (newEventName) => {
        fetch(`${API_BASE_URL}/event/settings`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },
            method: 'PUT',
            body: JSON.stringify({
                "eventId": eventId,
                "newName": newEventName
            })
        })
        setEventName(newEventName)
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
                <View style={styles.editButton} >
                    <Icon.Button
                        name="edit"
                        size={30}
                        backgroundColor="white"
                        color="black"
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                    </Icon.Button>
                </View>
                <View style={styles.settingsButton} >
                    <Icon.Button
                        name="gear"
                        size={30}
                        backgroundColor="white"
                        color="black"
                        onPress={() => navigation.navigate('EventSettings', { eventId: eventId })}
                    >
                    </Icon.Button>
                </View>
            </View>
            <View style={styles.eventDetailsView}>
                <Text>
                    <Text style={styles.eventDetailsBoldText}>Host:</Text><Text style={styles.eventDetailsNormalText}> {user.name}</Text>
                </Text>
                <Text>
                    <Text style={styles.eventDetailsBoldText}>Location:</Text><Text style={styles.eventDetailsNormalText}> {locationList.length > 0 ? locationList[0].name : "TBD"}</Text>
                </Text>
                <Text>
                    <Text style={styles.eventDetailsBoldText}>Time:</Text>
                    <Text style={styles.eventDetailsNormalText}>
                        {
                            timeList.length > 0 ?
                            <Text style={styles.timeInformationText} numberOfLines={2}>
                                <Text>{timeList[0].startDate.getHours()}:{timeList[0].startDate.getUTCMinutes() < 10 ? '0' + timeList[0].startDate.getMinutes() : timeList[0].startDate.getMinutes()}{timeList[0].startDate.getHours() > 12 ? "pm" : "am"}</Text>
                                <Text> {days[timeList[0].startDate.getDay()]}</Text>
                                <Text> {timeList[0].startDate.getDate()}{nth(timeList[0].startDate.getDate())}</Text>
                                <Text> {months[timeList[0].startDate.getMonth()]}</Text>
                            </Text> : "TBD"
                        }
                    </Text>
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
                        handleLocationChange: handleLocationChange, handleDateTimeChange: handleDateTimeChange, handleGuestChange: handleGuestChange,
                        guestList: guestList, locationList: locationList, eventId: eventId
                    })}>
                    <Text style={styles.buttonText}>Add {currentTab}</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{eventName}</Text>
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={text => onChangeText(text)}
                            value={newEventName}
                        />
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#2196F3", width: 150, }}
                            onPress={() => {
                                handleEventNameChange(newEventName)
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Save & Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "red" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        top: "32%",
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
    }

})