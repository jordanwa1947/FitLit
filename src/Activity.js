class Activity {
  constructor(activityData, userRepoMethods) {
    this.activityData = activityData;
    this.repoMethods = userRepoMethods;
  }

  findUserActivityByDate(id, date) {
    const activityPerUser = this.repoMethods.filterRecords(id, 'userID', this.activityData);
    const activityPerDate = activityPerUser.find(activity => {
      return activity.date === date;
    });
    return activityPerDate;
  }

  getNumStepsTakenForDay(id, date) {
    return this.findUserActivityByDate(id, date).numSteps;
  }

  getMilesWalkedForDay(id, date, stride) {
    const userActivity = this.findUserActivityByDate(id, date);
    const lengthWalked = userActivity.numSteps * stride / 5280;
    return Number((lengthWalked).toFixed(1));
  }

  getMinutesActive(id, date) {
    return this.findUserActivityByDate(id, date).minutesActive;
  }

  getStepGoalFeedback(id, date, dailyStepGoal) {
    const currentUser = this.findUserActivityByDate(id, date);
    return currentUser.numSteps >= dailyStepGoal ? true : false;
  }

  getAllDaysStepGoalWasExceeded(id, dailyStepGoal) {
    const activityPerUser = this.repoMethods.filterRecords(id, 'userID', this.activityData);
    const stepGoalExceeded = activityPerUser.filter(activity => {
      return activity.numSteps > dailyStepGoal;
    });
    return stepGoalExceeded.map(stepGoals => {
      return stepGoals.date;
    });
  }

  findAllTimeStairClimbingRecord(id) {
    const activityPerUser = this.repoMethods.filterRecords(id, 'userID', this.activityData);
    const stairClimbingSorted = activityPerUser.sort((a, b) => {
      return a.flightsOfStairs - b.flightsOfStairs;
    });
    return stairClimbingSorted[stairClimbingSorted.length - 1];
  }

  findAverageForAllUsers(date, metric) {
    const allUserActivities = this.repoMethods.filterRecords(date, 'date', this.activityData);
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
    const activitiesForAUser = this.repoMethods.filterRecords(id, 'userID', this.activityData);
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

  sortFriendSteps(averageSteps) {
    return averageSteps.sort((a, b) => {
      if (a[1] < b[1]) {
        return 1;
      } else if (a[1] > b[1]){
        return -1;
      } else {
        return 0;
      }
    })
  }

  sumStepsForAUser(id, date) {
    const activitiesForAUser = this.repoMethods.filterRecords(id, 'userID', this.activityData);
    const activitiesForWeek = this.repoMethods.findDataForAGivenWeek(date, activitiesForAUser);
    return activitiesForWeek.reduce((sum, activity) => {
      return sum + activity.numSteps;
    }, 0)
  }

  calculateFriendSteps(friendIds, date) {
    const friendAverageSteps = friendIds.map(id => {
      const total = this.sumStepsForAUser(id, date);
      return [id, total];
    });
    return this.sortFriendSteps(friendAverageSteps)
  }

//only works if records are in chronological order
  daysWithIncreasingSteps(id) {
    const activities = this.repoMethods.filterRecords(id, 'userID', this.activityData);
    const stepStreaks = [];
    for (let i = activities.length - 1; i >= 2; i--) {
      const greaterThanDayOne = activities[i - 1].numSteps < activities[i].numSteps;
      const greaterThanDayTwo = activities[i - 2].numSteps < activities[i].numSteps;
      const twoGreaterThanOne = activities[i - 1].numSteps > activities[i - 2].numSteps
      if (greaterThanDayOne && greaterThanDayTwo && twoGreaterThanOne) {
        stepStreaks.push(activities[i]);
      }
    }
    return stepStreaks;
  }

}


if (typeof module !== 'undefined') {
  module.exports = Activity;
}
