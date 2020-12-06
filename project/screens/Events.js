import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";
import { List, Searchbar } from 'react-native-paper';
import { } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';

const dimensions = Dimensions.get('window');

export default function Events({ navigation }) {
  const [expandedUpcoming, setExpandedUpcoming] = React.useState(false);
  const [expandedPast, setExpandedPast] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  const [fetchedData, setFetchedData] = React.useState([]);
  const [currentUserId, setCurrentUserId] = React.useState('');
  const isVisible = useIsFocused()
  const searchFilterFunction = (text) => {
    if (text) {
      // Inserted text is not blank
      // Filter the initial data
      // Update filteredDate
      const newData = fetchedData.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
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

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken = await AsyncStorage.getItem('userToken');
      let api = await AsyncStorage.getItem('api');
      let userId = await AsyncStorage.getItem('userId');
      setCurrentUserId(userId)
      getEvents(userToken, api)
    };
    setExpandedPast(false)
    setExpandedUpcoming(false)
    const getEvents = (userToken, api) => {

      fetch(`${api}/event/joined`, {
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
            parseEvents(body.eventIds, userToken, api)

          }
        })

    }
    const parseEvents = (eventIds, userToken, api) => {
      let allEvents = []
      eventIds.forEach((id) => {
        fetch(`${api}/event/${id}`, {
          headers: {
            Authorization: userToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          path: {
            eventId: `${id}`
          },
          method: 'GET',
        }).then(res => res.json())
          .then(body => {

            if (body.error !== undefined) {
              //error stuff
            } else {
              //addToEventsJSON(body.event)

              body.event['eventId'] = id
              allEvents.push(body.event)
            }
          })
          .catch(err => alert(err))
      })
      setFetchedData(allEvents)
      setFilteredData(allEvents)
    }

    bootstrapAsync();
  }, [isVisible]);

  const getMostUpvotedTime = (times) => {
    if (times.length <= 0) {
      return 'TBD'
    }
    let sortedTimes = times.sort(function (a, b) {
      return a.voters.length - b.voters.length

    });
    return new Date(sortedTimes[0].end)
  }

  // Turns Date into readable format
  const getTime = (times) => {

    let sortedTimes = times.sort(function (a, b) {
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
          <Text style={styles.heading}>Events</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateEvent')}>
            <Ionicons name='md-add' size={65} color='white' />
          </TouchableOpacity>
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
        <List.Section style={{ flex: 1 }}>
          <List.Accordion
            title="Upcoming"
            style={{ flex: 1, marginHorizontal: 10 }}
            titleStyle={styles.accordionTitle}
            theme={{ colors: { primary: '#000' } }}
            expanded={expandedUpcoming}
            onPress={() => setExpandedUpcoming(!expandedUpcoming)}>
            {filteredData && filteredData.map(d => {
              let time = getMostUpvotedTime(d.times)
              if (time >= new Date() || time === 'TBD') {
                console.log(d.host)
                console.log("currentUserId = " + currentUserId)
                if (d.host === currentUserId) {
                  return (
                    <List.Item
                      key={d.code}
                      onPress={() => navigation.navigate("AdminEvent", { eventId: d.eventId })}
                      title={d.name}
                      description={getTime(d.times)}
                      style={styles.accordionItem}
                      right={props => <Image {...props} style={{ height: 50, width: 50 }} source={require('../assets/AdminImage.png')}></Image>}
                    />
                  )
                }
                else {
                  return (
                    <List.Item
                      onPress={() => { navigation.navigate("GuestEvent", { eventId: d.eventId }) }}
                      key={d.code}
                      title={d.name}
                      description={getTime(d.times)}
                      style={styles.accordionItem}
                    />
                  )
                }
              }
            })}
          </List.Accordion>

          <List.Accordion
            title="Past"
            style={styles.accordion}
            titleStyle={styles.accordionTitle}
            theme={{ colors: { primary: '#000' } }}
            expanded={expandedPast}
            onPress={() => setExpandedPast(!expandedPast)}>
            {filteredData && filteredData.map(d => {
              let time = getMostUpvotedTime(d.times)
              if (time !== 'TBD' && time < new Date()) {
                if (d.host === currentUserId) {
                  return (
                    <List.Item
                      onPress={() => { navigation.navigate("AdminEvent", { eventId: d.eventId }) }}
                      key={d.code}
                      title={d.name}
                      description={getTime(d.times)}
                      style={styles.accordionItem}
                      right={props => <Image {...props} style={{ height: 50, width: 50 }} source={require('../assets/AdminImage.png')}></Image>}
                    />
                  )
                }
                else {
                  return (
                    <TouchableOpacity
                      onPress={() => { navigation.navigate("GuestEvent", { eventId: d.eventId }) }}>
                      <List.Item
                        key={d.code}
                        title={d.name}
                        description={getTime(d.times)}
                        style={styles.accordionItem}
                      />
                    </TouchableOpacity>
                  )
                }
              }
            })}
          </List.Accordion>

        </List.Section>

      </ScrollView>


      <StatusBar style="auto" />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  adminText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listsView: {
    width: dimensions.width,
    position: 'absolute',
    top: 140,
    flex: 1,
    height: dimensions.height - 240,
  },
  accordion: {
    flex: 1,
    borderTopColor: "2px solid rgba(0, 0, 0, .1)",
    borderTopWidth: 1,
    marginHorizontal: 10,
  },
  accordionTitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,

  },
  accordionItem: {
    marginHorizontal: 10,
  },

  searchBar: {
    width: dimensions.width - 40,
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
    shadowOpacity: 0.75,
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
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },

  searchBarView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },


});
