import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker';



export default function AddTimeScreen({ navigation }) {

    const windowHeight = useWindowDimensions().height;

    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };



    const updateSearch = (search) => {
        setSearch(search);
    };

    return (
        <SafeAreaView style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.backButton} source={require('../assets/backButton.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerView} >

                <Text style={styles.headerText}>Add Times</Text>
                <View style={styles.checkButton} >
                    <Icon.Button
                        // Change this onPress to affect state of guests later on
                        onPress={() => navigation.goBack()}
                        name="check"
                        size={30}
                        backgroundColor="transparent"
                        color="green"
                    // onPress={this.loginWithFacebook}
                    >
                    </Icon.Button>
                </View>
            </View>
            <View style={styles.datePickerView}>

                <View style={styles.fromdateHeaderView} >
                    <Text style={styles.timeHeaderText}>Start Date: {date.getUTCDate()}/{date.getMonth()}/{date.getFullYear()}</Text>
                </View>
                <View style={styles.fromDatepickerButtonView}>

                    <TouchableOpacity style={styles.buttonBody} onPress={showDatepicker}>
                        <Text style={styles.buttonText}>Select Date</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.fromtimeHeaderView} >
                    <Text style={styles.timeHeaderText}>Start Time: {date.getHours()}:{date.getMinutes()} {date.getHours() > 12 ? "PM" : "AM"}</Text>
                </View>
                <View style={styles.fromTimepickerButtonView}>
                    <TouchableOpacity style={styles.buttonBody} onPress={showTimepicker}>
                        <Text style={styles.buttonText}>Select Time</Text>
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, container: {
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
    buttonView: {
        position: 'absolute',
        width: 350,
        height: 53,
        left: 24,
        top: 298,
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 30,
        height: 55,
        padding: 20,
    },
    headerView: {
        position: 'absolute',
        width: "100%",
        top: "7%",
        left: "20%",
    },
    headerText: {
        position: 'absolute',
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 32,
        lineHeight: 37,
        display: 'flex',
        alignItems: 'center'
    },
    checkButton: {
        position: 'absolute',
        width: 70,
        left: "60%",
        top: -5,
        // backgroundColor: "black",
    },
    datePickerView: {
        position: 'absolute',
        top: "20%",
        width: "100%",
        alignItems: 'center'

    },
    fromTimepickerButtonView: {
        position: 'absolute',
        top: 290,

        width: "50%",
    },
    fromDatepickerButtonView: {
        position: 'absolute',
        top: 140,
        width: "50%",
    },
    buttonBody: {
        position: 'absolute',
        left: 0,
        right: 0,
        // top: -6,
        bottom: 0,
        /* darkgreen */
        height: 50,
        backgroundColor: '#165F22',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        position: 'absolute',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 22,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        /* light */
        color: '#FFFFFF',
    },
    timeHeaderText: {
        position: 'absolute',
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 21,
        lineHeight: 37,
        display: 'flex',
        alignItems: 'center',
        borderColor: "black",
        borderRadius: 30,
        borderWidth: 1,
        padding: 20,

        // left: 0,
        // top: 0,
    },
    fromdateHeaderView: {
        position: 'absolute',

        width: "100%",
        alignItems: 'center',
        // paddingBottom: 40,

    },
    fromtimeHeaderView: {
        position: 'absolute',
        width: "100%",
        top: 150,
        alignItems: 'center',

    }
})