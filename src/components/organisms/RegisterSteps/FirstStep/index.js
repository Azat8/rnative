import React from 'react'
import { connect } from 'react-redux';
import { Form, Item, Input, Label } from 'native-base';
import { updateUser, nextStep } from '../../../../store/actions/user';
import StepsActions from './../../../molecules/StepsActions';


const FirstStep = ({ user, updateUserAction, nextStepAction }) => {
  const {
    firstName,
    lastName,
    email,
    password 
  } = user;

  return (
    <>
    {!user.step &&
      <Form>
        <Item>
          <Label>First Name</Label>
          <Input 
            value={firstName}
            onChangeText={text => updateUserAction({ firstName: text })} />
        </Item>
        <Item>
          <Label>Last Name</Label>
          <Input 
            value={lastName} 
            onChangeText={text => updateUserAction({ lastName: text })} />
        </Item>
        <Item>
        <Label>Email</Label>
          <Input 
            value={email} 
            onChangeText={text => updateUserAction({ email: text })} />
        </Item>
        <Item>
          <Label>Password</Label>
          <Input 
            secureTextEntry={true} 
            value={password} 
            onChangeText={text => updateUserAction({ password: text })} />
        </Item>
        <Item last>
        <StepsActions next={nextStepAction} />
        </Item>
      </Form> 
    }
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  updateUserAction: updateUser,
  nextStepAction: nextStep
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstStep)
