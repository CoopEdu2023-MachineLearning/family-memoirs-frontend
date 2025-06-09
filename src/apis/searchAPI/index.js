import http from "@http";
import { replaceError } from "../../utils";

export const search = async (q, snippetLength, preciseSearch) => {
    const result = await http.get("/search", {
        params: {
            q,
            snippetLength,
            preciseSearch,
        }
    }).catch(replaceError("Failed to search stories"));
    return {
        stories: result.stories.hits,
        tellers: result.tellers.hits,
        users: result.users.hits,
    };
}