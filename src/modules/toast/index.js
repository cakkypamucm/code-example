import { createToastInterface } from "vue-toastification";
import helper from "src/helpers/frontend";

import "vue-toastification/dist/index.css";
import "./css/index";

class Toast {
    constructor() {
        this.toast = createToastInterface({
            position: "top-right",
            transition: "none",
            timeout: 5000,
            maxToasts: 5,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            draggable: true,
            draggablePercent: 0.25,
            hideProgressBar: true
        });
    }

    showError(message) {
        this.toast.error(helper.formatter.toUniqueSpaces(message));
    }

    showInfo(message, { timeout }) {
        this.toast.info(helper.formatter.toUniqueSpaces(message), { timeout });
    }

    clear() {
        this.toast.clear();
    }
}

export default new Toast();
