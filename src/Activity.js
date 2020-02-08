class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  }

  findAllUserActivities(id, date) {
    const activityPerUser = this.activityData.filter(activity => {
      return activity.userID === id;
    });

    const activityPerDate = activityPerUser.find(activity => {
      return activity.date === date;
    });
    return activityPerDate;
  }

  getMilesWalkedForDay(id, date, stride) {
    return Number(((this.findAllUserActivities(id, date).numSteps * stride) / 5280).toFixed(1));
  }

  getMinutesActive(id, date) {
    return this.findAllUserActivities(id, date).minutesActive;
  }

}


if (typeof module !== 'undefined') {
  module.exports = Activity;
}
