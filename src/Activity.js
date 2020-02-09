class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  }

  findAllUserActivities(id) {
    const activityPerUser = this.activityData.filter(activity => {
      return activity.userID === id;
    });
    return activityPerUser;
  }

  findUserActivityByDate(id, date) {
    const activityPerUser = this.findAllUserActivities(id);
    const activityPerDate = activityPerUser.find(activity => {
      return activity.date === date;
    });
    return activityPerDate;
  }

  getMilesWalkedForDay(id, date, stride) {
    return Number(((this.findUserActivityByDate(id, date).numSteps * stride) / 5280).toFixed(1));
  }

  getMinutesActive(id, date) {
    return this.findUserActivityByDate(id, date).minutesActive;
  }

  getStepGoalFeedback(id, date, dailyStepGoal) {
    if (this.findUserActivityByDate(id, date).numSteps >= dailyStepGoal) {
      return true;
    }
    if(this.findUserActivityByDate(id, date).numSteps < dailyStepGoal) {
      return false;
    }
  }

  getAllDaysStepGoalWasExceeded(id, dailyStepGoal) {
    const activityPerUser = this.findAllUserActivities(id);
    const stepGoalExceeded = activityPerUser.filter(activity => {
      return activity.numSteps > dailyStepGoal;
    });
    return stepGoalExceeded.map(stepGoals => {
      return stepGoals.date;
    });
  }

  findAllTimeStairClimbingRecord(id) {
    const activityPerUser = this.findAllUserActivities(id);
    const stairClimbingSorted = activityPerUser.sort((a, b) => {
      return a.flightsOfStairs - b.flightsOfStairs;
    });
    return stairClimbingSorted[stairClimbingSorted.length - 1];
  }

}


if (typeof module !== 'undefined') {
  module.exports = Activity;
}
