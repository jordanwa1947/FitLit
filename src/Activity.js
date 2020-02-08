class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  }

  findAllUserActivities(id, date) {
    let activityPerUser = this.activityData.filter(activity => {
      return activity.userID === id;
    });

    let activityPerDate = activityPerUser.find(activity => {
      return activity.date === date;
    });
    return activityPerDate;
  }

  getMilesWalkedForDay(id, date, stride) {
    this.findAllUserActivities(id, date)
    return Number(((this.findAllUserActivities(id, date).numSteps * stride) / 5280).toFixed(1));
  }
}


if (typeof module !== 'undefined') {
  module.exports = Activity;
}
