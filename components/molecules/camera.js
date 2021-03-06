import React from 'react';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'rn-fetch-blob';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { cameraRotate } from '../../store/actions/user';
import { connect } from 'react-redux';
import { View, Button, StyleSheet } from 'react-native';
import { setSyntheticLeadingComments } from 'typescript';
import { Content } from 'native-base';

const Camera = ({cameraRotateAction, user}) => {
	const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    flexDirection: 'column',
	    backgroundColor: 'black'
	  },
	  preview: {
	  	flex: 1,
	  	justifyContent: 'flex-end',
	  	alignItems: 'center'
	  },
	  capture: {
	  	flex: 0,
	  	backgroundColor: '#fff',
	  	borderRadius: 5,
	  	padding: 15,
	  	paddingHorizontal: 20,
	  	alignSelf: 'center',
	  	margin: 20	
	  }
	})

	let camera;
	let cameraRotate = user.cameraRotate ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back;

	const takePicture = async () => {
		if(camera){
			const options = {quality: 0.5, base64: true};
			const data = await camera.takePictureAsync(options);
			console.log(data.base64);

			const path = `${RNFetchBlob.fs.dirs.CacheDir}/test.png`;

			try{
				RNFetchBlob.fs.writeFile(path, data.base64 ,'base64');				
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
			<Content>
				<Grid>
					<Col><Button title="DROW" onPress={takePicture} /></Col>
					<Col><Button title="Rotate" onPress={rotate} /></Col>
				</Grid>
			</Content>
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
}

export default connect(mapStateToProps, actionToCreators)(Camera);
