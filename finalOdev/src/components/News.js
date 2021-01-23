import * as React from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet, Text } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function News(props) {
    return (
        <View style={styles.container}>
            <View style={styles.itemContent}>
                <Text style={styles.itemText}>{props.title}</Text>
            </View>
            <View style={[styles.itemContent, { justifyContent: 'space-around' }]}>
                <TouchableOpacity style={styles.button} onPress={props.onPressLater}>
                    <Text style={styles.buttonText}>{props.laterText}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={props.onPressSave}>
                    <Text style={styles.buttonText}>{props.saveText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height * 0.2,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 12
    },
    itemContent: {
        height: '90%',
        width: '50%',
        justifyContent: 'center'
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 12
    },
    button: {
        height: '45%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        borderRadius: 8
    },
    buttonText: {
        color: '#fff',
        fontSize: 14
    }
})