import http from "@http";

// 获取讲述者信息
export const getTellerInfo = async (tellerId) => {
  const res = await http.get(`/teller/${tellerId}`);
  return res;
};

// 获取讲述者名下所有文章
export const getTellerArticles = async (tellerId) => {
  const res = await http.get(`/teller/${tellerId}/articles`);
  return res;
};