class Hydration {
  constructor(hydrationData, userRepoMethods) {
    this.hydrationData = hydrationData;
    this.repoMethods = userRepoMethods;
  }

  findDataForAUser(id) {
    return this.hydrationData.filter(hydration => {
      return hydration.userID === id;
    });
  }

  calcAvgOuncesConsumedForAllTime(id) {
    const hydrationPerUser = this.findDataForAUser(id);
    let totalHydration = hydrationPerUser.reduce((acc, hydration) => {
      return acc + hydration.numOunces
    }, 0)
    return totalHydration / hydrationPerUser.length;
  }

  displayFluidOuncesConsumed(id, date) {
    let hydrationPerUser = this.findDataForAUser(id)
    let hydrationPerDate = hydrationPerUser.find(hydrationDate => {
      return hydrationDate.date === date;
    })
    return hydrationPerDate.numOunces;
  }

  findHydrationDataForAWeek(id, date) {
    const hydrationForAUser = this.findDataForAUser(id);
    return this.repoMethods.findDataForAGivenWeek(date, hydrationForAUser);
  }
}


if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
