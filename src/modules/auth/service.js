import helper from "@/helpers/frontend";

class Service {
    constructor() {
        this.storageIds = {
            userData: "app-user-data",
            firstTime: "app-user-first-time",
            packageVersion: "app-package-version"
        };
        this.userData = {
            id: 1,
            name: "name"
        };
    }

    isUserAuthenticated() {
        return new Promise((resolve) => {
            resolve(helper.storage.has(this.storageIds.userData));
        });
    }

    login() {
        return new Promise((resolve, reject) => {
            const userData = helper.storage.get(this.storageIds.userData);
            if (userData) {
                resolve(userData);
            } else {
                try {
                    const data = Service._fakeQueryRetry("login", this.userData);
                    helper.storage.set(this.storageIds.userData, data);
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            }
        });
    }

    async logout() {
        try {
            return await Service._fakeQueryRetry("logout");
        } finally {
            helper.storage.remove(this.storageIds.userData);
        }
    }

    static async _fakeQueryRetry(method, data) {
        const result = await helper.retry(() => Service._fakeQuery(method, data), {
            onEachRetryError: (retries) => {
                console.debug(`${method}: неудачная попытка, осталось еще ${retries} раз(а)`);
            },
            retries: import.meta.env.fetchRetries.count,
            retryIntervalMs: import.meta.env.fetchRetries.intervalMs
        });
        console.debug(`${method}: успешное получение данных`);
        return result;
    }

    static _fakeQuery(method, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // эмуляция ошибки получения данных с вероятностью 0.1 при серии из ${import.meta.env.fetchRetries.count + 1} попыток
                if (Math.random() > 0.1 ** (1 / (import.meta.env.fetchRetries.count + 1))) {
                    resolve(data);
                } else {
                    reject(new Error(`Не удалось выполнить запрос ${method}`));
                }
            }, Math.random() * 400);
        });
    }

    getPackageVersion() {
        return new Promise((resolve) => {
            resolve(helper.storage.get(this.storageIds.packageVersion));
        });
    }

    setPackageVersion(version) {
        return new Promise((resolve) => {
            helper.storage.set(this.storageIds.packageVersion, version);
            resolve();
        });
    }

    isUserNew() {
        return new Promise((resolve) => {
            resolve(!helper.storage.has(this.storageIds.firstTime));
        });
    }

    setUserOld() {
        return new Promise((resolve) => {
            helper.storage.set(this.storageIds.firstTime, false);
            resolve();
        });
    }
}

export default new Service();
