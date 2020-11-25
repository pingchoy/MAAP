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
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color}) => {
            let iconName;

            if (route.name === 'Events') {
                iconName = 'ios-calendar';
            } else if (route.name === 'Profile') {
                iconName = 'md-person';
            } else {
                iconName = 'md-mail';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={42} color={color} />;
            },
      })}
      tabBarOptions={{
          activeTintColor: '#165f22',
          inactiveTintColor: '#999999',
          style: {
            borderTopColor: '5px groove rgba(0, 0, 0, 0.25)',
            paddingHorizontal: 40,
            paddingBottom: 15,
            height: 90,
          },
          labelStyle:{
            fontSize: 16,
            fontWeight: 'bold',
          }
        }}
      
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Invites" component={InvitesScreen} />
      </Tab.Navigator>
  );
}

export default Home;