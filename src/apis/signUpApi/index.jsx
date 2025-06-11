import http from "@http";

const signUpApi = (email, username, password, invitationCode, verificationCode) => {
    return http.post('/users/signup', {
        email,
        username,
        password,
        invitationCode,
        verificationCode
    });
}

export default signUpApi;

