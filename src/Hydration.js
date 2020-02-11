class Hydration {
  constructor(hydrationData, userRepoMethods) {
    this.hydrationData = hydrationData;
    this.repoMethods = userRepoMethods;
  }

  calcAvgOuncesConsumedForAllTime(id) {
    const userHydration = this.repoMethods.filterRecords(id, 'userID', this.hydrationData);
    return this.repoMethods.findAverage(userHydration, 'numOunces', userHydration.length);
  }

  displayFluidOuncesConsumed(id, date) {
    let userHydration = this.repoMethods.filterRecords(id, 'userID', this.hydrationData);
    let hydrationPerDate = userHydration.find(hydrationDate => {
      return hydrationDate.date === date;
    })
    return hydrationPerDate.numOunces;
  }

  findHydrationDataForAWeek(id, date) {
    const userHydration = this.repoMethods.filterRecords(id, 'userID', this.hydrationData);
    return this.repoMethods.findDataForAGivenWeek(date, userHydration);
  }
}


if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
