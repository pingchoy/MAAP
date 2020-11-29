import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SearchBar, withTheme } from 'react-native-elements'

const dimensions = Dimensions.get('window');
const { height } = Dimensions.get('window');



export default function AddFriendScreen({ route, navigation }) {

    const [friends, setFriends] = React.useState([{ username: "Brad#1314", disabled: false }, { username: "Andrew#439", disabled: false }])
    const [invitedFriends, setInvitedFriends] = React.useState([])
    const [search, setSearch] = React.useState('')
    const windowHeight = useWindowDimensions().height;
    const { guestList, handleGuestChange } = route.params

    const updateSearch = (search) => {
        setSearch(search);
    };

    const handleInviteGuest = friend => {
        // Disable button
        let prevFriends = friends
        prevFriends[prevFriends.findIndex(obj => obj.username === friend.username)].disabled = true
        setFriends(prevFriends)

        // Add new location to list
        // Filter list
        let temp = invitedFriends
        temp.push(friend.username)
        let filteredTemp = []
        temp.map(friend => {
            if (friend) {
                if (filteredTemp.indexOf(friend) === -1) {
                    filteredTemp.push(friend)
                }
            }
        })
        setInvitedFriends(filteredTemp)
    }

    return (

        <SafeAreaView style={[styles.container, { minHeight: Math.round(windowHeight) }]}>

            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.backButton} source={require('../assets/backButton.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerView} >

                <Text style={styles.headerText}>Add Friends</Text>
                <View style={styles.checkButton} >
                    <Icon.Button
                        // Change this onPress to affect state of guests later on
                        onPress={() => {
                            handleGuestChange(invitedFriends)
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
            <View style={styles.searchBarView}>
                <SearchBar
                    placeholder="Search..."
                    onChangeText={updateSearch}
                    value={search}
                    lightTheme
                    containerStyle={{ borderRadius: 30, }}
                    inputContainerStyle={{ backgroundColor: 'transparent', height: 30, }}
                />
            </View>
            <ScrollView style={styles.friendListRowView}>
                {friends.map((friend) => {
                    if (guestList.filter(f => f.username === friend.username).length === 0) {
                        return (
                            <View style={styles.friendDetailsRow}>
                                <View style={styles.friendDetails}><Icon
                                    name="user-circle-o"
                                    size={30}
                                >  {friend.username}
                                </Icon>
                                </View>

                                <View style={styles.inviteButtonView}>
                                    <TouchableOpacity disabled={friends[friends.findIndex(obj => obj.username === friend.username)].disabled} style={styles.buttonBody} onPress={() => handleInviteGuest(friend)}
                                        style={friends[friends.findIndex(obj => obj.username === friend.username)].disabled ? styles.disabledButtonBody : styles.buttonBody}
                                    >
                                        <Text style={styles.buttonText}>Invite</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                })}

            </ScrollView>

            <View style={styles.inviteCodeView}
            >
                <Text style={styles.subtitle}>Or, send an invite link to a friend</Text>
                <Text>
                    <Text style={styles.codeText}>k7MA3 </Text><Icon.Button name="copy" iconStyle={{ top: 5, }} color='black' backgroundColor='transparent' size={50}></Icon.Button>
                </Text>
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
    checkButton: {
        position: 'absolute',
        width: 70,
        left: "60%",
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
    disabledButtonBody: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: -6,
        bottom: 0,
        /* darkgreen */
        height: 40,
        backgroundColor: '#165F22',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5

    },
    buttonBody: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: -6,
        bottom: 0,
        /* darkgreen */
        height: 40,
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
    friendDetails: {
        left: 0,
        // top: -5
    },
    friendDetailsRow: {
        marginTop: 15,
        marginBottom: 15
    },
    friendListRowView: {
        position: 'absolute',
        left: 20,
        width: "100%",
        top: "22%"
    },
    inviteButtonView: {
        position: 'absolute',
        left: "60%",
        width: "30%",
        right: 0,

    },
    searchBarView: {
        position: 'absolute',
        top: "15%",
        width: "80%",
        // height: 20,
        // backgroundColor: 'white'

    },
    inviteCodeView: {
        flex: 1,
        bottom: "-70%"
    },
    subtitle: {
        lineHeight: 21,
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#3C3C3C'
    },
    codeText: {
        // marginTop: 10,
        fontWeight: "bold",
        fontSize: 48,
        color: '#165F22',
    }





})