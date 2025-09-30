import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AudioProvider } from './src/context/AudioProvider';
import RootNavigator from './src/navigations';

export default function App() {
  return (
    <AudioProvider>
      <SafeAreaView>
        <StatusBar style="auto"/>
        <RootNavigator/>
      </SafeAreaView>
    </AudioProvider>
  );
}
