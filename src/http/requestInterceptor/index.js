const requestInterceptor = (http) => {
  http.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
};

export default requestInterceptor;