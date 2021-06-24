import http from "./httpService";

const API_URL = process.env.REACT_APP_apiUrl;
// const API_URL = "/";

const encodeQueryData = (data) => {
  // encoding query strings
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  return ret.join("&");
};

async function login(params) {
  try {
    console.log(params);

    const url = `${API_URL}user/login${
      params ? `?${encodeQueryData(params)}` : ""
    }`;
    let response = await http.get(url);
    return response;
  } catch (error) {
    console.log("err otp ==>", error);
  }
}

async function verifyOtp(params) {
  const url = `${API_URL}user/verify${
    params ? `?${encodeQueryData(params)}` : ""
  }`;
  let response = await http.post(url);
  return response;
}

async function getAllUsers(params) {
  const url = `${API_URL}user/allUsers${
    params ? `?${encodeQueryData(params)}` : ""
  }`;
  let response = await http.get(url);
  return response;
}

async function registerUser(params) {
  const url = `${API_URL}user/register`;
  let response = await http.post(url, params);
  return response;
}

export default {
  login,
  verifyOtp,
  getAllUsers,
  registerUser,
};
