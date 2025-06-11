import http from "@http";

const uploadFileApi = (file) => {
    const data = new FormData();
    data.append("file", file);
    return http.post("/files/upload", data);
}

export default uploadFileApi;