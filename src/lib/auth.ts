import { get, writable } from "svelte/store";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  apods: string[];
}

export const user = writable<User | null>(null);
export const token = writable<string | null>(null);

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
  user.set(authData.user as User);
  token.set(authData.token);
}

export function signOut() {
  user.set(null);
  token.set(null);
  sessionStorage.clear();
}

export function loadAuth() {
  const c = sessionStorage.getItem("user");
  const t = sessionStorage.getItem("token");
  if (c) {
    user.set(JSON.parse(c) as User);
    token.set(t);
  }
}

export function addToCollection(apodId: string) {
  user.update((value) => {
    value!.apods.push(apodId);
    return value;
  });

  saveAuth();
}

export function removeFromCollection(apodId: string) {
  user.update((value) => {
    if (!value) return value;

    value.apods = value.apods.filter((apod) => apod !== apodId);

    return value;
  });

  saveAuth();
}

function saveAuth() {
  const userValue = get(user)!;
  const tokenValue = get(token)!;

  sessionStorage.setItem("user", JSON.stringify(userValue));
  sessionStorage.setItem("token", tokenValue);
}
