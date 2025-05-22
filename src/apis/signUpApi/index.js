import http from "@http";

export const signup = (email, username, password, invitationCode, verificationCode) => {
    return http.get(`/email/getCode?email=${email}, username=${username}, password=${password}, invitationCode=${invitationCode}, verificationCode=${verificationCode}`);
}
