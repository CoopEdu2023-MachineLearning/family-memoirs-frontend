import http from "@http";
import { replaceError } from "../../utils";

const searchApi = (q, snippetLength, preciseSearch) => {
    return http.get("/search", {
        params: {
            q,
            snippetLength,
            preciseSearch,
        }
    }).then(result => ({
        stories: result.stories.hits,
        tellers: result.tellers.hits,
        users: result.users.hits,
    })).catch(replaceError("Failed to search stories"));
};

export default searchApi;