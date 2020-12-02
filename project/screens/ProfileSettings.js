import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Text, SafeAreaView, View, Image } from 'react-native';
import { AuthContext } from '../App';
import { List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const dimensions = Dimensions.get('window');

export default function ProfileSettings({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (

    <SafeAreaView style={styles.container}>
        <View style={styles.bannerView}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../assets/whiteBackButton.png')} />
            </TouchableOpacity>
            <Text style={styles.heading}>Settings</Text>

        </View>

        <View style={styles.settingsView}>
            <List.Section style={{ paddingLeft: 20, width: dimensions.width,}}>
                <List.Subheader>User Settings</List.Subheader>
                <List.Item title="My Account" left={() => <List.Icon icon="account" />} />
                <List.Item
                    title="Privacy & Safety"
                    left={() => <List.Icon color="#000" icon="shield" />}
                />
            </List.Section>
            <List.Section style={{ paddingLeft: 20, width: dimensions.width,}}>
                <List.Subheader>App Settings</List.Subheader>
                <List.Item title="Notifications" left={() => <List.Icon icon="bell" />} />
                <List.Item
                    title="Language"
                    left={() => <List.Icon color="#000" icon="translate" />}
                />
            </List.Section>
        </View>

        <View style={styles.bottomButtonView}>
            <TouchableOpacity style={styles.logoutButtonBody} onPress={() => signOut()} >
                <Text style={styles.buttonText}>Logout</Text>
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
        shadowOpacity:  0.75,
        shadowRadius: 3,
        elevation: 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: 20,
      },
    settingsView: {
        height: dimensions.height-245, 
        position: 'absolute',
        top: 125,
        width: dimensions.width,
        justifyContent: 'center',
        alignItems: 'center',


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
    logoutButtonBody: {
        position: 'absolute',
        width: dimensions.width-60,
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
