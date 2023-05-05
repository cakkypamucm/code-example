<script>
import { h } from "vue";

// @see https://github.com/vuejs/rfcs/discussions/448
function AppFragment({ wrapTag }, { attrs, slots }) {
    return wrapTag !== "" ? h(wrapTag, attrs, slots.default()) : slots.default();
}

AppFragment.inheritAttrs = false;
AppFragment.props = {
    wrapTag: {
        type: String,
        default: ""
    }
};

export default AppFragment;
</script>
