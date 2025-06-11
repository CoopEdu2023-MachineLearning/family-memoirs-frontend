import http from "@http/index.js";

export const signup = (email, username, password, invitationCode, verificationCode) => {
    return http.post('/users/signup', {
        email,
        username,
        password,
        invitationCode,
        verificationCode
    });
}
