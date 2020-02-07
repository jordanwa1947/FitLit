class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  findUserSleepData(id, date) {
    return this.sleepData.find((sleepData) => {
      return sleepData.date === date;
    });
  }

  findAverage(records, field) {
    const sum = records.reduce((sum, data) => {
      return sum + data[field]
    }, 0);
    return sum / records.length || 0;
  }

  returnSleepDataField(id, date, field) {
    return this.findUserSleepData(id, date)[field];
  }

  findAllRecordsForAUser(id, records) {
    return records.filter((data) => data.userID === id);
  }

  findAllRecordsByDate(date) {
    return this.sleepData.filter((data) => data.date === date);
  }

  findAverageForAUser(id, field) {
    const userRecords = this.findAllRecordsForAUser(id, this.sleepData);
    return this.findAverage(userRecords, field);
  }

  findAverageForAllUsers(field) {
    return this.findAverage(this.sleepData, field);
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

  findAverageForAUserOverAWeek(date, field) {
    var records = this.findDataForAGivenWeek(date, this.sleepData);
    return this.findAverage(records, field);
  };

  findUsersWithAvgGreaterThanThree(users, field, date) {
    const records = this.findDataForAGivenWeek(date, this.sleepData);
    return users.filter((user) => {
      const userRecords = this.findAllRecordsForAUser(user.id, records)
      return this.findAverage(userRecords, field) > 3;
    });
  }

  sortRecordsBySleep(records) {
    return records.sort((a, b) => {
      if (a.hoursSlept > b.hoursSlept) {
        return 1;
      } else if (b.hoursSlept > a.hoursSlept) {
        return -1;
      } else {
        return 0;
      }
    })
  }

  findTheUserWithTheMostSleep(date) {
    const sleepRecords = this.findAllRecordsByDate(date);
    const sortedRecords = this.sortRecordsBySleep(sleepRecords);
    let greatestRecord = sortedRecords[sortedRecords.length - 1];
    const greatest = [greatestRecord];
    let i = sortedRecords.length - 2;
    while(sortedRecords[i].hoursSlept === greatestRecord.hoursSlept) {
      greatest.push(sortedRecords[i])
      i--;
      if (!sortedRecords[i]) break;
    }
    return greatest;
  }
}

module.exports = Sleep;
