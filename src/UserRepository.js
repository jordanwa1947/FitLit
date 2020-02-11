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

  repoMethods() {

    function filterRecords(query, field, records) {
      return records.filter((record) => record[field] === query);
    }

    function findDataForAGivenWeek(date, records) {
      let currentDate = new Date(date).getTime();
      const weekInMilliseconds = 604800000;
      const lastWeek = currentDate - weekInMilliseconds;
      return records.filter((data) => {
        let dataDate = new Date(data.date).getTime();
        return dataDate > lastWeek && dataDate <= currentDate;
      });
    }

    function findAverage(records, field, denominator) {
      const sum = records.reduce((sum, data) => {
        return sum + data[field]
      }, 0);
      return sum / denominator || 0;
    }

    return {
      findDataForAGivenWeek: findDataForAGivenWeek,
      findAverage: findAverage,
      filterRecords: filterRecords
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
