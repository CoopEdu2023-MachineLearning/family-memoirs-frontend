import http from "@http";

// 获取分页文章数据
const  getArticles = async (page = 0, size = 10) => {
  const res = await http.get(`/article/page?page=${page}&size=${size}`);
  return res;
};

export default getArticles;
