import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Guest from "../screens/Guest";
import Events from "../screens/Events";
import Profile from "../screens/Profile"
import Invites from "../screens/Invites"

const { Navigator, Screen } = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator initialRouteName="Events">
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Events" component={Events} />
    <Tab.Screen name="Invites" component={Invites} />
  </Tab.Navigator>
);


const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Login" component={Login} options={{gestureEnabled: false}}/>
    <Screen name="SignUp" component={SignUp} options={{gestureEnabled: false}}/>
    <Screen name="Guest" component={Guest} options={{gestureEnabled: true}}/>
    <Screen name="Events" component={TabNavigator} options={{gestureEnabled: false}}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
