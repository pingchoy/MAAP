import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native';
import { LoginButton } from '../components/LoginButton';

export default function Login({ navigation }) {
  const [username, onChangeUsername] = React.useState('Email or Username');
  const [password, onChangePassword] = React.useState('Password');

  const goToSignUp = () => {
    navigation.push('SignUp');
  }

  const goToGuest = () => {
    navigation.push('Guest');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Image style={styles.banner} source={require('../assets/banner.png')}/>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.usernameBody}
        placeholder={username}
        onChangeUsername={text => onChangeUsername(text)}
        username={username}
      /> 
      <TextInput
        style={styles.passwordBody}
        secureTextEntry={true}
        textContentType='password'
        placeholder={password}
        onChangePassword={text => onChangePassword(text)}
        password={password}
      />
      <LoginButton></LoginButton>
      <Text style={styles.subheading}>Don’t have an account?</Text>
      <TouchableOpacity style={styles.signUpBody}  onPress={goToSignUp}>
        <Text style={styles.signUpText}>Sign Up!</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.guestLinkBody} onPress={goToGuest}>
        <Text style={styles.guestLinkText}>Or, login as a Guest</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    position: 'absolute',
    left: 24,
    top: 224,
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 37,
    color: '#3C3C3C',
  },
  subheading: {
    position: 'absolute',
    width: 214,
    height: 24,
    left: 59,
    top: 800,  
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 23,
    color: '#3C3C3C',
  },
  guestLinkBody: {
    position: 'absolute',
    width: 150,
    height: 19,
    left: 137,
    top: 833,
  },
  guestLinkText: {
    //fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: 'underline',
    color: '#165F22',
  },
    banner: {
      position: 'absolute',
      width: 414,
      height: 112,
      left: 0,
      top: 29,
    },
    usernameBody: {
      position: 'absolute',
      height: 55,
      width: 366,
      left: 24,
      top: 323,
      paddingLeft: 16,
      //fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 21,
      color: '#3C3C3C',
      backgroundColor: 'white',
      borderRightColor: 'black',
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 10,
  },
  passwordBody: {
      position: 'absolute',
      width: 366,
      height: 51,
      left: 24,
      top: 392,
      paddingLeft: 16,
      //fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 21,
      color: '#3C3C3C',
      backgroundColor: 'white',
      borderRightColor: 'black',
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 10,
  },
  fieldText: {
      position: 'absolute',
      height: 21.3272705078125,
      width: 333,
      left: 14,
      top: 14.83642578125,
      borderRadius: null,
      //fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 21,
      color: '#3C3C3C',
  },
  signUpBody: {
    position: 'absolute',
    width: 78,
    height: 24,
    left: 274,
    top: 800,
  },
  signUpText: {
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 23,
    textDecorationLine: 'underline',
    color: '#165F22',
  },
});
