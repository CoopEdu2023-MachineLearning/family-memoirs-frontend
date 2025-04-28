import http from "@http";

const getEmailCodeApi = (email) => {
    return http.get(`/email/getCode?email=${email}`);
}

export default getEmailCodeApi;
