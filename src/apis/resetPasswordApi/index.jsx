import http from "@http";

const resetPasswordApi = (email, password) => {
    return http.get(`/users/reset-password?email=${email}&password=${password}`)
}

export default resetPasswordApi;
