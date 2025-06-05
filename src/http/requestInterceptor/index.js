const noAuthUrls = ['/article/all', '/other/public/api', '/tags/recommended', "/users/login"]; // 公开接口列表

const requestInterceptor = (http) => {
  http.interceptors.request.use(
    (config) => {
      const isPublic = noAuthUrls.some(url => config.url && config.url.startsWith(url));
      if (!isPublic) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
};

export default requestInterceptor;