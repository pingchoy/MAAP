import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Searchbar  } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

const dimensions = Dimensions.get('window');

export default function Events({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  const [fetchedData, setFetchedData] = React.useState([])
  const [token, setToken] = React.useState('')
  const [API_BASE_URL, setAPIURL] = React.useState('')
  const [myEventIds, setMyEventIds] = React.useState('')
  const isVisible = useIsFocused()

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
        let userToken = await AsyncStorage.getItem('userToken');
        let api = await AsyncStorage.getItem('api');
        setToken(userToken)
        setAPIURL(api)
        getInvites(userToken, api)

    };
    
    const getInvites = (userToken, api) => {
      fetch(`${api}/user/invites` , {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'GET',
      }).then(res=>res.json())
      .then(body=>{
        if (body.error !== undefined){
          //error stuff
        } else{
          setMyEventIds(body.eventIds)
          parseEvents(body.eventIds, userToken, api)
        }
      })
      .catch(err=>alert(err))
    }
    const parseEvents = (eventIds, userToken, api) => {
      let allEvents = []
      eventIds.forEach((id) => {
        fetch(`${api}/event/${id}` , {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          path: {
            eventId:`${id}`
          },
          method: 'GET',
        }).then(res=>res.json())
        .then(body=>{
          
          if (body.error !== undefined){
            //error stuff
          } else{
            //addToEventsJSON(body.event)
            allEvents.push(body.event)
          }
        })
        .catch(err=>alert(err))
      })
      setFetchedData(allEvents)
      setFilteredData(allEvents)
    }

    bootstrapAsync();
  }, [isVisible]);

  const searchFilterFunction = (text) => {
    if (text){
      // Inserted text is not blank
      // Filter the initial data
      // Update filteredDate
      const newData = fetchedData.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchQuery(text);
    } else {
      // Inserted text is blank
      // Update filteredData with the original
      setFilteredData(fetchedData);
      setSearchQuery(text);
    }
  }

  const getHostName = (hostId) => {
    fetch(`${API_BASE_URL}/user/${hostId}`, {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      method: 'GET',
    }).then(res => res.json())
      .then(body => {
          return body.user.name
    })
  }

  const getLocation = (locations) => {
    let sortedLocations = locations.sort(function(a, b) {
      return a.voters.length - b.voters.length
    });
    if (sortedLocations.length <= 0) {
      return 'TBD'
    }
    return Object.keys(sortedLocations)[0]
  }
  // Turns Date into readable format
  const getTime = (times) => {
 
    let sortedTimes = times.sort(function(a, b) {
      return a.voters.length - b.voters.length
    });
    if (sortedTimes.length <= 0 || sortedTimes[0].start === null) {
      return 'TBD'
    }

    return (new Date(sortedTimes[0].start)).toString()

  }

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.bannerView}>
        <View style={styles.headingView}>
          <Text style={styles.heading}>Incoming Invites</Text>
        </View>
        <View style={styles.searchBarView}>
          <Searchbar
            placeholder="Search"
            onChangeText={searchFilterFunction}
            value={searchQuery}
            style={styles.searchBar}
          />
        </View>  
      </View>
      <ScrollView style={styles.listsView}>
        {filteredData.map((d) => {
          return (
            <View style={styles.inviteView}>
              <View style={styles.inviteDetails}> 

                <Text style={styles.inviteTitle}> {d.name} </Text>

                <View style={styles.textView}>
                  <Text style={styles.boldText}>Host: </Text>
                  <View style={{flex: 1}}>
                    <Text ellipsizeMode='tail'  numberOfLines={1} style={styles.dataText}>{getHostName(d.host)}</Text>
                  </View>
                </View>
                <View style={styles.textView}>
                  <Text style={styles.boldText}>Location: </Text>
                  <View style={{flex: 1}}>
                    <Text ellipsizeMode='tail'  numberOfLines={1} style={styles.dataText}>{getLocation(d.locations)}</Text>
                  </View>
                </View>
                <View style={styles.textView}>
                  <Text style={styles.boldText}>Time: </Text>
                  <Text ellipsizeMode='tail' numberOfLines={1} style={styles.dataText}>{getTime(d.times)}</Text>

                </View>
              </View>
              <View style={styles.inviteButtons}>
                <TouchableOpacity style={styles.acceptButton} onPress={()=>console.log("Accept" +d.code)}>
                  <Text style={styles.inviteButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineButton} onPress={()=>console.log("Decline" +d.code)}>
                  <Text style={styles.inviteButtonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}

      </ScrollView>

      <View style={styles.codeView}>
        <Text style={styles.codeText}>Have a Code? Enter event code </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateEvent')}>
          <Text style={styles.codeText, styles.codeTextLink}>here</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inviteView:{  // Whole invite view
    width: dimensions.width,
    height: 110,
    borderBottomColor: "2px solid rgba(0, 0, 0, .3)",
    borderBottomWidth: 1,
    flexDirection: 'row',

  },
  inviteDetails: {  // View for all the text details
    flex: 2,
    marginHorizontal: 30,
    justifyContent:'center',
    alignItems: 'flex-start'
  },
  inviteButtons:{ // View for the buttons
    flex: 1,
    marginHorizontal: 30,
    alignItems: 'flex-end',
    justifyContent: "space-around",
  },
  acceptButton:{
    borderRadius: 25,
    backgroundColor: '#165f22',
    width: 110,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    borderRadius: 25,
    backgroundColor: '#b10b0b',
    width: 110,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    color: 'white',
  },
  inviteTitle: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 24,
    position: 'relative',
    left: -4
  },
  textView: { // View for both bold and italicised text e.g. Host: Tim
    alignItems:'center',
    flexDirection: 'row'
  },
  boldText:{  // Host: 
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
  },
  dataText:{  // Tim
    fontSize: 16,
    lineHeight: 20,
    fontStyle: 'italic',
    
  },

  listsView: {  // Contains every list
    width: dimensions.width,
    position: 'absolute',
    top:150,
    flex: 1,
    height: dimensions.height - 310,
  },
  codeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50, 
    position: 'absolute',
    bottom: 0,
    width: dimensions.width,
  },
  codeText : {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
  },
  codeTextLink : {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    color: '#165f22',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: dimensions.width-40,
    borderRadius: 25
  },
  bannerView: {
    position: 'absolute',
    height: 150,
    width: dimensions.width,
    top: 0,
    backgroundColor: '#165f22',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.75,
    shadowRadius: 3,
    elevation: 5,
  },
  // Event text and button
  headingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  heading: {
    position: 'absolute',
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  searchBarView : {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
