class Activity {
  constructor(activityData, userRepoMethods) {
    this.activityData = activityData;
    this.repoMethods = userRepoMethods;
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

  findAllUserActivitiesByDate(date) {
    return this.activityData.filter(activity => {
      return activity.date === date;
    });
  }

  getNumStepsTakenForDay(id, date) {
    return this.findUserActivityByDate(id, date).numSteps;
  }

  getMilesWalkedForDay(id, date, stride) {
    return Number(((this.findUserActivityByDate(id, date).numSteps * stride) / 5280).toFixed(1));
  }

  getMinutesActive(id, date) {
    return this.findUserActivityByDate(id, date).minutesActive;
  }

  getStepGoalFeedback(id, date, dailyStepGoal) {
    const currentUser = this.findUserActivityByDate(id, date);
    return currentUser.numSteps >= dailyStepGoal ? true : false;
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

  findAverageForAllUsers(date, metric) {
    const allUserActivities = this.findAllUserActivitiesByDate(date);
    const totalSumForMetric = allUserActivities.reduce((acc, activity) => {
      return acc + activity[metric];
    }, 0);
    return Math.round(totalSumForMetric / allUserActivities.length);
  }

  findAverageStairsClimbedForDay(date, metric) {
    return this.findAverageForAllUsers(date, "flightsOfStairs");
  }

  findAverageStepsTakenForDay(date) {
    return this.findAverageForAllUsers(date, "numSteps");
  }

  findAverageMinutesActiveForDay(date) {
    return this.findAverageForAllUsers(date, "minutesActive");
  }

  findAverageMetricForWeek(id, date, metric) {
    const activitiesForAUser = this.findAllUserActivities(id);
    const activitiesForWeek = this.repoMethods.findDataForAGivenWeek(date, activitiesForAUser);
    const average = this.repoMethods.findAverage(activitiesForWeek, metric, 7);
    return Math.round(average);
  }

  findAverageMinutesActiveForWeek(id, date) {
    return this.findAverageMetricForWeek(id, date, "minutesActive");
  }

  findAverageStepsTakenForWeek(id, date) {
    return this.findAverageMetricForWeek(id, date, "numSteps");
  }

  findAverageStairsClimbedForWeek(id, date) {
    return this.findAverageMetricForWeek(id, date, "flightsOfStairs");
  }

}


if (typeof module !== 'undefined') {
  module.exports = Activity;
}
