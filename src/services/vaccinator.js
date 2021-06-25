import http from "./httpService";

const API_URL = process.env.REACT_APP_apiUrl;
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

    const url = `${API_URL}vaccinator/login${
      params ? `?${encodeQueryData(params)}` : ""
    }`;
    let response = await http.get(url);
    return response;
  } catch (error) {
    console.log("err otp ==>", error);
  }
}

async function verifyOtp(params) {
  const url = `${API_URL}vaccinator/verify${
    params ? `?${encodeQueryData(params)}` : ""
  }`;
  let response = await http.post(url);
  return response;
}

async function getAllUsers(params) {
  const url = `${API_URL}vaccinator/allVaccinators${
    params ? `?${encodeQueryData(params)}` : ""
  }`;
  let response = await http.get(url);
  return response;
}

async function getAllApptByCenter(params) {
  const url = `${API_URL}appointment/getByCenter${
    params ? `?${encodeQueryData(params)}` : ""
  }`;
  let response = await http.get(url);
  return response;
}

async function confirmApptById(params) {
  const url = `${API_URL}appointment/confirm`;
  let response = await http.post(url, params);
  return response;
}

async function sendNotification(params) {
  const url = `${API_URL}appointment/getByCenter`;
  let response = await http.get(url);
  return response;
}

export default {
  login,
  verifyOtp,
  getAllUsers,
  getAllApptByCenter,
  confirmApptById,
  sendNotification,
};
