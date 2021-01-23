import * as React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading(props) {
    return (
        <View style={styles.container} onPress={props.onPress}>
            <ActivityIndicator size='large' color='#000' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#fff'
    }
})