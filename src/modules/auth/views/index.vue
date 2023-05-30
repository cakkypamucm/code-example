<template>
    <div class="text-center">
        <h4 v-if="isUserNew" class="login-header help-text">Типа форма входа</h4>
        <form class="login-form" @submit.prevent="login">
            <!-- pedo mellon a minno -->
            <app-button v-app-auto-focus="focusSignin" type="submit" class="sign-in" :disabled="dataLoading">
                {{ !dataLoading ? "Войти" : "" }}
                <app-preloader v-if="dataLoading" />
            </app-button>
        </form>
    </div>
</template>

<script>
import Auth from "src/modules/auth/index";
import toast from "src/modules/toast/index";

export default {
    data() {
        return {
            auth: new Auth(this.$router),
            dataLoading: false,
            error: null,
            focusSignin: true,
            isUserNew: null
        };
    },
    watch: {
        error(val) {
            if (val) {
                toast.showError("Ошибка при входе. Попробуйте еще раз");
            }
        }
    },
    async created() {
        this.isUserNew = await this.auth.isUserNew();
    },
    beforeUnmount() {
        toast.clear();
    },
    methods: {
        async login() {
            this.dataLoading = true;
            this.error = null;
            try {
                await this.auth.login();
            } catch (error) {
                this.dataLoading = false;
                this.error = error;

                this.focusSignin = false;
                await this.$nextTick();
                this.focusSignin = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.login-form {
    position: relative;
}

.sign-in {
    width: 85px;
    height: 38px;
}

.login-header {
    margin-bottom: 10px;
}
</style>
