import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List, Searchbar } from 'react-native-paper';
import { } from 'react-native-gesture-handler'

const dimensions = Dimensions.get('window');

// Can keep past boolean if we don't want to check if it's before current date
// Need to add onPress methods for each event 
const data = [
  {
    title: 'Movie at Matthew\'s',
    description: '7pm-9pm, 25th Nov. 2020',
    owner: false,
    past: false
  },
  {
    title: 'Anton\'s House',
    description: '7pm-9pm, 26th Nov. 2020',
    owner: true,
    past: false
  },
  {
    title: 'Dinner Date',
    description: '7pm-9pm, 10th Oct. 2020',
    owner: true,
    past: true
  },

]


export default function Events({ navigation }) {
  const [expandedUpcoming, setExpandedUpcoming] = React.useState(true);
  const [expandedPast, setExpandedPast] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);

  const searchFilterFunction = (text) => {
    if (text) {
      // Inserted text is not blank
      // Filter the initial data
      // Update filteredDate
      const newData = data.filter(function (item) {
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
      setFilteredData(data);
      setSearchQuery(text);
    }
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
            {filteredData.map(d => {
              if (!d.past) {
                if (d.owner) {
                  return (
                    <List.Item
                      title={d.title}
                      description={d.description}
                      style={styles.accordionItem}
                      right={props => <Image {...props} style={{ height: 50, width: 50 }} source={require('../assets/AdminImage.png')}></Image>}
                    />
                  )
                }
                else {
                  return (
                    <TouchableOpacity
                      onPress={() => { navigation.navigate("GuestEvent") }}>
                      <List.Item
                        title={d.title}
                        description={d.description}
                        style={styles.accordionItem}
                      />
                    </TouchableOpacity>
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
            {filteredData.map(d => {
              if (d.past) {
                if (d.owner) {
                  return (
                    <List.Item
                      title={d.title}
                      description={d.description}
                      style={styles.accordionItem}
                      right={props => <Image {...props} style={{ height: 50, width: 50 }} source={require('../assets/AdminImage.png')}></Image>}
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
            {filteredData.map(d => {
              if (d.past) {
                if (d.owner) {
                  return (
                    <List.Item
                      title={d.title}
                      description={d.description}
                      style={styles.accordionItem}
                      right={props => <List.Icon {...props} icon="crown" color="#165f22" />}
                    />
                  )
                }
                else {
                  return (
                    <TouchableOpacity
                      onPress={() => { navigation.navigate("GuestEvent") }}>
                      <List.Item
                        title={d.title}
                        description={d.description}
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
