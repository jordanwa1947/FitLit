const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration');
let users, hydration, hydrationData;

beforeEach(()=> {
  users = [{
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
  },
  {
    "id": 2,
    "name": "Jarvis Considine",
    "address": "30086 Kathryn Port, Ciceroland NE 07273",
    "email": "Dimitri.Bechtelar11@gmail.com",
    "strideLength": 4.5,
    "dailyStepGoal": 5000,
    "friends": [
      9,
      18,
      24,
      19
    ]
  }];

  hydrationData = [{
    "userID": 1,
    "date": "2019/06/15",
    "numOunces": 37
  },
  {
    "userID": 1,
    "date": "2019/06/16",
    "numOunces": 69
  },
  {
    "userID": 2,
    "date": "2019/06/16",
    "numOunces": 91
  },
  {
    "userID": 2,
    "date": "2019/06/15",
    "numOunces": 75
  }];

  hydration = new Hydration(hydrationData);
})

describe('Hydration', function() {
  it('should be a function', function() {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

  it('should calculate the average fluid ounces consumed per day for all time per user', function() {
  expect(hydration.calcAvgOuncesConsuedForAllTime(1)).to .equal(53);
  expect(hydration.calcAvgOuncesConsuedForAllTime(2)).to.equal(83);
  });

});
