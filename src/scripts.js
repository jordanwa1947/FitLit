const userRepository = new UserRepository(userData);
const currentUser = chooseCurrentUser();
insertUserInfo();
insertUserHydrationData();
insertWeekHydrationData();
insertSleepData();
insertSleepDataForAWeek();
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
  document.getElementById('user-id').innerText = `Id# ${user.id}`;
  document.getElementById('user-address').innerText = ` ${user.address}`;
  document.getElementById('user-stride-length').innerText = `Stride Length: ${user.strideLength}`;
  document.getElementById('daily-step-goal').innerText = `Daily Step Goal: ${user.dailyStepGoal}`;
  document.getElementById('avg-step-goal').innerText = `Average Steps: ${userRepository.calculateAvgStepGoalOfUsers()}`;
}

function formatGeneralSleepData() {
  const sleep = new Sleep(sleepData, userRepository.repoMethods());
  const userSleepData = sleep.findUserSleepData(currentUser.id, '2019/09/22');
  const avgHoursSlept = sleep.findAverageForAUser(currentUser.id, 'hoursSlept').toFixed(1);
  const avgSleepQuality = sleep.findAverageForAUser(currentUser.id, 'sleepQuality').toFixed(1);
  return `<h3>Zzzz...</h3>
          <p>Hours Slept: <span>${userSleepData.hoursSlept}</span></p>
          <p>Quality: <span>${userSleepData.sleepQuality}</span></p>
          <p>Average Hours Slept: <span>${avgHoursSlept}</span></p>
          <p>Average Sleep Quality: <span>${avgSleepQuality}</span></p>`
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
  return `<h3>Here are your averages for this week...</h3>
  <div id="display-activities-over-week">
    <div>
      <img src="../assets/019-runner.svg" alt="sneaker-icon">
      <p>Minutes Active ${averageMinutesActiveForWeek}</p>
    </div>
    <div>
      <img src="../assets/footprints.svg" alt="steps icon">
      <p>Steps Taken ${averageStepsTakenForWeek}</p>
    </div>
    <div>
      <img src="../assets/step.svg" alt="climbing stairs icon">
      <p>Stairs Cimbed ${averageStairsClimbedForWeek}</p>
    <div>
  </div>`;
}

function formatCommunityActivity() {
  const activity = new Activity(activityData, userRepository.repoMethods());
  const averageStepsTakenForAllUsers = activity.findAverageStepsTakenForDay('2019/09/22');
  const averageMinutesActiveForAllUsers = activity.findAverageMinutesActiveForDay('2019/09/22');
  const averageStairsClimbedForAllusers = activity.findAverageStairsClimbedForDay('2019/09/22');
  return `<h3>The community at large</h3>
            <p>Our users averaged <span>${averageStepsTakenForAllUsers}</span> steps on this day.</p>
            <p>Our users averaged <span>${averageMinutesActiveForAllUsers}</span> active minutes on this day.</p>
            <p>Our users averaged <span>${averageStairsClimbedForAllusers}</span> stairs climbed on this day.</p>`;
}

function createCoordinates(records, metric) {
  const xCoordDates = [];
  const yCoordOunces = [];
  records.forEach(record => {
    xCoordDates.push(record.date);
    yCoordOunces.push(record[metric]);
  });
  return {
    x: xCoordDates,
    y: yCoordOunces,
  }
}

function insertWeekHydrationData() {
  const hydration = new Hydration(hydrationData, userRepository.repoMethods());
  const hydrationDataForAWeek = hydration.findHydrationDataForAWeek(currentUser.id, '2019/09/22');
  const waterGraphCoords = createCoordinates(hydrationDataForAWeek, 'numOunces');
  waterGraphCoords.name = 'Ounces Drank';
  waterGraphCoords.mode = 'lines';
  const data = [ waterGraphCoords ];
  const layout = {
    title:'Ounces Consumed For Each Day',
    width: 750,
    height: 300
  };
  Plotly.newPlot('water-over-a-week', data, layout);
}

function formatUserHydrationData() {
  const hydration = new Hydration(hydrationData, userRepository.repoMethods());
  const avgOunces = hydration.calcAvgOuncesConsumedForAllTime(currentUser.id);
  const todaysHydrationData = hydration.displayFluidOuncesConsumed(currentUser.id, '2019/09/22')
  return `<h3>Today's Hydration Stats</h3>
          <img src="../assets/008-water.svg" alt="glass of water">
          <p>${todaysHydrationData} oz</p>
          <p>Your Daily Average: ${avgOunces} oz</p>`
}

function insertUserHydrationData() {
  const waterConsumed = document.getElementById('water-consumed');
  waterConsumed.innerHTML = formatUserHydrationData();
}

function insertSleepDataForAWeek() {
  const sleep = new Sleep(sleepData, userRepository.repoMethods());
  const sleepDataForAWeek = sleep.findSleepDataForAWeek(currentUser.id, '2019/09/22');
  const hoursSleptCoords = createCoordinates(sleepDataForAWeek, 'hoursSlept');
  const sleepQualCoords = createCoordinates(sleepDataForAWeek, 'sleepQuality');
  hoursSleptCoords.name = 'Hours Slept';
  hoursSleptCoords.mode = 'lines';
  sleepQualCoords.name = 'Sleep Quality';
  sleepQualCoords.mode = 'lines';
  const data = [ sleepQualCoords, hoursSleptCoords ];
  const layout = {
    title:'Sleep Quality And Hours Slept',
    width: 700,
    height: 300
  };
  Plotly.newPlot('sleep-data-over-a-week', data, layout);
}

function insertSleepData() {
  const sleepDataBox = document.getElementById('user-sleep-data');
  sleepDataBox.innerHTML = formatGeneralSleepData();
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
    string += `<p><span>${friend[0].name}</span></p>`;
    string += `<p>Average: ${friend[1]}</p>`
    string += `<p>Rank: ${Number.parseInt(index) + 1}</p>`;
    return string
  }, ``)
  rankingContainer.innerHTML = `<h3>Steps Ranking</h3>` + html;
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
