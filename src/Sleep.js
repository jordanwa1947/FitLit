class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
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
