import React from 'react';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'rn-fetch-blob';
import { Col, Grid } from 'react-native-easy-grid';
import { cameraRotate, userUpdate } from '../../../store/actions/user';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Content, Footer, Button, Icon } from 'native-base';
import { toggleModal } from '../../../store/actions/modal';
import { modalTypes } from '../../../store/constants/modal';
import userConstants from '../../../store/constants/user';

const Camera = ({cameraRotateAction, user, toggleModalAction, userUpdateAction}) => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'column',
			backgroundColor: 'black',
		},
		preview: {
			flex: 20,
			justifyContent: 'flex-end',
			alignItems: 'center',
		},
		capture: {
			flex: 45,
			backgroundColor: '#fff',
			borderRadius: 5,
			padding: 15,
			paddingHorizontal: 20,
			alignSelf: 'center',
			margin: 20,
		},
	})

	let camera;
	let cameraRotate = user.cameraRotate ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back;

	const takePicture = async () => {
		if(camera){
			const options = {quality: 0.5, base64: true};
			
			try{
				const data = await camera.takePictureAsync(options);
				
				userUpdateAction({ avatar: `data:image/png;base64, ${data.base64}` });				
				
				toggleModalAction({ [modalTypes.CAMERA_OPEN]: false })
				
			} catch(error){
				console.log(error);
			}
		}
	}

	const rotate = async () => {
		cameraRotateAction();
	}

	return (
	    <View style={styles.container}>
			<RNCamera
				style={styles.preview}  
				ref={ref => {camera = ref;}} 
	    		type={cameraRotate} 
	    		flashMode={RNCamera.Constants.FlashMode.on}>
			</RNCamera>
			<Footer>
				<Icon onPress={takePicture} name="camera" style={{ fontSize: 50 }}/>
			</Footer>
		</View>
	);
}

const mapStateToProps = (state) => {
  
  const { user } = state;
  
  return {
    user,
  }
}

const actionToCreators = {
  cameraRotateAction: cameraRotate,
	toggleModalAction: toggleModal,
	userUpdateAction: userUpdate
}

export default connect(mapStateToProps, actionToCreators)(Camera);
