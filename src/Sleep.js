class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  findAvergeSleepForAUser(id) {
    let hoursSlept = 0;
    let numberOfRecords = 0;
    this.sleepData.forEach((data) => {
      if(data.userID === id) {
        hoursSlept += data.hoursSlept;
        numberOfRecords++;
      }
    });
    return hoursSlept / numberOfRecords || 0;
  }
}

module.exports = Sleep;
