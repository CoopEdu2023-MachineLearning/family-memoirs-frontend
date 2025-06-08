import http from "@http";

const uploadArticleApi = (articleId, data) => {
    return http.post(`/article/${articleId}/upload`, data);
}

export default uploadArticleApi;