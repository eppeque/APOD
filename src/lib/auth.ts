export interface User {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

const re =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export async function signUp(
  user: User,
  password: string,
  passwordConfirm: string
) {
  if (
    user.firstName.trim() === "" ||
    user.lastName.trim() === "" ||
    user.email.trim() === "" ||
    user.country.trim() === "" ||
    password.trim() === "" ||
    passwordConfirm.trim() === ""
  ) {
    throw new Error("Please fill all required fields");
  }

  if (!re.test(user.email)) {
    throw new Error("The format of the email address is not valid");
  }

  if (password !== passwordConfirm) {
    throw new Error("The password is different than its confirmation");
  }

  const signup = await fetch('https://spacelab.henni.be/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstname: user.firstName,
      lastname: user.lastName,
      country : user.country,
      email : user.email,
      password : password
    })
  });

  if (!signup.ok) {
    throw new Error('Failed to register user');
  }

  const signIn = await fetch('https://spacelab.henni.be/user/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email : user.email,
      password : password
    })
  });

  const signinData = await signIn.json();

  console.log(signinData);

  return signinData;
}

export async function signIn(email: string, password: string) {
  if (email.trim() === "" || password.trim() === "") {
    throw new Error("Please fill all required fields");
  }

  if (!re.test(email)) {
    throw new Error("The format of the email address is not valid");
  }

  const signIn = await fetch('https://spacelab.henni.be/user/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email : email,
      password : password
    })
  });

  if (!signIn.ok) {
    throw new Error('Email or password wrong.');
  }

  const signinData = await signIn.json();

  console.log(signinData);

  return signinData;
}
