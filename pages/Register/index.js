import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { Link } from '@react-navigation/native';
import { register } from '../../store/actions/user';

const Register = (props) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doRegister = () => {
    console.log(props);
    props.registerAction({username, password});
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign up {props.user.username} </Text>
      <TextInput placeholder="username" value={username} onChangeText={text => setUsername(text)}></TextInput>
      <TextInput placeholder="password" value={password} onChangeText={text => setPassword(text)}></TextInput>
      <Button title="Register" onPress={doRegister}/>
      <Link to="/Login">Sign in</Link>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  }
}

const actionToCreators = {
  registerAction: register
}

export default connect(mapStateToProps, actionToCreators)(Register);