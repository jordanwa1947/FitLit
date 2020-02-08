class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  }

  getMilesWalkedForDay(id, date, stride) {
  let activityPerUser = this.activityData.filter(activity => {
    return activity.userID === id;
  });

  let activityPerDate = activityPerUser.find(activity => {
    return activity.date === date;
  });

  return Number(((activityPerDate.numSteps * stride) / 5280).toFixed(1));
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}
