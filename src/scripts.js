const userRepository = new UserRepository(userData);
const currentUser = chooseCurrentUser();
insertUserInfo();
insertHydrationData();
insertSleepData();
insertActivityData();
insertFriendRankings();
insertStepStreakDays();
insertPercentageStepGoalMet()

function chooseCurrentUser() {
  const randIndex = Math.floor(Math.random() * userData.length);
  return userData[randIndex];
}

function insertUserInfo() {
  const user = new User(currentUser);
  const title = `Hi, ${user.getUserFirstName()}!`
  document.getElementById('get-fit-title').innerText = title;
  document.getElementById('user-name').innerText = `${user.name}`;
  document.getElementById('user-id').innerText = `User Id: ${user.id}`;
  document.getElementById('user-address').innerText = `Address: ${user.address}`;
  document.getElementById('user-stride-length').innerText = `Stride Length: ${user.strideLength}`;
  document.getElementById('daily-step-goal').innerText = `Step Goal: ${user.dailyStepGoal}`;
  document.getElementById('avg-step-goal').innerText = `Average Step Goal: ${userRepository.calculateAvgStepGoalOfUsers()}`;
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
  const activity = new Activity(activityData, userRepository.repoMethods());
  const milesWalked = activity.getMilesWalkedForDay(currentUser.id, '2019/09/22', currentUser.strideLength);
  const minutesActive = activity.getMinutesActive(currentUser.id, '2019/09/22');
  const stepsTakenForDay = activity.getNumStepsTakenForDay(currentUser.id, '2019/09/22');
  return `<p>Miles Walked: ${milesWalked}</p>
          <p>Minutes Active: ${minutesActive}</p>
          <p>Steps Taken Today: ${stepsTakenForDay}</p>`;
}

function formatActivityDataForWeek() {
  const activity = new Activity(activityData, userRepository.repoMethods());
  const averageMinutesActiveForWeek = activity.findAverageMinutesActiveForWeek(currentUser.id, '2019/09/22');
  const averageStepsTakenForWeek = activity.findAverageStepsTakenForWeek(currentUser.id, '2019/09/22');
  const averageStairsClimbedForWeek = activity.findAverageStairsClimbedForWeek(currentUser.id, '2019/09/22');
  return `<p>Average Minutes Active This Week: ${averageMinutesActiveForWeek}</p>
          <p>Average Steps Taken This Week: ${averageStepsTakenForWeek}</p>
          <p>Average Stairs Cimbed This Week: ${averageStairsClimbedForWeek}</p>`;
}

function formatCommunityActivity() {
  const activity = new Activity(activityData, userRepository.repoMethods());
  const averageStepsTakenForAllUsers = activity.findAverageStepsTakenForDay('2019/09/22');
  const averageMinutesActiveForAllUsers = activity.findAverageMinutesActiveForDay('2019/09/22');
  const averageStairsClimbedForAllusers = activity.findAverageStairsClimbedForDay('2019/09/22');
  return `<p>Our users averaged ${averageStepsTakenForAllUsers} steps on this day.</p>
          <p>Our users averaged ${averageMinutesActiveForAllUsers} active minutes on this day.</p>
          <p>Our users averaged ${averageStairsClimbedForAllusers} stairs climbed on this day.</p>`;
}

function formatHydrationDataForAWeek() {
  const hydration = new Hydration(hydrationData, userRepository.repoMethods());
  const hydrationDataForAWeek = hydration.findHydrationDataForAWeek(currentUser.id, '2019/09/22');
  return hydrationDataForAWeek.reduce((string, record) => {
    string += `<p>${record.date}</p>`
    string += `<p>Ounces: ${record.numOunces}</p>`
    return string;
  }, '<p>Ounces For Each Day:</p>');
}

function formatUserHydrationData() {
  const hydration = new Hydration(hydrationData, userRepository.repoMethods());
  const avgOunces = hydration.calcAvgOuncesConsumedForAllTime(currentUser.id);
  const todaysHydrationData = hydration.displayFluidOuncesConsumed(currentUser.id, '2019/09/22')
  return `<p>Ounces Drank: ${todaysHydrationData}</p>
          <p>Your Average: ${avgOunces}</p>`
}

function insertHydrationData() {
  const waterConsumed = document.getElementById('water-consumed');
  const waterOverAWeek = document.getElementById('water-over-a-week');
  waterConsumed.innerHTML = formatUserHydrationData();
  waterOverAWeek.innerHTML = formatHydrationDataForAWeek();
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

function findFriendAverages() {
  const activity = new Activity(activityData, userRepository.repoMethods());
  currentUser.friends.push(currentUser.id);
  const averages = activity.calculateFriendSteps(currentUser.friends, '2019/09/22');
  return averages.map(average => {
    const userId = average[0];
    average[0] = userRepository.getUserData(userId);
    return average;
  })
}

function insertFriendRankings() {
  const friendsAndAverages = findFriendAverages();
  const rankingContainer = document.getElementById('friend-rankings');
  const html = friendsAndAverages.reduce((string, friend, index) => {
    string += `<p>${friend[0].name}</p>`;
    string += `<p>Average: ${friend[1]}</p>`
    string += `<p>Rank: ${Number.parseInt(index) + 1}</p>`;
    return string
  }, ``)
  rankingContainer.innerHTML = html;
}

function formatStreakDays() {
  const activity = new Activity(activityData, userRepository.repoMethods());
  const streakActivities = activity.daysWithIncreasingSteps(currentUser.id);
  const html = streakActivities.reduce((string, activity) => {
    string += `<p>${activity.date}</p>`;
    string += `<p>Steps: ${activity.numSteps}</p>`;
    return string
  }, ``)
  return html;
}

function insertStepStreakDays() {
  const streakHTML = formatStreakDays();
  const allStepsBox = document.getElementById('days-exceeding-all-steps');
  allStepsBox.insertAdjacentHTML('beforeend', streakHTML);
}

function insertPercentageStepGoalMet() {
  const percentage = document.getElementById('percentage-goal-met');
  const activity = new Activity(activityData, userRepository.repoMethods());
  const percent = activity.percentStepGoalWasMet(currentUser.id, currentUser.dailyStepGoal);
  percentage.innerText = `You've met your step goal: ${percent}%`;
}
