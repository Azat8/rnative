import employees from '../../employees.json';

export const userListSelector = state => {
  let users = [];
  state.group.groups.forEach(i => users = [...users, ...i.users]);
  return employees.filter(i => !users.includes(i));
};