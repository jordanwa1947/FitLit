const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration');
const UserRepository = require('../src/UserRepository');
let hydration, hydrationData, userRepository;

beforeEach(()=> {
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
  userRepository = new UserRepository({});
  hydration = new Hydration(hydrationData, userRepository.repoMethods());
})

describe('Hydration', function() {
  it('should be a function', function() {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

  it('should calculate the average fluid ounces consumed per day for all time per user', function() {
    expect(hydration.calcAvgOuncesConsumedForAllTime(1)).to .equal(53);
    expect(hydration.calcAvgOuncesConsumedForAllTime(2)).to.equal(83);
  });

  it('should retun the amount fluid ounces consumed for a specific date', function() {
    expect(hydration.displayFluidOuncesConsumed(1, "2019/06/16")).to.equal(69);
    expect(hydration.displayFluidOuncesConsumed(2, "2019/06/16")).to.equal(91);
  })

});
