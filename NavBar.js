import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Icon from "react-native-feather";

const NavBar = ({ activeTab, onTabPress }) => {
    const tabs = [
        { name: 'Home', icon: Icon.Home },
        { name: 'Upload', icon: Icon.Upload },
        { name: 'Settings', icon: Icon.Settings },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.name}
                    style={styles.tabButton}
                    onPress={() => onTabPress(tab.name)}
                >
                    <tab.icon
                        stroke={activeTab === tab.name ? '#007AFF' : '#8E8E93'}
                        width={24}
                        height={24}
                    />
                    <Text
                        style={[
                            styles.tabText,
                            { color: activeTab === tab.name ? '#007AFF' : '#8E8E93' },
                        ]}
                    >
                        {tab.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        height: 60,
    },
    tabButton: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 12,
        marginTop: 4,
    },
});

export default NavBar;
