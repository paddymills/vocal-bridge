import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as Icon from "react-native-feather";
import Voice from '@react-native-community/voice';

const Home = () => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        Voice.onSpeechResults = onSpeechResults;
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechResults = (e) => {
        setText(e.value[0]);
    };

    const toggleListening = async () => {
        try {
            if (isListening) {
                await Voice.stop();
                setIsListening(false);
            } else {
                await Voice.start('en-US');
                setIsListening(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.micButton} onPress={toggleListening}>
                <Icon.Mic stroke="#fff" width={40} height={40} />
            </TouchableOpacity>

            <TextInput
                style={styles.textInput}
                placeholder="Enter text..."
                value={text}
                onChangeText={(value) => setText(value)}
            />

            <Text style={styles.inputPreview}>Text entered: {text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    micButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#305EF5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    textInput: {
        width: '95%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    inputPreview: {
        marginTop: 20,
        fontSize: 16,
        color: '#555',
    },
});

export default Home;
