import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker';



export default function AddTimeScreen({ route, navigation }) {

    const windowHeight = useWindowDimensions().height;

    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);
    const [showEnd, setShowEnd] = React.useState(false);


    const { handleDateTimeChange } = route.params

    // Handling change when user wants to set a start date time
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShow(Platform.OS === 'ios');
        setStartDate(currentDate);
    };
    // Handling change when user wants to set an end date time
    const onEndChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEnd(Platform.OS === 'ios');
        setEndDate(currentDate);
    }
    // Select the correct date or time to show in modal when a user clicks on button
    const showMode = (currentMode, isStart) => {
        if (isStart) {
            setShow(true);
            setMode(currentMode);
        } else {
            setShowEnd(true);
            setMode(currentMode);
        }
    };

    const showDatepicker = () => {
        showMode('date', true);
    };

    const showTimepicker = () => {
        showMode('time', true);
    };

    const showEndDatepicker = () => {
        showMode('date', false);
    };

    const showEndTimepicker = () => {
        showMode('time', false);
    };




    const updateSearch = (search) => {
        setSearch(search);
    };

    return (
        <SafeAreaView style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Image style={styles.backButton} source={require('../assets/backButton.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerView} >

                <Text style={styles.headerText}>Add Times</Text>
                <View style={styles.checkButton} >
                    <Icon.Button
                        // Change this onPress to affect state of guests later on
                        onPress={() => {
                            handleDateTimeChange(startDate, endDate)
                            navigation.goBack()
                        }}
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

                <View style={styles.startDateHeaderView} >
                    <Text style={styles.timeHeaderText}>Start Date: {startDate.getUTCDate()}/{startDate.getMonth()}/{startDate.getFullYear()}</Text>
                </View>
                <View style={styles.startDatePickerButtonView}>

                    <TouchableOpacity style={styles.buttonBody} onPress={showDatepicker}>
                        <Text style={styles.buttonText}>Select Start Date</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.startTimeHeaderView} >
                    <Text style={styles.timeHeaderText}>Start Time: {startDate.getHours()}:{startDate.getUTCMinutes() < 10 ? "0" + startDate.getMinutes() : startDate.getMinutes()} {startDate.getHours() > 11 ? "PM" : "AM"}</Text>
                </View>
                <View style={styles.startTimepickerButtonView}>
                    <TouchableOpacity style={styles.buttonBody} onPress={showTimepicker}>
                        <Text style={styles.buttonText}>Select Start Time</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.endDateHeaderView} >
                    <Text style={styles.timeHeaderText}>End Date: {endDate.getUTCDate()}/{endDate.getMonth()}/{endDate.getFullYear()}</Text>
                </View>
                <View style={styles.endDatePickerButtonView}>

                    <TouchableOpacity style={styles.buttonBody} onPress={showEndDatepicker}>
                        <Text style={styles.buttonText}>Select End Date</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.endTimeHeaderView} >
                    <Text style={styles.timeHeaderText}>End Time: {endDate.getHours()}:{endDate.getUTCMinutes() < 10 ? "0" + endDate.getMinutes() : endDate.getMinutes()} {endDate.getHours() > 11 ? "PM" : "AM"}</Text>
                </View>
                <View style={styles.endTimepickerButtonView}>
                    <TouchableOpacity style={styles.buttonBody} onPress={showEndTimepicker}>
                        <Text style={styles.buttonText}>Select End Time</Text>
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={startDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                {showEnd && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={endDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onEndChange}
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
        // position: 'absolute',
        top: "20%",
        bottom: 0,
        width: "100%",
        height: "100%",
        alignItems: 'center',
        backgroundColor: "white",


    }, buttonText: {
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
        // position: 'absolute',
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
    }, buttonBody: {
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

    startTimepickerButtonView: {
        // position: 'absolute',
        // top: 290,
        // top: "0%",
        // backgroundColor: "black",
        top: "15%",
        width: "50%",
    },
    startDatePickerButtonView: {
        // position: 'absolute',
        top: "7%",
        width: "50%",
    },


    startDateHeaderView: {
        // position: 'absolute',
        width: "100%",
        alignItems: 'center',
        // paddingBottom: 40,

    },
    startTimeHeaderView: {
        // position: 'absolute',
        width: "100%",
        top: "8%",
        alignItems: 'center',

    },
    endDateHeaderView: {
        // position: 'absolute',
        top: "17%",
        width: "100%",
        alignItems: 'center',
        // paddingBottom: 40,

    },
    endTimeHeaderView: {
        // position: 'absolute',
        width: "100%",
        top: "25%",
        alignItems: 'center',

    },
    endTimepickerButtonView: {
        // position: 'absolute',
        top: "32%",
        width: "50%",
    },
    endDatePickerButtonView: {
        // position: 'absolute',
        top: "24%",
        width: "50%",
    },

})