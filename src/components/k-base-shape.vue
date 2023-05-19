<script>
export default {
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {
            finalConfig: {}
        };
    },

    watch: {
        config: {
            deep: true,
            immediate: true,
            handler() {
                Object.assign(this.finalConfig, this.config);
            }
        }
    }
};
</script>
