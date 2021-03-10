import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../../../pages/Login';
import RegisterScreen from '../../../../pages/Register';

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Register">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;