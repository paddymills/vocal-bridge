import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import NavBar from './NavBar';
import Home from './Home';
import Upload from './Upload';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <Home />;
      case 'Upload':
        return <Upload />;
      case 'Settings':
        return <Text >Nothing yet</Text>;
    }
  };

  return (
      <SafeAreaView style={styles.container}>

        <View style={styles.content}>
          {renderScreen()}
        </View>


        <NavBar activeTab={activeTab} onTabPress={setActiveTab} />


        <StatusBar style="auto" />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
