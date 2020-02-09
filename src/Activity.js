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

  findAllUserActivitiesByDate(date) {
    return this.activityData.filter(activity => {
      return activity.date === date;
    });
  }

  getMilesWalkedForDay(id, date, stride) {
    return Number(((this.findUserActivityByDate(id, date).numSteps * stride) / 5280).toFixed(1));
  }

  getMinutesActive(id, date) {
    return this.findUserActivityByDate(id, date).minutesActive;
  }

  getStepGoalFeedback(id, date, dailyStepGoal) {
    const currentUser = this.findUserActivityByDate(id, date);
    if (currentUser.numSteps >= dailyStepGoal) {
      return true;
    }
    if(currentUser.numSteps < dailyStepGoal) {
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

  findDataForAGivenWeek(date, records) {
    let currentDate = new Date(date).getTime();
    const weekInMilliseconds = 604800000;
    const lastWeek = currentDate - weekInMilliseconds;
    return records.filter((data) => {
      let dataDate = new Date(data.date).getTime();
      return dataDate > lastWeek && dataDate <= currentDate;
    });
  }

  findAverageMinutesActiveForWeek(id, date) {
    const activitiesForWeek = this.findDataForAGivenWeek(date, this.activityData);
    const minutesActiveForWeekByUser = activitiesForWeek.reduce((acc, activity) => {
      if (activity.userID === id) {
      return acc + activity.minutesActive;
      }
      return acc;
    }, 0);
    return Math.round(minutesActiveForWeekByUser / 7);
  }
}


if (typeof module !== 'undefined') {
  module.exports = Activity;
}
