import http from "@http";

const getEmailApi = () => {
  return http.get('/tests');
}

export default getEmailApi;
