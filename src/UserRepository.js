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
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
