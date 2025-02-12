import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as Icon from "react-native-feather";

const Upload = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>Upload</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    text: {
        fontSize: 20,
        color: '#305EF5',
        justifyContent: 'center',
    },
});

export default Upload;