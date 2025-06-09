import http from "@http";

const findNarratorApi = (name) => {
    return http.post(`/teller/find?name=${encodeURIComponent(name)}`);
}

export default findNarratorApi;
