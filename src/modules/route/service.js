import helper from "@/helpers/frontend";
import result from "@@/public/routes-data.json";

const api = $http.create();

api.interceptors.response.use((response) => {
    if (response.data && response.headers["content-type"].includes("application/json")) {
        response.data = helper.formatter.normalizePropNames(response.data);
    }
    return response;
});

export default {
    fetch() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(helper.formatter.normalizePropNames(result)), 400);
        });
    }
};
