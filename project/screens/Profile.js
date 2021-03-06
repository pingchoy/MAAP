import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Text, SafeAreaView, Image, View, ScrollView } from 'react-native';
import { AuthContext } from '../App';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const dimensions = Dimensions.get('window');

export default function Profile({ navigation }) {
  const [friends, setFriends] = React.useState([])
  const [token, setToken] = React.useState('')
  const [API_BASE_URL, setAPIURL] = React.useState('')
  const [myName, setMyName] = React.useState('')
  const [myId, setMyId] = React.useState('')
  const isVisible = useIsFocused()
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const { signOut } = React.useContext(AuthContext);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken = await AsyncStorage.getItem('userToken');
      let api = await AsyncStorage.getItem('api');
      let id = await AsyncStorage.getItem('userId')
      setToken(userToken)
      setAPIURL(api)
      setMyId(id)
      getFriends(userToken, api)
      getMyName(userToken, api)
    };

    const getFriends = (userToken, api) => {
      fetch(`${api}/user/friends`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'GET',
      }).then(res => res.json())
        .then(body => {
          if (body.error !== undefined) {
            //error stuff
          } else {
            parseFriends(body.userIds, userToken, api)
          }
        })
        .catch(err => alert(err))
    }
    const parseFriends = (friendIds, userToken, api) => {
      let allFriends = []
      friendIds.forEach((id) => {
        fetch(`${api}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          path: {
            userId: `${id}`
          },
          method: 'GET',
        }).then(res => res.json())
          .then(body => {

            if (body.error !== undefined) {
              //error stuff
            } else {
              //addToEventsJSON(body.event)
              allFriends.push(body.user)
              setFriends(allFriends)
              forceUpdate()
            }
          })
          .catch(err => alert(err))
      })

    }
    const getMyName = (userToken, api) => {
      fetch(`${api}/user`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'GET',
      }).then(res => res.json())
        .then(body => {
          if (body.error !== undefined) {
            //error stuff
          } else {
            setMyName(body.user.name)
          }
        })
        .catch(err => alert(err))
    }
    bootstrapAsync();
  }, [isVisible]);

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.bannerView}>
        <View style={styles.headingView}>
          <Text style={styles.heading}>{myName}</Text>
          <TouchableOpacity style={styles.settings} onPress={() => { navigation.navigate('ProfileSettings') }} >
            <MaterialCommunityIcons name="settings" color={"#165F22"} size={50} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Image style={styles.profilePicture} source={require('../assets/profilePicture.png')} />
        </View>
        <View style={styles.idView}>
          <Text style={styles.yourIDText} >Your ID: </Text>
          <Text style={styles.yourID} >{myId}</Text>
        </View>
      </View>

      <View style={styles.contentView}>
        <View style={styles.subheadingView}>
          <Text style={styles.subHeading}>Friends</Text>
          <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", paddingRight: 20 }} onPress={() => navigation.navigate('AddFriend')}>
            <MaterialCommunityIcons name="plus" color={"#165F22"} size={50} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.listsView}>
          {friends && friends.map(friend => {
            console.log(friend)
            return (
              <View style={styles.friendView}>
                <Icon
                  name="user-circle-o"
                  size={60}
                />
                <Text style={styles.friendName}>{friend.name}</Text>
              </View>
            )
          })}

        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerView: {
    position: 'absolute',
    height: 266,
    width: dimensions.width,
    top: 0,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.75,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: '#FFFFFF',
  },
  headingView: {
    flex: 1,
    width: dimensions.width,
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  },
  settings: {
    position: 'absolute',
    right: 20,
    top: 22,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    top: 22,
  },
  profilePicture: {
    height: 100,
    width: 100,
    alignSelf: "center"
  },
  idView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 40
  },
  contentView: {
    position: 'absolute',
    top: 266,
    width: dimensions.width,
    height: dimensions.height - 356,
    flex: 1,

  },
  subheadingView: {
    paddingLeft: 40,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    position: 'absolute',
    height: 70,
    width: dimensions.width,

  },
  subHeading: {

    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 24,
    color: '#3C3C3C',

  },
  listsView: {
    width: dimensions.width,
    position: 'absolute',
    flex: 1,
    height: dimensions.height - 426,
    bottom: 0,
    paddingLeft: 40,
  },
  friendView: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: 'center',
  },
  friendName: {
    paddingLeft: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 23,
  },
  yourIDText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,

  },
  yourID: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
  }
});
