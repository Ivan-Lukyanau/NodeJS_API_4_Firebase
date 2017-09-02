
const getUsers = function() {
  const newUser_1 = { name: 'IvanTest1', userId: 'c62045d1-bf1b-fe5d-4701-7ecfc9ba4b47' };
  const newUser_2 = { name: 'IvanTest2', userId: 'd62045d1-bf1b-fe5d-4701-7ecfc9ba4b47' };
  const newUser_3 = { name: 'IvanTest3', userId: 'd62045d1-bf1b-fe5d-4701-7ecfc9ba4b47' };
  const newUser_4 = { name: 'IvanTest4', userId: 'd62045d1-bf1b-fe5d-4701-7ecfc9ba4b47' };
  return [newUser_1, newUser_2, newUser_3, newUser_4];
}

module.exports = {
  getUsers: getUsers,
}