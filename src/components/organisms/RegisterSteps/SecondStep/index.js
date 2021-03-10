import React from 'react'
import { connect } from 'react-redux'
import { Form, Item, Input, Label, Right, Icon, Thumbnail, Button as BaseButton } from 'native-base';
import { userUpdate, backStep } from '../../../../store/actions/user';
import { toggleModal } from '../../../../store/actions/modal';
import { modalTypes } from '../../../../store/constants/modal';
import { Picker } from '@react-native-picker/picker';
import { ListDepartment, ListJob, Gender } from '../../../../store/constants/register';
import StepsActions from './../../../molecules/StepsActions';
import {useRoute} from '@react-navigation/native';
import { GOOGLE_API_KEY } from '@env';
import GetLocation from 'react-native-get-location';
import Geocode from "react-geocode";

const SecondStep = ({ user, userUpdateAction, toggleModalAction, backStepAction }) => {
  const {
    gender,
    department,
    job,
    address,
    step,
    avatar
  } = user;
  

	Geocode.setApiKey(GOOGLE_API_KEY);
	Geocode.setLanguage("en");
	Geocode.enableDebug();

	GetLocation.getCurrentPosition({
				enableHighAccuracy: true,
				timeout: 15000,
			}).then(location => {
				const {latitude, longitude} = location; 
				try {

					Geocode.fromLatLng(latitude, longitude).then(
						(response) => {
							const address = response.results[0].formatted_address;
							
							userUpdateAction({ address: address});
						},
						(error) => {
							console.error(error);
						}
					);
				} catch {
					console.log('google account issue');
				}

		}).catch(error => {
				const { code, message } = error;
				console.warn(code, message);
		})

  const next = () => {
    userUpdateAction({ isLogedIn: true });
  };

  const back = () => {
    backStepAction();
  };

  return (
    <>
    { !!step && 
    <Form>
      <Item>
        <Label>Select Gender</Label>
        <Picker 
          style={{ flex: 1 }} 
          selectedValue={gender} 
          onValueChange={(itemValue, itemIndex) => userUpdateAction({ gender: itemIndex })}>
          { Gender.map((item, index) => <Picker.Item key={index} label={item} value={index} />)}
       </Picker>
      </Item>
      <Item>
        <Label>Select Department</Label>
        <Picker 
          style={{ flex: 1 }} 
          selectedValue={department} 
          onValueChange={(itemValue, itemIndex) => userUpdateAction({ department: itemIndex })}>
          { 
            ListDepartment.map((item, index) => 
              <Picker.Item 
                key={index}
                label={item}
                value={index} />
            ) 
          }
        </Picker>
      </Item>
      <Item>
        <Label>Select Job</Label>
        <Picker 
          style={{ flex: 1 }} 
          selectedValue={job} 
          onValueChange={(itemValue, itemIndex) => userUpdateAction({ job: itemIndex })}>
          {
            ListJob.map((item, index) => 
              <Picker.Item 
                key={index} 
                label={item} 
                value={index} />
            )
          }
        </Picker>
      </Item>
      <Item>
        <Label>Address</Label>
        <Input value={address} onChangeText={text => userUpdateAction({ address: text })} />
      </Item>
      <Item>
        <Label>Choose yor image</Label>
        <Right />
        <BaseButton info full 
          onPress={() => toggleModalAction({ [modalTypes.CAMERA_OPEN]: true })}>
          <Icon name='camera' light />
        </BaseButton>
      </Item>
      {!!avatar &&
        <Item>
          <Thumbnail
            large
            source={{uri: avatar}} 
          />
        </Item>		
      }
      <Item last>
      {
        useRoute()?.name !== 'Profile' ? 
        <StepsActions next={next} back={back} /> : 
        <StepsActions back={back} />
      }
      </Item>
    </Form>
    }
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  userUpdateAction: userUpdate,
  toggleModalAction: toggleModal,
  backStepAction: backStep,
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondStep)