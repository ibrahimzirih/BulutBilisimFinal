import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

export default function CheckBox(props) {

    const checked = props.checked;
    const onPress = props.onPress;
    const label = props.label;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.box, { backgroundColor: checked ? '#000' : '#fff'}]} onPress={onPress}>
                {checked && <Entypo name='check' style={styles.check} />}
            </TouchableOpacity>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '90%'
    },
    box: {
        margin: 12,
        height: 30,
        width: 30,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    check: {
        fontSize: 24,
        color: '#fff'
    }
})