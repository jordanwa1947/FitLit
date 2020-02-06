const userRepository = new UserRepository(userData);
insertUserInfo();

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
