import useStore from "./store";

class Route {
    constructor() {
        this.store = useStore();
    }

    fetch() {
        return this.store.fetch();
    }
}

export default new Route();
