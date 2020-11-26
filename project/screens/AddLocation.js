import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SearchBar, withTheme } from 'react-native-elements'

const dimensions = Dimensions.get('window');
const { height } = Dimensions.get('window');



export default function AddLocationScreen({ navigation }) {

    const [locations, setLocations] = React.useState([{ name: "UNSW library" }, { name: "Anton's House" }])
    const [search, setSearch] = React.useState('')
    const windowHeight = useWindowDimensions().height;

    const updateSearch = (search) => {
        setSearch(search);
    };

    return (

        <SafeAreaView style={[styles.container, { minHeight: Math.round(windowHeight) }]}>

            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.backButton} source={require('../assets/backButton.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerView} >

                <Text style={styles.headerText}>Add Locations</Text>
                <View style={styles.checkButton} >
                    <Icon.Button
                        // Change this onPress to affect state of guests later on
                        onPress={() => navigation.goBack()}
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
                {locations.map((location) => {
                    return (
                        <View style={styles.friendDetailsRow}>
                            <View style={styles.friendDetails}>
                                <Text style={styles.locationText}> {location.name}
                                </Text>
                            </View>

                            <View style={styles.inviteButtonView}>
                                <TouchableOpacity style={styles.buttonBody}>
                                    <Text style={styles.buttonText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}

            </ScrollView>
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
        marginTop: 30,
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
    locationText: {
        left: 20,
        fontSize: 20,
        lineHeight: 24,
        fontWeight: 'bold',
    }






})