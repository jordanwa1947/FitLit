const userRepository = new UserRepository(userData);
const currentUser = userRepository.users[0];
insertUserInfo();
insertHydrationData();
insertSleepData();

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

function formatDataForAWeek(sleepRecords) {
  return sleepRecords.map(record => record.numOunces);
}

function insertHydrationData() {
  const waterConsumed = document.getElementById('water-consumed');
  const waterOverAWeek = document.getElementById('water-over-a-week');
  const hydration = new Hydration(hydrationData);
  const hydrationDataForAWeek = hydration.findHydrationDataForAWeek(currentUser.id, '2019/09/22');
  const todaysHydrationData = hydration.displayFluidOuncesConsumed(currentUser.id, '2019/09/22')
  waterConsumed.innerHTML = `<p>Ounces Drank: ${todaysHydrationData}</p>`
  waterOverAWeek.innerHTML = `<p>Ounces For Each Day: ${formatDataForAWeek(hydrationDataForAWeek)}</p>`
}

function insertSleepData() {
  const sleepDataBox = document.getElementById('user-sleep-data');
  const sleepOverAWeekBox = document.getElementById('sleep-data-over-a-week');
  const sleep = new Sleep(sleepData);
  const userSleepData = sleep.findUserSleepData(currentUser.id, '2019/09/22');
  sleepDataBox.innerHTML = `<p>Hours Slept: ${userSleepData.hoursSlept}</p>
  <p>Sleep Quality: ${userSleepData.sleepQuality}</p>`
}
