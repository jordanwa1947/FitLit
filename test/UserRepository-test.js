const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');
const User = require('../src/User');

describe('UserRepository', function() {

  let userRepository, users;
  beforeEach(function() {
    users = [{
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [16,4,8]
    },
    {
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [9,18,24,19]
    }];
    userRepository = new UserRepository(users);
  });

  it('should exist', function() {
    expect(userRepository).to.be.an.instanceOf(UserRepository);
  });

  it('should create an array of users', function() {
    expect(Array.isArray(userRepository.users)).to.equal(true);
  });

  it('should return a user\'s data based on their id', function() {
    expect(userRepository.getUserData(2)).to.deep.equal(users[1]);
  });

  it('should calculate the average step goal amongst all users', function() {
    expect(userRepository.calculateAvgStepGoalOfUsers()).to.equal(7500);
  });

});
