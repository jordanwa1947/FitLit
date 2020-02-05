class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  findUserSleepData(id, date) {
    return this.sleepData.find((sleepData) => {
      return sleepData.date === date;
    });
  }

  findAverge(records, field) {
    const sum = records.reduce((sum, data) => {
      return sum + data[field]
    }, 0);
    return sum / records.length || 0;
  }

  returnSleepDataField(id, date, field) {
    return this.findUserSleepData(id, date)[field];
  }

  findAvergeForAUser(id, field) {
    const records = this.sleepData.filter((data) => data.userID === id);
    return this.findAverge(records, field);
  }

  findSleepDataForAGivenWeek(date) {
    let currentDate = new Date(date).getTime();
    const weekInMilliseconds = 604800000;
    const lastWeek = currentDate - weekInMilliseconds;
    return this.sleepData.filter((data) => {
      let dataDate = new Date(data.date).getTime();
      return dataDate > lastWeek && dataDate <= currentDate;
    })
  }

  findAvergeForAUserOverAWeek(date, field) {
    var records = this.findSleepDataForAGivenWeek(date);
    return this.findAverge(records, field);
  }
}

module.exports = Sleep;
