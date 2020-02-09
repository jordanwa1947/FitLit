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

}


if (typeof module !== 'undefined') {
  module.exports = Activity;
}
