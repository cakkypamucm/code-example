import { defineStore } from "pinia";

import service from "./service";

export default defineStore("auth", {
    state: () => ({
        userData: null
    }),
    actions: {
        isUserAuthenticated() {
            return service.isUserAuthenticated();
        },

        async login() {
            this.userData = await service.login();
        },

        logout() {
            return service.logout();
        },

        getPackageVersion() {
            return service.getPackageVersion();
        },

        setPackageVersion(version) {
            return service.setPackageVersion(version);
        },

        isUserNew() {
            return service.isUserNew();
        },

        setUserOld() {
            return service.setUserOld();
        }
    }
});
