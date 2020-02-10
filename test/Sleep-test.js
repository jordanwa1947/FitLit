const chai = require('chai');
const expect = chai.expect;

const Sleep = require('../src/Sleep');
const UserRepository = require('../src/UserRepository');

let sleep, sleepData, userRepository;

beforeEach(()=> {
  userRepository = new UserRepository({});
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
  sleep = new Sleep(sleepData, userRepository.searchMethods());
})

describe('Sleep', function() {
  it('should be a function', function() {
    expect(sleep).to.be.an.instanceOf(Sleep);
  });

  it('should be able to calculate the average sleep for a user', function() {
    expect(sleep.findAverageForAUser(2, 'hoursSlept')).to.equal(8.899999999999999);
  });

  it('should be able to calculate the average sleep quality for a user', function() {
    expect(sleep.findAverageForAUser(2, 'sleepQuality')).to.equal(5.200000000000001);
  });

  it('should be able to find how many hours a user slept for a certain date', function() {
    expect(sleep.returnSleepDataField(2, '2019/06/16', 'hoursSlept')).to.equal(10.8);
  });

  it('should be able to find the sleep quality on a certain date for a user', function() {
    expect(sleep.returnSleepDataField(2, '2019/06/16', 'sleepQuality')).to.equal(5.7);
  });

  it('should be able to find the sleep data of users for a given date', function() {
    expect(sleep.returnSleepDataField(2, '2019/06/16', 'sleepQuality')).to.equal(5.7);
  });

  it('should be able to find the average hours slept over a week', function() {
    expect(sleep.findAverageForAUserOverAWeek('2019/06/15', 'hoursSlept')).to.equal(8.0875);
  });

  it('should be able to find the average sleep quality over a week', function() {
    expect(sleep.findAverageForAUserOverAWeek('2019/06/15', 'sleepQuality')).to.equal(4.6375);
  });

  it('should be able to find the average sleep quality over all users', function() {
    expect(sleep.findAverageForAllUsers('sleepQuality')).to.equal(4.991666666666668);
  });

  it('should be able to find users who had an average sleep quality greater than three during a week', function() {
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
    }]
    expect(sleep.findUsersWithAvgGreaterThanThree(users, 'sleepQuality', '2019/06/15')).to.deep.equal([users[1]]);
  });

  it('should be able to find all records for a date', function() {
    expect(sleep.findAllRecordsByDate('2019/06/15')).to.deep.equal([{
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
    }]);
  });

  it('should be able find the user/s with the most sleep for a given date', function() {
    expect(sleep.findTheUserWithTheMostSleep('2019/06/15')).to.deep.equal([{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 8.1,
      "sleepQuality": 2.2
    }]);
  });

  it('should return multiple users with the most sleep if a tie happens', function() {
    expect(sleep.findTheUserWithTheMostSleep('2019/06/08')).to.deep.equal([{
      "userID": 3,
      "date": "2019/06/08",
      "hoursSlept": 10.8,
      "sleepQuality": 5.7
    },
    {
      "userID": 2,
      "date": "2019/06/08",
      "hoursSlept": 10.8,
      "sleepQuality": 5.7
    }]);
  })

});
