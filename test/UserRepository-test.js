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

describe('UserRepository Module Methods', function() {
  let userRepository, users, sleepData;
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
    sleepData = [{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 8.1,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    },
    {
      "userID": 2,
      "date": "2019/06/14",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    },
    {
      "userID": 2,
      "date": "2019/06/13",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    },
    {
      "userID": 2,
      "date": "2019/06/12",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    },
    {
      "userID": 2,
      "date": "2019/06/11",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    },
    {
      "userID": 2,
      "date": "2019/06/10",
      "hoursSlept": 10.8,
      "sleepQuality": 5.7
    },
    {
      "userID": 2,
      "date": "2019/06/09",
      "hoursSlept": 10.8,
      "sleepQuality": 5.7
    },
    {
      "userID": 2,
      "date": "2019/06/08",
      "hoursSlept": 10.8,
      "sleepQuality": 5.7
    },
    {
      "userID": 2,
      "date": "2019/06/07",
      "hoursSlept": 10.8,
      "sleepQuality": 5.7
    },
    {
      "userID": 2,
      "date": "2019/06/16",
      "hoursSlept": 10.8,
      "sleepQuality": 5.7
    },
    {
      "userID": 3,
      "date": "2019/06/08",
      "hoursSlept": 10.8,
      "sleepQuality": 5.7
    }];
    userRepository = new UserRepository(users);
  });

  it('should be able to find all of the user sleep records for week', function() {
    const repoMethods = userRepository.repoMethods();
    const usersWithinAGivenWeek = repoMethods.findDataForAGivenWeek('2019/06/15', sleepData);
    expect(usersWithinAGivenWeek.length).to.equal(8);
  });

});
