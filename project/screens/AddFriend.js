import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, } from 'react-native';

const dimensions = Dimensions.get('window');

//TODO - notification/red border for invalid username
const AddFriendScreen = ({ navigation }) => {
    const [username, setUsername] = React.useState('Username#0000')

    const processRequest = () => {
        // This should probably not go back, but rather it should clear the username text and give a notification.
        navigation.goBack()
    }
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headingView}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/whiteBackButton.png')} />
                </TouchableOpacity>
                <Text style={styles.heading}>Add Friend</Text>
            </View>

            <View style={styles.detailsView}>
                <Text style={styles.subHeadingText}>Add your friend on 'appname'</Text>
                <Text style={styles.explanationText}>You will need both their username and a tag. Keep in mind that username is case sensitive.</Text>
            </View>

            <View style={styles.buttonInputView}>

                <Text style={styles.usernameText}>USERNAME</Text>

                <TextInput
                    style={styles.inputBody}
                    placeholder={username}
                    onChangeUsername={text => setUserName(text)}
                    username={username}
                />
                <View style={{ alignSelf: 'flex-start', marginLeft: 20, flex: 1, flexDirection: "row" }}>
                    <Text style={styles.yourUsernameText}>Your username and tag is </Text>
                    <Text style={styles.myUsernameText}>Anton#7029</Text>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.buttonBody} onPress={processRequest}>
                        <Text style={styles.buttonText}>Send Friend Request</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}


export default AddFriendScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingView: {
        position: 'absolute',
        height: 100,
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
    backButton: {
        alignSelf: 'flex-start',
    },
    heading: {
        position: 'absolute',
        //fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FFFFFF',
    },
    detailsView: {
        width: dimensions.width,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        margin: 30
    },
    buttonInputView: {
        width: dimensions.width,
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    subHeadingText: {
        //fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#000000',
        paddingBottom: 10,
    },
    explanationText: {
        //fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: 20,
        color: '#444444',
        textAlign: 'center'
    },
    usernameText: {
        alignSelf: 'flex-start',
        //fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#444444',
        paddingLeft: 20,
    },
    inputBody: {
        paddingLeft: 20,
        width: dimensions.width - 40,
        height: 55,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#3C3C3C',
        backgroundColor: 'white',
        borderRightColor: 'black',
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
    },
    yourUsernameText: {
        //fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#444444',
    },
    myUsernameText: {
        color: '#555555',
        //fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,

    },
    buttonView: {
        flex: 5,
        width: dimensions.width,
        height: 53,
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
})