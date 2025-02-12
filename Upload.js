import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Switch, FlatList } from 'react-native';
import * as Icon from "react-native-feather";
import * as DocumentPicker from 'expo-document-picker';

const Upload = () => {
    const [isListVisible, setIsListVisible] = useState(false);
    const [recordings, setRecordings] = useState([]);

    const handleUpload = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'audio/*',
            });
            if (res.type === 'success') {
                console.log(res);
            } else {
                console.log('User cancelled the upload');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const toggleSwitch = () => setIsListVisible(previousState => !previousState);

    return (
        <View style={styles.wrapper}>
            <Icon.Upload stroke="#305EF5" width={40} height={40} />
            <TouchableOpacity style={styles.button} onPress={handleUpload}>
                <Text style={styles.buttonText}>Upload Audio Files</Text>
            </TouchableOpacity>
            <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>View my recordings</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={isListVisible}
                />
            </View>
            {isListVisible && (
                <Text style={styles.text}>Recordings:</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'top',
        top: '15%',
        alignItems: 'center',
        width: '80%',
    },
    text: {
        fontSize: 20,
        color: '#305EF5',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#305EF5',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '60%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    toggleText: {
        fontSize: 18,
        marginRight: 10,
    },
    recordingItem: {
        fontSize: 16,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default Upload;