import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/Profile';
import InvitesScreen from '../screens/Invites';
import EventsScreen from '../screens/Events';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const Home = () => {
  return (
      <Tab.Navigator  initialRouteName="Events"
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