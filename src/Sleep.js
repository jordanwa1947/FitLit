class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  findUserSleepData(id, date) {
    return this.sleepData.find((sleepData) => {
      return sleepData.date === date;
    });
  }

  returnSleepDataField(id, date, field) {
    return this.findUserSleepData(id, date)[field];
  }

  findAverge(id, field) {
    let sum = 0;
    let numberOfRecords = 0;
    this.sleepData.forEach((data) => {
      if(data.userID === id) {
        sum += data[field];
        numberOfRecords++;
      }
    });
    return sum / numberOfRecords || 0;
  }
}

module.exports = Sleep;
