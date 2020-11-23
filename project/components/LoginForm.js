import React from 'react';
import { Text, StyleSheet, TextInput, View } from 'react-native';

const LoginForm = () => {
    const [username, onChangeUsername] = React.useState('Email or Username');
    const [password, onChangePassword] = React.useState('Password');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.usernameBody}
                placeholder={username}
                onChangeUsername={text => onChangeUsername(text)}
                username={username}
            /> 
            <TextInput
                style={styles.passwordBody} 
                textContentType='password'
                placeholder={password}
                onChangePassword={text => onChangePassword(text)}
                password={password}
            />
        </View>
    );
}

export { LoginForm };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingRight: 425,
        alignItems: 'center',
        justifyContent: 'center',
      },
    usernameBody: {
        position: 'absolute',
        height: 55,
        width: 366,
        left: 24,
        top: 323,
        paddingLeft: 16,
        fontFamily: 'Roboto',
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
        fontFamily: 'Roboto',
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
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 21,
        color: '#3C3C3C',
    },
});

// const [value, onChangeText] = React.useState('Useless Placeholder');

// return (
//   <TextInput
//     style={styles.fieldBody} textContentType={'password'}
//     onChangeText={text => onChangeText(text)}
//     value={value}
//   />
// );