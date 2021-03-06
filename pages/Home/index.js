import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Input, Fab, Icon } from 'native-base';
import employees from '../../employees.json';

export default () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container>
        <Header />
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>A</Text>
            </ListItem>                    
            <ListItem>
              <Text>Aaron Bennet</Text>
            </ListItem>
            <ListItem>
              <Text>Ali Connors</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>B</Text>
            </ListItem>  
            <ListItem>
              <Text>Bradley Horowitz</Text>
            </ListItem>
          </List>
          <Modal visible={modalVisible}>
            <Input />
          </Modal>
        </Content>
        <Fab 
          position="bottomRight"
        >
          <Icon name="share" />
        </Fab>
      </Container>
  );
};
