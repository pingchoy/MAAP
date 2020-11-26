import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const SignUpButton = () => {
    return (
        <TouchableOpacity style={styles.buttonBody}>
            <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
    )
}

export { SignUpButton };

const styles = StyleSheet.create({
    buttonBody: {
        position: 'absolute',
        width: 366,
        height: 63,
        left: 24,
        top: 610,
        backgroundColor: '#165F22',
        borderRadius: 30,
    },
    buttonText: {
        position: 'absolute',
        width: 312,
        height: 63,
        left: 27,
        top: 0,
        bottom: 0,
        padding: 20,
        //fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 22,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFFFFF',
    },
});
