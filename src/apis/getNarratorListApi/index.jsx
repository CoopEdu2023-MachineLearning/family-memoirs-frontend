import http from "@http";

const getNarratorListApi = () => {
    return http.post(`/teller/list`);
}

export default getNarratorListApi;
