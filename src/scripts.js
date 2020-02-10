const userRepository = new UserRepository(userData);
const currentUser = userRepository.users[0];
insertUserInfo();
insertHydrationData();
insertSleepData();
insertActivityData();

function insertUserInfo() {
  const user = new User(userRepository.users[0]);
  const title = `Let's get fit, ${user.getUserFirstName()}!`
  document.getElementById('get-fit-title').innerText = title;
  document.getElementById('user-name').innerText = `Username: ${user.name}`;
  document.getElementById('user-id').innerText = `User Id: ${user.id}`;
  document.getElementById('user-address').innerText = `Address: ${user.address}`;
  document.getElementById('user-stride-length').innerText = `Stride Length: ${user.strideLength}`;
  document.getElementById('daily-step-goal').innerText = `Step Goal: ${user.dailyStepGoal}`;
  document.getElementById('avg-step-goal').innerText = `Average Step Goal: ${userRepository.calculateAvgStepGoalOfUsers()}`;
}

function formatHydrationDataForAWeek(records) {
  return records.reduce((string, record) => {
    string += `<p>${record.date}</p>`
    string += `<p>Ounces: ${record.numOunces}</p>`
    return string;
  }, '<p>Ounces For Each Day:</p>');
}

function formatSleepDataForAWeek() {
  const sleep = new Sleep(sleepData, userRepository.repoMethods());
  const sleepDataForAWeek = sleep.findSleepDataForAWeek(currentUser.id, '2019/09/22');
  return sleepDataForAWeek.reduce((string, record) => {
    string += `<p>${record.date}</p>`
    string += `<p>Hours Slept: ${record.hoursSlept} Quality: ${record.sleepQuality}</p>`
    return string;
  }, '');
}

function formatGeneralSleepData() {
  const sleep = new Sleep(sleepData, userRepository.repoMethods());
  const userSleepData = sleep.findUserSleepData(currentUser.id, '2019/09/22');
  const avgHoursSlept = sleep.findAverageForAUser(currentUser.id, 'hoursSlept');
  const avgSleepQuality = sleep.findAverageForAUser(currentUser.id, 'sleepQuality');
  return `<p>Hours Slept: ${userSleepData.hoursSlept}</p>
          <p>Quality: ${userSleepData.sleepQuality}</p>
          <p>Average Hours Slept: ${avgHoursSlept}</p>
          <p>Average Sleep Quality: ${avgSleepQuality}</p>`
}

function formatGeneralActivityData() {
  const activity = new Activity(activityData);
  const milesWalked = activity.getMilesWalkedForDay(currentUser.id, '2019/09/22', currentUser.strideLength);
  const minutesActive = activity.getMinutesActive(currentUser.id, '2019/09/22');
  const stepsTakenForDay = activity.getNumStepsTakenForDay(currentUser.id, '2019/09/22');
  return `<p>Miles Walked: ${milesWalked}</p>
          <p>Minutes Active: ${minutesActive}</p>
          <p>Steps Taken Today: ${stepsTakenForDay}</p>`;
}

function formatActivityDataForWeek() {
  const activity = new Activity(activityData);
  const averageMinutesActiveForWeek = activity.findAverageMinutesActiveForWeek(currentUser.id, '2019/09/22');
  const averageStepsTakenForWeek = activity.findAverageStepsTakenForWeek(currentUser.id, '2019/09/22');
  const averageStairsClimbedForWeek = activity.findAverageStairsClimbedForWeek(currentUser.id, '2019/09/22');
  return `<p>Average Minutes Active This Week: ${averageMinutesActiveForWeek}</p>
          <p>Average Steps Taken This Week: ${averageStepsTakenForWeek}</p>
          <p>Average Stairs Cimbed This Week: ${averageStairsClimbedForWeek}</p>`;
}

function formatCommunityActivity() {
  const activity = new Activity(activityData);
  const averageStepsTakenForAllUsers = activity.findAverageStepsTakenForDay('2019/09/22');
  const averageMinutesActiveForAllUsers = activity.findAverageMinutesActiveForDay('2019/09/22');
  const averageStairsClimbedForAllusers = activity.findAverageStairsClimbedForDay('2019/09/22');
  return `<p>Our users averaged ${averageStepsTakenForAllUsers} steps on this day.</p>
          <p>Our users averaged ${averageMinutesActiveForAllUsers} active minutes on this day.</p>
          <p>Our users averaged ${averageStairsClimbedForAllusers} stairs climbed on this day.</p>`;
}

function insertHydrationData() {
  const waterConsumed = document.getElementById('water-consumed');
  const waterOverAWeek = document.getElementById('water-over-a-week');
  const hydration = new Hydration(hydrationData);
  const hydrationDataForAWeek = hydration.findHydrationDataForAWeek(currentUser.id, '2019/09/22');
  const todaysHydrationData = hydration.displayFluidOuncesConsumed(currentUser.id, '2019/09/22')
  waterConsumed.innerHTML = `<p>Ounces Drank: ${todaysHydrationData}</p>`
  waterOverAWeek.innerHTML = formatHydrationDataForAWeek(hydrationDataForAWeek)
}

function insertSleepData() {
  const sleepDataBox = document.getElementById('user-sleep-data');
  const sleepOverAWeekBox = document.getElementById('sleep-data-over-a-week');
  sleepDataBox.innerHTML = formatGeneralSleepData();
  sleepOverAWeekBox.innerHTML = formatSleepDataForAWeek();
}

function insertActivityData() {
  const activitiesBox = document.querySelector('#activities');
  const activitiesForWeekBox = document.querySelector('#activities-over-week');
  const activityComparisonForCommunity = document.querySelector('#activity-community-comparison');
  activitiesBox.innerHTML = formatGeneralActivityData();
  activitiesForWeekBox.innerHTML = formatActivityDataForWeek();
  activityComparisonForCommunity.innerHTML = formatCommunityActivity();
}
