import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoButton = () => {
    return (
        <TouchableOpacity style={styles.buttonBody}>
            <Text style={styles.buttonText}>Go!</Text>
        </TouchableOpacity>
    )
}

export { GoButton };

const styles = StyleSheet.create({
    buttonBody: {
        position: 'absolute',
        width: 95,
        height: 51,
        left: 295,
        top: 414,
        backgroundColor: '#165F22',
        borderRadius: 30,
    },
    buttonText: {
        position: 'absolute',
        width: 312,
        height: 51,
        left: -108,
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
