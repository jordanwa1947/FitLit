const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const Activity = require('../src/Activity');
let activityData, user, activity;

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

  user = new User({
    "id": 4,
    "name": "Mae Connelly",
    "address": "28926 Schinner Islands, Turnermouth NE 23720-3230",
    "email": "Marcos_Pollich@hotmail.com",
    "strideLength": 3.1,
    "dailyStepGoal": 4000,
    "friends": [
      48,
      7,
      44,
      8
    ]
  },
  {
    "id": 5,
    "name": "Erick Schaden",
    "address": "514 Mayert Walk, Jordaneside SC 55023-6523",
    "email": "Vanessa_Gerhold@gmail.com",
    "strideLength": 3.1,
    "dailyStepGoal": 8000,
    "friends": [
      13,
      44,
      49,
      33,
      10
    ]
  })
  activity = new Activity(activityData);
});

describe('Activity', function() {
  it('should be a function', function() {
    expect(activity).to.be.an.instanceOf(Activity);
  });

  it('should have a property that takes in an array the activity data of all users', function() {
    expect(activity.activityData).to.deep.equal(activityData);
  });

  it('should return the number of miles a user walked for a specific day based on on their number of steps', function() {
    expect(activity.getMilesWalkedForDay(activityData[0], user[0])).to.equal(2.0);
    expect(activity.getMilesWalkedForDay(activityData[1], user[1])).to.equal(6.7);
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
