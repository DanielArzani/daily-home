const signup = async function (username, email, password) {
  await fetch('/api/v1/users/signup', {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });
};

export default signup;
