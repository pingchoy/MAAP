import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/Profile';
import InvitesScreen from '../screens/Invites';
import EventsScreen from '../screens/Events';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


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
        tabBarOptions= {{ showIcon: true, activeTintColor: '#165F22' }}
      
      >
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={35} />
            ),
          }}
        />
        <Tab.Screen 
          name="Events" 
          component={EventsScreen} 
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={35} />
            ),
          }}
        />
        <Tab.Screen 
          name="Invites" 
          component={InvitesScreen}
          options={{
            tabBarLabel: 'Invites',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="mail" color={color} size={35} />
            ),
          }} 
        />
      </Tab.Navigator>
  );
}

export default Home;