import http from "@http";

const verifyEmailCodeApi = (email, code) => {
    return http.post(`/email/verifyCode?email=${email}&code=${code}`)
}

export default verifyEmailCodeApi;
