import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const LoginForm = () => {
    const [username, onChangeUsername] = React.useState('Email or Username');
    const [password, onChangePassword] = React.useState('Passworddd');

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
                secureTextEntry={true}
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
});