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

  findAllUserActivitiesByDate(date) {
    return this.activityData.filter(activity => {
      return activity.date === date;
    });
  }

  findAverageStairsClimbedForDay(date) {
    const allUserActivities = this.findAllUserActivitiesByDate(date);
    const totalStairsClimbed = allUserActivities.reduce((acc, activity) => {
      return acc + activity.flightsOfStairs;
    }, 0);
    return Math.round(totalStairsClimbed / allUserActivities.length);
  }

  findAverageStepsTakenForDay(date) {
    const allUserActivities = this.findAllUserActivitiesByDate(date);
    const totalStepsTaken = allUserActivities.reduce((acc, activity) => {
      return acc + activity.numSteps;
    }, 0);
    return Math.round(totalStepsTaken / allUserActivities.length);
  }

  findAverageMinutesActiveForDay(date) {
    const allUserActivities = this.findAllUserActivitiesByDate(date);
    const totalMinutesActive = allUserActivities.reduce((acc, activity) => {
      return acc + activity.minutesActive;
    }, 0);
    return Math.round(totalMinutesActive / allUserActivities.length);
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
