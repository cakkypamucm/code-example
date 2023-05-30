export default {
    mounted(el, binding) {
        if (binding.value === true) {
            el.click();

            // предотвращает возможную потерю фокуса
            setTimeout(() => {
                el.focus();
            }, 0);
        }
    }
};
