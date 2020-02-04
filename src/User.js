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
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
