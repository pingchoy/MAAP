import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const Input = (props) => {
    const [text, onChangeText] = React.useState(props.placeholder)

    return (
        
        <View style={styles.container}>
            <TextInput
                style={styles.inputBody}
                placeholder={text}
                textContentType={props.textContentType}
                secureTextEntry={props.secureTextEntry}
                onChangeText={newText => onChangeText(newText)}
                text={text}
            />

        </View>
    )

}

const styles = StyleSheet.create({ 
    container: {
        flexDirection:'row',
        flex:1,
        margin: '20px',
    },
    inputBody: {
        //position: 'absolute',
        height: 55,
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
        alignSelf: "center",
    }

})

export default Input;