import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import GuestScreen from './screens/Guest';
import CreateEventScreen from './screens/CreateEvent'
import NewEventScreen from './screens/NewEvent'
import AddGuestScreen from './screens/AddGuests'
import AddLocationScreen from './screens/AddLocation'
import AddTimeScreen from './screens/AddTime'
import AddFriendScreen from './screens/AddFriend'
import ProfileSettings from './screens/ProfileSettings'
import EventSettingsScreen from './screens/EventSettings'
import GuestEventScreen from './screens/GuestEvent'
import Home from './routes/Home';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

const API_BASE_URL = 'http://192.168.1.52:5000';
const Stack = createStackNavigator();
export const AuthContext = React.createContext();

// Modified code from https://reactnavigation.org/docs/auth-flow/
export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGIN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const setToken = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token)
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken')
    } catch (e) {
      // remove error
    }
  }

  const authContext = React.useMemo(
    () => ({
      login: async ({ username, password }) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        fetch(`${API_BASE_URL}/auth/login`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            "email": username,
            "password": password,
          })
        }).then(res => res.json())
          .then(body => {
            if (body.error !== undefined) {
              //error stuff
            } else {
              setToken(body.token)
              dispatch({ type: 'LOGIN', token: body.token })

            }
          })
          .catch(err => alert(err))

      },
      signOut: () => {
        removeToken()
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async ({ email, name, password }) => {

        fetch(`${API_BASE_URL}/auth/register`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            "email": email,
            "name": name,
            "password": password,
          })
        }).then(res => res.json())
          .then(body => {
            if (body.error !== undefined) {
              //error stuff
            } else {
              setToken(body.token)
              dispatch({ type: 'LOGIN', token: body.token })

            }
          })
          .catch(err => alert(err))

      },
    }),
    []
  );


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {state.userToken == null ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Guest" component={GuestScreen} />
            </>
          ) : (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
                <Stack.Screen name="NewEvent" component={NewEventScreen} />
                <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
                <Stack.Screen name="AddGuests" component={AddGuestScreen} />
                <Stack.Screen name="AddLocations" component={AddLocationScreen} />
                <Stack.Screen name="AddTimes" component={AddTimeScreen} />
                <Stack.Screen name="AddFriend" component={AddFriendScreen} />
                <Stack.Screen name="EventSettings" component={EventSettingsScreen} />
                <Stack.Screen name="GuestEvent" component={GuestEventScreen} />
              </>
            )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}