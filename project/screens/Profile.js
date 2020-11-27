import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Text, SafeAreaView, Image, View, ScrollView } from 'react-native';
import { AuthContext } from '../App';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const dimensions = Dimensions.get('window');

export default function Profile({ navigation }) {

  const [friends, setFriends] = React.useState([{ username: "Brad#1314" }, { username: "Andrew#439" }])
  const { signOut } = React.useContext(AuthContext);

  return (

    <SafeAreaView style={styles.container}>
        <Image style={styles.banner} source={require('../assets/profileBanner.png')}/>
        
        <View style={styles.headingView}>
          <Text style={styles.heading}>Anton#7029</Text>
          <Image style={styles.profilePicture} source={require('../assets/profilePicture.png')}/>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')} >
            <MaterialCommunityIcons style={styles.settings} name="settings" color={"#165F22"} size={50} />
          </TouchableOpacity>
        </View>

        <View style={styles.subheadingView}>
          <Text style={styles.friendsText}>Friends</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons style={styles.plus} name="plus" color={"#165F22"} size={50}/>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.listsView}>
                {friends.map((friend) => {
                    return (
                        <View style={styles.friendDetailsRow}>
                            <View style={styles.friendDetails}><Icon
                                name="user-circle-o"
                                size={30}
                            >  {friend.username}
                            </Icon>
                            </View>
                        </View>
                    )
                })}

            </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    banner: {
      position: 'absolute',
      height: 300,
      width: dimensions.width,
      top: 0,
      aspectRatio: 3/2,
    },
    headingView: {
      flex: 1,
      position: 'absolute',
      width: "100%",
      justifyContent: 'center',
      // alignItems: 'center',
      textAlign: 'center',
      top: 80,
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
        textAlign: 'center',
        color: '#3C3C3C',
        alignSelf: "center",
    },
    subheadingView: {
      position: 'absolute',
      //fontFamily: 'Roboto',
      top: '40%',
      width: "100%",
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 32,
      lineHeight: 37,
      textAlign: 'center',
      color: '#3C3C3C',
      alignSelf: "center",
    },
    settings: {
      position: 'absolute',
      right: 25,
      top: -10,
    },
    profilePicture: {
      position: "absolute",
      alignSelf: 'center',
      top: dimensions.height/20,
    },
    listsView: {
      width: dimensions.width,
      position: 'absolute',
      top: "47%",
      flex: 1,
      height: dimensions.height - 240,
      left: "10%"
    },
    friendsText: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 25,
      lineHeight: 24,
      color: '#3C3C3C',
      left: "10%",
      top: "10%"
    },
    plus: {
      left: "80%",
      top: "-60%",
    }
});
