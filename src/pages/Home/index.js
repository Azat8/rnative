import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Body, Title } from 'native-base';
import { Text, View } from 'react-native';
import GroupTemplate from '../../components/templates/Group';

const Home = ({ modal, group }) => {

  return ( 
    <Container>
      <Header>
        <Body>
          <Title>Home</Title>
        </Body>
      </Header>
      { !group.groups.length && 
        <View style={{
          position: 'absolute', 
          top: 0, left: 0, 
          right: 0, bottom: 0, 
          justifyContent: 'center', 
          alignItems: 'center'}}>
        <Text>Click to plus button to add group</Text>
      </View>
      }
      <GroupTemplate />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal, 
  group: state.group
});

export default connect(mapStateToProps)(Home);