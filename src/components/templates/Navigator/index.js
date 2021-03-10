import { connect } from "react-redux"
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import StackNavigator from './StackNavigator';
import React from 'react';

const Navigator = ({ user }) => (
  <NavigationContainer>
    { user.isLogedIn ? <TabNavigator /> : <StackNavigator /> }
  </NavigationContainer>
);

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(Navigator);