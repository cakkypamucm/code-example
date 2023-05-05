const focus = (el) =>
    // предотвращает возможную потерю фокуса
    setImmediate(() => {
        el.focus();
    });

export default {
    mounted(el, binding) {
        if (binding.value === true) {
            focus(el);
        }
    },
    updated(el, binding) {
        if (binding.value === true && binding.oldValue === false) {
            focus(el);
        }
    }
};
