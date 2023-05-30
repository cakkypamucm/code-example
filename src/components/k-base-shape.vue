<script>
export default {
    props: {
        config: {
            type: Object,
            required: true
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

    // ,methods: {
    //   getStage(){
    //     return this.$el.parentElement.__vnode.ctx.exposed.getStage()
    //   }
    // }
};
</script>
