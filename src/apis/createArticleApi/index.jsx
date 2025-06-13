import http from "@http";

const createArticleApi = () => {
    const token = localStorage.getItem("token"); // 假设你将 token 存在 localStorage 里
    return http.get("/article/create", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export default createArticleApi;
