import http from "@http";

const createArticleApi = () => {
    return http.get(`/article/create`);
}

export default createArticleApi;