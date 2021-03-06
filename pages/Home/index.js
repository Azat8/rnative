import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Input, Fab, Icon, Button, Right, Footer, CheckBox } from 'native-base';
import { userListSelector } from '../../store/selectors/group';
import { connect } from 'react-redux';
import { toggleModal } from '../../store/actions/modal';
import { addGroup, selectGroup, addUsersToGroup, removeUserFromGroup, changeUserGroup, reorderUsers } from '../../store/actions/group';
import { modalTypes } from '../../store/constants/modal';
import groupConstants from '../../store/constants/group';

const Home = ({ modal, group, toggleModalAction, addGroupAction, addUsersToGroupAction, selectGroupAction, userList, removeUserFromGroupAction, changeUserGroupAction, reorderUsersAction }) => {
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
    <Container>
        <Header />
        <Content>
          <List>
            { group.groups.map((i, key) => (
              <React.Fragment key={key}>
                <ListItem itemDivider>
                  <Text>{i.groupName}</Text>
                  <Right>
                    <Icon 
                      name="arrow-forward"
                      onPress={openUserListModal.bind(null, i)}/>
                  </Right>
                </ListItem>
                {i.users.map((user, k) => 
                  <ListItem key={k} selected={selectedUser == user && reorder}>
                    <Text>{user.first_name} {user.last_name}</Text>
                    <Icon 
                      name="remove"
                      onPress={() => removeUser(i, user)}/>
                    <Right />
                    <Icon 
                      name="swap-horizontal"
                      onPress={() => openChangeGroupModal(i, user)}/>

                    <Icon 
                      name="swap-vertical"
                      onPress={() => reorderUser(i, user, k)}/>
                  </ListItem>
                )}
              </React.Fragment>
            )) }
          </List>
          <Modal visible={modal[modalTypes.CREATE_GROUP_MODAL]}>
            <Input 
              placeholder="Name"
              onChangeText={text => setGroupName(text)} />
            <Button onPress={() => toggleModalAction({ [modalTypes.CREATE_GROUP_MODAL]: false })}>
              <Text>Close</Text>
            </Button>

            <Button onPress={() => addGroupAction({ groupName, users: [] })}>
              <Text>Save</Text>
            </Button>
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
              <List>
                { group.groups.map((i, key) => (
                  <ListItem key={key}>
                    <Text>{i.groupName}</Text>
                    <Right>
                      <Icon 
                        name="arrow-forward"
                        onPress={() => changeGroup(i)}/>
                    </Right>
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
      </Container>
  );
};

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
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);