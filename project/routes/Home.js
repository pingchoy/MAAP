import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/Profile';
import { Ionicons } from '@expo/vector-icons';

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
      <Tab.Navigator 
    //     screenOptions={({ route }) => ({
    //         tabBarIcon: ({ focused, color, size }) => {
    //         let iconName;

    //         if (route.name === 'Home') {
    //             iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
    //         } else if (route.name === 'Settings') {
    //             iconName = focused ? 'ios-list-box' : 'ios-list';
    //         }

    //         // You can return any component that you like here!
    //         return <Ionicons name={iconName} size={size} color={color} />;
    //         },
    //   })}
    //   tabBarOptions={{
    //       activeTintColor: 'tomato',
    //       inactiveTintColor: 'gray',
    //     }}
      
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Invites" component={InvitesScreen} />
      </Tab.Navigator>
  );
}

export default Home;