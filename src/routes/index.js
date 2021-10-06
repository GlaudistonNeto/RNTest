import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

function Routes() {
  const isSignedIn = false;
  const isLoading = false;

  if (isLoading) {
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={50} color="red" />
    </View>
  }
  return (
    isSignedIn ? <AppRoutes /> : <AuthRoutes />
  );
}

export default Routes;