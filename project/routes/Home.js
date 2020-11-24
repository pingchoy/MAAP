import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/Profile';


function EventsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Events!</Text>
    </View>
  );
}

function InvitesScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Invites!</Text>
      </View>
    );
  }

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Invites" component={InvitesScreen} />
      </Tab.Navigator>
  );
}

export default Home;