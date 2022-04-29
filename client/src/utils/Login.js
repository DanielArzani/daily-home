const login = async function (email, password) {
  const response = await fetch('/api/v1/users/login', {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await response.json();

  return data;
};

export default login;
