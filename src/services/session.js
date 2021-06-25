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

async function getAllSessions(params) {
  const url = `${API_URL}session/filterSession${
    params ? `?${encodeQueryData(params)}` : ""
  }`;
  let response = await http.get(url);
  return response;
}

export default {
  getAllSessions,
};
