const responseInterceptor = (http) => {
  http.interceptors.response.use(
    (res) => {
      const { data } = res;
      if (data.code !== 0) {
        return Promise.reject(new Error(data.message));
      }
      return data.data;
    },
    (err) => Promise.reject(err)
  );
};

export default responseInterceptor;
