class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
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

  findDataForAGivenWeek(date, records) {
    let currentDate = new Date(date).getTime();
    const weekInMilliseconds = 604800000;
    const lastWeek = currentDate - weekInMilliseconds;
    return records.filter((data) => {
      let dataDate = new Date(data.date).getTime();
      return dataDate > lastWeek && dataDate <= currentDate;
    });
  }
}


if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
