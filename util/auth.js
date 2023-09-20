import axios from "axios";

const API_KEY = "AIzaSyC19RElUN5Y42-YiOnG60xsO_tGjbx1mS0";
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  console.log("///" + token + "///");
  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}
export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
