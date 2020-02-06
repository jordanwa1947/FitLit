const userRepository = new UserRepository(userData);
insertUserInfo();

function insertUserInfo() {
  const user = new User(userRepository.users[0]);
  const title = `Let's get fit, ${user.getUserFirstName()}!`
  document.getElementById('get-fit-title').innerText = title;
  document.getElementById('user-name').innerText = user.name;
  document.getElementById('user-id').innerText = user.id;
  document.getElementById('user-address').innerText = user.address;
  document.getElementById('user-stride-length').innerText = user.strideLength;
  document.getElementById('daily-step-goal').innerText = user.dailyStepGoal;
}
