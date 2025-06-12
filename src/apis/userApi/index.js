import http from '@http';

// 获取用户信息（包含关联的讲述者列表）
export const getUserInfo = async (userId) => {
  const res = await http.get(`/users/${userId}`);
  return res;
};