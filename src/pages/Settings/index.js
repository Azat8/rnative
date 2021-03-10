import { 
  Container, 
  Header,
  Body,
  Title,
  Content } from 'native-base';
import React from 'react'
import { connect } from 'react-redux';
import RegisterTemplate from '../../components/templates/RegisterTemplate';

export const Settings = (props) => {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Settings</Title>
        </Body>
      </Header>
      <Content>
        <RegisterTemplate noAction></RegisterTemplate>
      </Content>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
