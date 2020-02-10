class Sleep {
  constructor(sleepData, userRepoMethods) {
    this.sleepData = sleepData;
    this.repoMethods = userRepoMethods;
  }

  findUserSleepData(id, date) {
    return this.sleepData.find((sleepData) => {
      return sleepData.date === date;
    });
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
    return this.repoMethods.findAverage(userRecords, field, userRecords.length);
  }

  findAverageForAllUsers(field) {
    return this.repoMethods.findAverage(this.sleepData, field, this.sleepData.length);
  }

  findAverageForAUserOverAWeek(date, field) {
    var records = this.repoMethods.findDataForAGivenWeek(date, this.sleepData);
    return this.repoMethods.findAverage(records, field, records.length);
  };

  findUsersWithAvgGreaterThanThree(users, field, date) {
    const records = this.repoMethods.findDataForAGivenWeek(date, this.sleepData);
    return users.filter((user) => {
      const userRecords = this.findAllRecordsForAUser(user.id, records)
      return this.repoMethods.findAverage(userRecords, field, userRecords.length) > 3;
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

  findSleepDataForAWeek(id, date) {
    const sleepForAUser = this.findAllRecordsForAUser(id, this.sleepData);
    return this.repoMethods.findDataForAGivenWeek(date, sleepForAUser);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
