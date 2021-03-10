import React from 'react';
import { connect } from 'react-redux';
import { Content } from 'native-base';
import { Modal } from 'react-native';
import { FirstStep, SecondStep } from '../../organisms/RegisterSteps'; 
import { modalTypes } from '../../../store/constants/modal';
import Camera from '../../molecules/Camera';

const RegisterTemplate = ({ modal }) => {
  return (
    <Content>	    
      <Modal visible={modal[modalTypes.CAMERA_OPEN]}>
        <Camera />
      </Modal>
      <FirstStep />
      <SecondStep />
    </Content>
  )
}

const mapStateToProps = (state) => ({
  modal: state.modal,
})

export default connect(mapStateToProps)(RegisterTemplate);