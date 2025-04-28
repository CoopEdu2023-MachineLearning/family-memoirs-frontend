import http from "@http";

const getEmailCodeApi = (email, code) => {
    return http.post(`/email/verifyCode?email=${email}&code=${code}`)
}

export default getEmailCodeApi;
