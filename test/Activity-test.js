const chai = require('chai');
const expect = chai.expect;

const Activity = require('../src/Activity');
let activityData, activity;

beforeEach(() => {
  activityData = [
    {
      "userID": 4,
      "date": "2019/06/15",
      "numSteps": 3486,
      "minutesActive": 114,
      "flightsOfStairs": 32
    },
    {
      "userID": 5,
      "date": "2019/06/15",
      "numSteps": 11374,
      "minutesActive": 213,
      "flightsOfStairs": 13
    }
  ];
  activity = new Activity(activityData);
});

describe('Activity', function() {
  it('should be a function', function() {
    expect(activity).to.be.an.instanceOf(Activity);
  });

  it.skip('should return the number of miles a user walked for a specific day based on on their number of steps', function() {

  });

  it.skip('should return how many minutes a user was active for a given day, specified by the date', function() {

  });

  it.skip('should return the average number of active minutes for a given week', function() {

  });

  describe('step goal achieved', function() {
    it.skip('should return true if step goal for a given day has been achieved', function() {

    });
    it.skip('should return false if step goal for a given day has not been achieved', function() {

    });
  });

  it.skip('should find all the days a user exceeded their step goal', function() {

  });

  it.skip('should find the all time stair climbing record for a user', function() {

  });

  it.skip('should find the average number of stairs climbed for all users for a specified date', function() {

  });

  it.skip('should find the average number of steps taken for a specific date for all users', function() {

  });

  it.skip('should find the average number of minutes active for a specific date for all users', function() {

  });
});
