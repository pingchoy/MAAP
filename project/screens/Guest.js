import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native';
import { GoButton } from '../components/GoButton';

const dimensions = Dimensions.get('window');

export default function Login({ navigation }) {
  const [username, onChangeUsername] = React.useState('Enter a username');
  const [code, onChangeCode] = React.useState('Enter an event code');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backButton} source={require('../assets/backButton.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputBody}
          placeholder={username}
          onChangeText={text => onChangeUsername(text)}
          username={username}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputBody}
          placeholder={code}
          onChangeText={text => onChangeCode(text)}
          code={code}
        />
      </View>

      <View style={styles.inputView}>
        <GoButton></GoButton>
      </View>

      <StatusBar style="auto" />
      <Image style={styles.banner} source={require('../assets/bottomBanner.png')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    height: 112,
    width: dimensions.width,
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonView: {
    position: 'absolute',
    left: 23,
    top: 58,
  },
  inputView: {
    width: "100%",
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: 30,
    height: 55,
    padding: 20,
  },
  heading: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 32,
    color: '#3C3C3C',
    position: 'absolute',
    alignSelf: "flex-start",
    margin: 20,
  },

  inputBody: {
    position: 'absolute',
    paddingLeft: 20,
    height: 55,
    width: '100%',
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


  textView: {
    position: 'absolute',
    bottom: 0,
    width: "100%",
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: 50,
    marginTop: 30,
    height: 55,
  },

  subheading: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#3C3C3C',
  },

  subLink: {
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#165F22',
  }
});
