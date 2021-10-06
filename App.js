import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import { Provider as AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
          <StatusBar
            backgroundColor="#36393f"
            barStyle="light-content"
            translucent={false}
          />
          <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
