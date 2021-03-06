import React, { useState } from 'react';
import { View, TextInput, Button, Picker, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Link } from '@react-navigation/native';
import { register, nextStep, backStep } from '../../store/actions/user';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ListDepartment, ListJob, Gender } from '../../store/constants/register';
import Camera from '../../components/molecules/camera';

const Register = ({registerAction, nextStepAction, backStepAction, user}) => {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [gender, setGender] = useState('');	
	const [job, setJob] = useState('');	
	const [department, setDepartment] = useState('');

	const nextDisabled = user.step != 0;
	
	const doRegister = () => {
		registerAction({email, password, lastName, firstName});
	};

	const stepNext = () => {
		nextStepAction();
	}

	const stepBack = () => {
		backStepAction();
	}

  return (
    <Container>
		<Camera></Camera>
		<Content>
        {!user.step &&
        	<Form>
	            <Item>
	              <Label>First Name</Label>
	              <Input value={firstName} onChangeText={text => setFirstName(text)} />
	            </Item>
	            <Item last>
	              <Label>Last Name</Label>
	              <Input value={lastName} onChangeText={text => setLastName(text)} />
	            </Item>
	            <Item last>
	            <Label>Email</Label>
	              <Input value={email} onChangeText={text => setEmail(text)} />
	            </Item>
	            <Item last>
					<Label>Password</Label>
					<Input secureTextEntry={true} value={password} onChangeText={text => setPassword(text)} />
	            </Item>
          	</Form> 
		}

		{ !!user.step && 
    		<Form>
        		<Item>
	              <Label>Select Gender</Label>
	             	 <Picker style={{ height: 50, width: 150 }} selectedValue={gender} onValueChange={(itemValue, itemIndex) => setGender(itemIndex)}>{
  				      	Gender.map((item, index) => {
				      		return <Picker.Item label={item} value={index} />
				      	})
				      }
				     </Picker>
	            </Item>

	            <Item>
	              <Label>Select Department</Label>
	             	 <Picker style={{ height: 50, width: 150 }} selectedValue={department} onValueChange={(itemValue, itemIndex) => setDepartment(itemIndex)}>{
				      	ListDepartment.map((item, index) => {
				      		return <Picker.Item label={item} value={index} />
				      	})
				      }
				     </Picker>
	            </Item>

	            <Item>
	              <Label>Select Job</Label>
	             	 <Picker style={{ height: 50, width: 150 }} selectedValue={job} onValueChange={(itemValue, itemIndex) => setJob(itemIndex)}>{
				      	ListJob.map((item, index) => {
				      		return <Picker.Item label={item} value={index} />
				      	})
				      }
				     </Picker>
	            </Item>
	            <Item>
	            	<Label>Choose yor image</Label>
	            	<Button title="DROW PICTURE" />
	            </Item>
          	</Form> 
		}
          	
          	<Grid>
	          <Col>
	          	<Button title="Back"  disabled={!nextDisabled} onPress={stepBack} />
	          </Col>
	          <Col>
	          	<Button title="Next" disabled={nextDisabled}  onPress={stepNext} />
	          </Col>
        	</Grid>
	    </Content>
      </Container>
  );
};

const mapStateToProps = (state) => {
  
  const { user } = state;
  
  return {
    user,
  }
}

const actionToCreators = {
  registerAction: register,
  nextStepAction: nextStep,
  backStepAction: backStep,
}

export default connect(mapStateToProps, actionToCreators)(Register);



	             