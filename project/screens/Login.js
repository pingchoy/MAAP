import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, SafeAreaView, TextInput } from 'react-native';
import { LoginButton } from '../components/LoginButton';
import { AuthContext } from '../App';

const dimensions = Dimensions.get('window');

export default function Login({ navigation }) {
  const [username, onChangeUsername] = React.useState('Email or Username');
  const [password, onChangePassword] = React.useState('Password');

  const { login } = React.useContext(AuthContext);


  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.banner} source={require('../assets/banner.png')}/>

      <View style={styles.inputView}>
        <Text style={styles.heading}>Login</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputBody}
          placeholder={username}
          onChangeUsername={text => onChangeUsername(text)}
          username={username}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputBody}
          secureTextEntry={true}
          textContentType='password'
          placeholder={password}
          onChangePassword={text => onChangePassword(text)}
          password={password}
        />
      </View>

      <View style={styles.inputView}>
        <LoginButton onPress={()=> login({ username, password })}></LoginButton>
      </View>

      <View style={styles.textView}>
        <View style={{flexDirection: "row", justifyContent: "center", alignItems: 'center', marginBottom: 10}}>
          <Text style={styles.subheading}>Don’t have an account? </Text>
          <TouchableOpacity onPress={goToSignUp} >
            <Text style={styles.subheading, styles.subLink}>Sign Up!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={goToGuest}>
          <Text style={{fontStyle: 'italic', color: '#165F22', fontWeight: 'bold',}} >Or, login as a Guest</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    height: 112,
    width: dimensions.width,
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width:"100%",
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: 30,
    height:55,
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
    width:"100%",
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: 50,
    marginTop: 30,
    height:55,
  },
  subheading: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#3C3C3C',
  },
  subLink :{
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#165F22',
  }
});
