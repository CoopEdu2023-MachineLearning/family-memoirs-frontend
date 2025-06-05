import http from "@http";

const uploadArticleApi = (data) => {
    return http.post(`/article/upload`, data);
}

export default uploadArticleApi;