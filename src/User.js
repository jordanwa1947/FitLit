class User {
  constructor(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.address = attributes.address;
    this.email = attributes.email;
    this.strideLength = attributes.strideLength;
    this.dailyStepGoal = attributes.dailyStepGoal;
    this.friends = attributes.friends;
  }

  getUserFirstName() {
    return this.name.split(' ')[0];
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
