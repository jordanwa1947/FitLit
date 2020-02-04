const User = require('../src/User');


class UserRepository {
  constructor(dataAttributes) {
    this.users = this.generateUsers(dataAttributes);
  }

  generateUsers(dataAttributes) {
    return dataAttributes.map(data => {
      return new User(data);
    })
  }
  getUserData(id) {
    return this.users.find(user => user.id === id);
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
