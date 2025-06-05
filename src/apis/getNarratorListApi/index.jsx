import http from "@http";

const getNarratorListApi = () => {
    return http.get(`/narrators/get`);
}

export default getNarratorListApi;
