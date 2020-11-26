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
});
