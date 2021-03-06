import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, SafeAreaView, TextInput, } from 'react-native';
import { SignUpButton } from '../components/SignUpButton';
import { AuthContext } from '../App';

const dimensions = Dimensions.get('window');

export default function Login({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [name, onChangeName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [rePassword, onChangeRePassword] = React.useState('');

  const { signUp } = React.useContext(AuthContext);

  const goToLogin = () => {
    navigation.navigate('Login');
  }

  const trySignUp = () => {
    if (password !== rePassword) {
      alert('Passwords don\'t match')
      return
    }
    signUp({ email, name, password })
  }

  const goToGuest = () => {
    navigation.navigate('Guest');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.banner} source={require('../assets/banner.png')} />

      <View style={styles.inputView}>
        <Text style={styles.heading}>Sign Up</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputBody}
          placeholder={'Email'}
          onChangeText={text => onChangeEmail(text)}
          email={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputBody}
          placeholder={'First Name'}
          onChangeText={text => onChangeName(text)}
          name={name}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputBody}
          secureTextEntry={true}
          textContentType='password'
          placeholder={'Password'}
          onChangeText={text => onChangePassword(text)}
          password={password}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputBody}
          secureTextEntry={true}
          textContentType='password'
          placeholder={'Re-enter Password'}
          onChangeText={text => onChangeRePassword(text)}
          rePassword={rePassword}
        />
      </View>

      <View style={styles.inputView}>
          <TouchableOpacity onPress={trySignUp} style={styles.buttonBody}>
            <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textView}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center', marginBottom: 10 }}>
          <Text style={styles.subheading}>Don’t have an account? </Text>
          <TouchableOpacity onPress={goToLogin} >
            <Text style={styles.subheading, styles.subLink}>Sign In!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={goToGuest} >
          <Text style={{ fontStyle: 'italic', color: '#165F22', fontWeight: 'bold', }} >Or, login as a Guest</Text>
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
    zIndex: -1,
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
  },
  buttonBody: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#165F22',
    borderRadius: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
},
buttonText: {
    position: 'absolute',
    //fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    display: 'flex',
    color: '#FFFFFF',
    alignSelf: "center",
},

  // guestLinkBody: {
  //   position: 'absolute',
  //   width: 150,
  //   height: 19,
  //   left: 137,
  //   top: 833,
  // },
  // guestLinkText: {
  //   //fontFamily: 'Roboto',
  //   fontStyle: 'italic',
  //   fontWeight: 'bold',
  //   fontSize: 16,
  //   lineHeight: 19,
  //   textDecorationLine: 'underline',
  //   color: '#165F22',
  // },

});
