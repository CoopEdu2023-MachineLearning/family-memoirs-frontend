import http from "@http";

const demoApi = () => {
  return http.get('/tests');
}

export default demoApi;
