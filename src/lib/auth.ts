import { writable } from "svelte/store";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  country: string;
}

export const userToken = writable<string | null>(null);

const re =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export async function signUp(
  user: User,
  password: string,
  passwordConfirm: string
): Promise<void> {
  if (
    user.firstname.trim() === "" ||
    user.lastname.trim() === "" ||
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

  const res = await fetch("https://spacelab.henni.be/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: user.firstname,
      lastname: user.lastname,
      country: user.country,
      email: user.email,
      password: password,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to register user");
  }

  await signIn(user.email, password);
}

export async function signIn(email: string, password: string): Promise<void> {
  if (email.trim() === "" || password.trim() === "") {
    throw new Error("Please fill all required fields");
  }

  if (!re.test(email)) {
    throw new Error("The format of the email address is not valid");
  }

  const res = await fetch("https://spacelab.henni.be/user/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!res.ok) {
    throw new Error("Email or password wrong.");
  }

  const authData = await res.json();
  userToken.set(authData.token);
  saveAuth(authData.token);
}

export function signOut() {
  userToken.set(null);
  sessionStorage.clear();
}

export function loadAuth() {
  const c = sessionStorage.getItem("token");
  userToken.set(c);
}

function saveAuth(token: string) {
  sessionStorage.setItem("token", token);
}
