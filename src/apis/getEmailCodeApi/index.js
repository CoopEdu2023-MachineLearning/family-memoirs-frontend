import http from "@http";

export const getEmailCodeApi = (email) => {
    return http.get(`/email/getCode?email=${email}`);
}
