const chai = require('chai');
const expect = chai.expect;

const Sleep = require('../src/Sleep');

let sleep, sleepData;

beforeEach(()=> {
  sleepData = [{
    "userID": 1,
    "date": "2019/06/15",
    "hoursSlept": 6.1,
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
    "date": "2019/06/08",
    "hoursSlept": 10.8,
    "sleepQuality": 5.7
  },
  {
    "userID": 2,
    "date": "2019/06/16",
    "hoursSlept": 10.8,
    "sleepQuality": 5.7
  }];
  sleep = new Sleep(sleepData);
})

describe('Sleep', function() {
  it('should be a function', function() {
    expect(sleep).to.be.an.instanceOf(Sleep);
  });

  it('should be able to calculate the average sleep for a user', function() {
    expect(sleep.findAvergeForAUser(2, 'hoursSlept')).to.equal(8.899999999999999);
  });

  it('should be able to calculate the average sleep quality for a user', function() {
    expect(sleep.findAvergeForAUser(2, 'sleepQuality')).to.equal(5.200000000000001);
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

  it('should be able to find all of the user sleep records for week', function() {
    const usersWithinAGivenWeek = sleep.findSleepDataForAGivenWeek('2019/06/15');
    expect(usersWithinAGivenWeek.length).to.equal(8);
  });

  it('should be able to find the average hours slept over a week', function() {
    expect(sleep.findAvergeForAUserOverAWeek('2019/06/15', 'hoursSlept')).to.equal(7.8375);
  });

});
