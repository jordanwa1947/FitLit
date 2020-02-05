class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  calcAvgOuncesConsuedForAllTime(id) {
    let hydrationPerUser = this.hydrationData.filter(hydration => {
      return hydration.userID === id;
    });
    let totalHydration = hydrationPerUser.reduce((acc, hydration) => {
      return acc + hydration.numOunces
    }, 0)
    return totalHydration / hydrationPerUser.length;
  }

  displayFluidOuncesConsumed(id, date) {
    let hydrationPerUser = this.hydrationData.filter(hydration => {
      return hydration.userID === id;
    })
    let hydrationPerDate = hydrationPerUser.find(hydrationDate => {
      return hydrationDate.date === date;
    })
    return hydrationPerDate.numOunces;
  }
}


if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
