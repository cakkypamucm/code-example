import { unref } from "vue";
import useStore from "./store";

export default class Auth {
    constructor($router) {
        if (Auth.instance) {
            return Auth.instance;
        }
        Auth.instance = this;

        this.$router = $router;
        this.store = useStore();
        this.scheduleTimeoutId = null;

        this.ensurePackageVersion();
    }

    async isUserAuthenticated() {
        const data = await this.store.isUserAuthenticated();
        clearTimeout(this.scheduleTimeoutId);
        const currentRoute = this.getCurrentRoute();
        if (!currentRoute.meta?.public) {
            this.scheduleCheckAuth();
        }
        return data;
    }

    scheduleCheckAuth() {
        this.scheduleTimeoutId = setTimeout(async () => {
            if (!(await this.isUserAuthenticated())) {
                const currentRoute = this.getCurrentRoute();
                if (currentRoute.name !== "login") {
                    this.$router.push({ name: "login" });
                }
            } else {
                this.scheduleCheckAuth();
            }
        }, 60000);
    }

    async login() {
        const data = await this.store.login();
        const currentRoute = this.getCurrentRoute();
        const {
            redirect: { path, query }
        } = currentRoute.query;
        if (!path || path === currentRoute.path) {
            this.$router.push({ name: "index", query });
        } else {
            this.$router.push({ path, query, replace: true });
        }
        return data;
    }

    logout() {
        return this.store.logout();
    }

    // сделаем logout после нового релиза
    async ensurePackageVersion() {
        const version = await this.getPackageVersion();
        if (version !== import.meta.env.packageVersion) {
            await this.setPackageVersion(import.meta.env.packageVersion);
            this.$router.push({ name: "logout" });
        }
    }

    getPackageVersion() {
        return this.store.getPackageVersion();
    }

    setPackageVersion(version) {
        return this.store.setPackageVersion(version);
    }

    getCurrentRoute() {
        return unref(this.$router.currentRoute);
    }

    async isUserNew() {
        const isNew = await this.store.isUserNew();
        if (isNew) {
            await this.setUserOld();
        }
        return isNew;
    }

    setUserOld() {
        return this.store.setUserOld();
    }
}
