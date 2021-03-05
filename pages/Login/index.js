import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Link } from '@react-navigation/native';

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const doLogin = () => {
    console.log('doLogin');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign in</Text>
      <TextInput placeholder="username" value={username} onChangeText={text => setUsername(text)}></TextInput>
      <TextInput placeholder="password" value={password} onChangeText={text => setPassword(text)}></TextInput>
      <Button title="Login" onPress={doLogin}/>
      <Link to="/Register">Sign up</Link>
    </View>
  );
};