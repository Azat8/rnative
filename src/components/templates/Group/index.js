import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { 
  Container, 
  Header, 
  Content, 
  List, 
  ListItem, 
  Text, 
  Input, 
  Fab, 
  Icon, 
  Button, 
  Right, 
  Footer, 
  CheckBox, 
  Body, 
  Title, 
  Left, 
  Form, 
  Item, 
  Label 
} from 'native-base';
import { userListSelector } from '../../../store/selectors/group';
import { connect } from 'react-redux';
import { toggleModal } from '../../../store/actions/modal';
import { 
  addGroup, 
  selectGroup, 
  addUsersToGroup, 
  removeUserFromGroup, 
  changeUserGroup, 
  reorderUsers, 
  removeGroup 
} from '../../../store/actions/group';
import { modalTypes } from '../../../store/constants/modal';
import groupConstants from '../../../store/constants/group';

export const GroupTemplate = ({ 
  modal, 
  group, 
  toggleModalAction, 
  addGroupAction, 
  addUsersToGroupAction, 
  selectGroupAction, 
  userList, 
  removeUserFromGroupAction, 
  changeUserGroupAction, 
  reorderUsersAction,
  removeGroupAction
 }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [reorder, setReorder] = useState(false);
  const [initialOrderIndex, setInitialOrderIndex] = useState(0);

  const openUserListModal = group => {
    toggleModalAction({ [modalTypes.USER_LIST_MODAL]: true });
    selectGroupAction(group);
  }
  
  const check = (key) => {
    if (selectedUsers.includes(key)) {
      setSelectedUsers(selectedUsers.filter(i => i !== key));
    } else {
      setSelectedUsers([...selectedUsers, key]);
    }
  };

  const addLocalUsersToGroup = () => {
    addUsersToGroupAction(selectedUsers);
    setSelectedUsers([]);
  }

  const removeUser = (group, user) => {
    selectGroupAction(group);
    removeUserFromGroupAction(user);
  }

  const openChangeGroupModal = (group, user) => {
    toggleModalAction({ [modalTypes.CHANGE_GROUP_MODAL]: true })
    selectGroupAction(group);
    setSelectedUser(user);
  }
  
  const changeGroup = (group) => {
    changeUserGroupAction({ group, user: selectedUser });
    removeUserFromGroupAction(selectedUser);
    toggleModalAction({ [modalTypes.CHANGE_GROUP_MODAL]: false });
  }
  
  const reorderUser = (group, user, index) => {
    setReorder(true);
    selectGroupAction(group);
    setSelectedUser(user);
    setInitialOrderIndex(index);
  }


  const move = (from, to, arr) => {
    const newArr = [...arr];
    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);
    return newArr;
  }

  const swap = (direction) => {
    let arrList = [...group.selectedGroup.users];
    const newIndex = direction === groupConstants.REORDER_UP ? 
      initialOrderIndex - 1: 
      initialOrderIndex + 1;
    const reorder = move(initialOrderIndex, newIndex, arrList);
    setInitialOrderIndex(newIndex);
    reorderUsersAction(reorder);
  }
  return (
    <>
    <Content>
      <List>
        { group.groups.map((i, key) => (
          <React.Fragment key={key}>
            <ListItem itemDivider>
              <Left>
                <Text>{i.groupName}</Text>
              </Left>
              <Right>
                <Grid>
                  <Col>
                    <Icon 
                      name="person-add-sharp"
                      onPress={openUserListModal.bind(null, i)}/>
                  </Col>
                  <Col>
                    <Icon 
                      name="remove"
                      onPress={() => removeGroupAction(i)}/>
                  </Col>
                </Grid>
              </Right>
            </ListItem>
            {i.users.map((user, k) => 
              <ListItem key={k} selected={selectedUser == user && reorder}>
                <Left>
                  <Text>{user.first_name} {user.last_name}</Text>
                </Left>
                <Right>
                  <Grid>
                    <Col>
                      <Icon 
                        name="remove"
                        onPress={() => removeUser(i, user)}/>
                    </Col>
                    <Col>
                      <Icon 
                        name="swap-horizontal"
                        onPress={() => openChangeGroupModal(i, user)}/>
                    </Col>
                    <Col>
                      <Icon 
                        name="swap-vertical"
                        onPress={() => reorderUser(i, user, k)}/>
                    </Col>
                  </Grid>
                </Right>

              </ListItem>
            )}
          </React.Fragment>
        )) }
      </List>
      <Modal visible={modal[modalTypes.CREATE_GROUP_MODAL]}>
        <Header>
          <Left/>
          <Body>
            <Title>Add Group</Title>
          </Body>
          <Right />
        </Header>
      
        <Content>
          <Form>
            <Item>
              <Input 
                placeholder="Enter group name"
                onChangeText={text => setGroupName(text)} />
            </Item>
          </Form>
        </Content>
          
        <Footer>
          <Button onPress={() => toggleModalAction({ [modalTypes.CREATE_GROUP_MODAL]: false })}>
            <Text>Close</Text>
          </Button>

          <Button disabled={!groupName} onPress={() => addGroupAction({ groupName, users: [] })}>
            <Text>Save</Text>
          </Button>
        </Footer>
      </Modal>

      <Modal visible={modal[modalTypes.USER_LIST_MODAL]}>
        <Content>
          <List renderHeader={() => (<Text>Header</Text>)}>
            { userList.map((i, key) => (
              <ListItem key={key}>
                <Text>{i.first_name} {i.last_name}</Text>
                <Right>
                  <CheckBox checked={selectedUsers?.includes(i)} onPress={check.bind(null, i)} />
                </Right>
              </ListItem>
            )) }
          </List>
        </Content>
        <Footer>
          <Button onPress={() => toggleModalAction({ [modalTypes.USER_LIST_MODAL]: false })}>
            <Text>Close</Text>
          </Button>

          <Button onPress={addLocalUsersToGroup}>
            <Text>Add</Text>
          </Button>
        </Footer>
      </Modal>
      <Modal visible={modal[modalTypes.CHANGE_GROUP_MODAL]}>
        <Content>
          <Header>
            <Left/>
            <Body>
              <Title>Select Group</Title>
            </Body>
            <Right />
          </Header>
          <List>
            { group.groups.map((i, key) => (
              <ListItem key={key} onPress={() => changeGroup(i)}>
                <Text>{i.groupName}</Text>
                {/* <Right>
                  <Icon 
                    name="arrow-forward"
                    onPress={() => changeGroup(i)}/>
                </Right> */}
              </ListItem>
              )) }
          </List>
        </Content>
        <Footer>
          <Button onPress={() => toggleModalAction({ [modalTypes.CHANGE_GROUP_MODAL]: false })}>
            <Text>Close</Text>
          </Button>
        </Footer>
      </Modal>
    </Content>
  { reorder &&
    <Footer>
      <Button 
        disabled={!initialOrderIndex}
        onPress={() => swap(groupConstants.REORDER_UP) }>
        <Icon name="arrow-up" />
      </Button>
      <Button
        disabled={group.selectedGroup.users.length - 1 === initialOrderIndex}
        onPress={() => swap(groupConstants.REORDER_DOWN) }>
        <Icon name="arrow-down" />
      </Button>
      <Button onPress={() => setReorder(false)}>
        <Icon name="checkmark" />
      </Button>
    </Footer>
  }

  <Fab 
    position="bottomRight"
    onPress={() => {
      toggleModalAction({ [modalTypes.CREATE_GROUP_MODAL]: true })
    }}
  >
    <Icon name="add" />
  </Fab>
  </>
  )
}

const mapStateToProps = (state) => {
  const { modal, group } = state;
  const userList = userListSelector(state);
  return { modal, group, userList };
};

const mapDispatchToProps = {
  toggleModalAction: toggleModal,
  addGroupAction: addGroup,
  selectGroupAction: selectGroup, 
  addUsersToGroupAction: addUsersToGroup, 
  removeUserFromGroupAction: removeUserFromGroup, 
  changeUserGroupAction: changeUserGroup, 
  reorderUsersAction: reorderUsers, 
  removeGroupAction: removeGroup, 
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupTemplate)
