const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');

describe('User', function() {

  let user;
  beforeEach(function() {
    user = new User({
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        16,
        4,
        8
      ]
    })
  });

  it('should exist', function() {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should have an id', function() {
    expect(user.id).to.equal(1);
  });

  it('should have an name', function() {
    expect(user.name).to.equal("Luisa Hane");
  });

  it('should have an address', function() {
    expect(user.address).to.equal("15195 Nakia Tunnel, Erdmanport VA 19901-1697");
  });

  it('should have an email', function() {
    expect(user.email).to.equal("Diana.Hayes1@hotmail.com");
  });

  it('should have an strideLength', function() {
    expect(user.strideLength).to.equal(4.3);
  });

  it('should have an dailyStepGoal', function() {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it('should have an friends', function() {
    expect(user.friends).to.deep.equal([16,4,8]);
  });
})
