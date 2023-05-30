// предотвращает возможную потерю фокуса
const focus = (el) => setTimeout(() => el.focus(), 0);

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
