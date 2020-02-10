class UserRepository {
  constructor(dataAttributes) {
    this.users = dataAttributes;
  }

  getUserData(id) {
    return this.users.find(user => user.id === id);
  }

  calculateAvgStepGoalOfUsers() {
    var totalDailySteps = this.users.reduce((acc, user) => {
      return acc + user.dailyStepGoal;
    }, 0);
    return totalDailySteps / this.users.length;
  }

  searchMethods() {
    function findDataForAGivenWeek(date, records) {
      let currentDate = new Date(date).getTime();
      const weekInMilliseconds = 604800000;
      const lastWeek = currentDate - weekInMilliseconds;
      return records.filter((data) => {
        let dataDate = new Date(data.date).getTime();
        return dataDate > lastWeek && dataDate <= currentDate;
      });
    }

    return {
      findDataForAGivenWeek: findDataForAGivenWeek
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
