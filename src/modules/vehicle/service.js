import helper from "src/helpers/frontend";
import routes from "app/public/vehicle/routes-data.json";

const api = $http.create();

api.interceptors.response.use((response) => {
    if (response.data && response.headers["content-type"].includes("application/json")) {
        response.data = helper.formatter.normalizePropNames(response.data);
    }
    return response;
});

export default {
    async fetch() {
        if (process.env.NODE_ENV === "development") {
            const { data } = await api.get(`/vehicle/routes-data.json`);
            return data;
        }
        if (process.env.NODE_ENV === "production") {
            return new Promise((resolve) => {
                setTimeout(() => resolve(helper.formatter.normalizePropNames(routes)), 400);
            });
        }
    }
};
