import axios from "axios";

const ENDPOINT = "http://challenge-react.alkemy.org/";

export default async function loginServices(valueEmail, valuePassword) {
  // console.log(valueEmail + valuePassword);
  try {
    const res = await axios.post(ENDPOINT, {
      email: valueEmail,
      password: valuePassword,
    });
    // console.log(res.data.token);
    return res.data.token;

  } catch (err) {
    // console.log(err.response.data.error)
    // return err.response.data.error
    throw new Error(`${err.response.data.error}`)
   
  }
}
