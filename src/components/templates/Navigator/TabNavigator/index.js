import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import HomeScreen from '../../../../pages/Home';
import SettingsScreen from '../../../../pages/Settings';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Icon name="home" />
        }}
      />
      <Tab.Screen 
        name="Profile"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => <Icon name="person" />
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;