import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, TextInput } from 'react-native';
import { GoButton } from '../components/GoButton';

export default function Guest({ navigation }) {
  const [username, onChangeUsername] = React.useState('Enter a username');
  const [code, onChangeCode] = React.useState('Enter an event code');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.heading}>Sign Up</Text>
      <TextInput
        style={styles.usernameBody}
        placeholder={username}
        onChangeUsername={text => onChangeUsername(text)}
        username={username}
      />
      <TextInput
        style={styles.codeBody}
        placeholder={code}
        onChangeCode={text => onChangeCode(text)}
        code={code}
      />
      <GoButton></GoButton>
      <Image style={styles.banner} source={require('../assets/banner.png')} />
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
  usernameBody: {
    position: 'absolute',
    width: 366,
    height: 55,
    left: 24,
    top: 348,
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
  codeBody: {
    position: 'absolute',
    width: 263,
    height: 51,
    left: 24,
    top: 414,
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
});
