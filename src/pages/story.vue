<template>
    <van-row>
        <van-col>
            日记
        </van-col>
    </van-row>
</template>

<script>
    export default {
        name: "story",
        data() {
            return {
                title: '',
                type: '',
            }
        },
        mounted() {
            this.title = this.$route.query.title;
            this.type = this.$route.query.type;
            mpvue.setNavigationBarTitle({
                title: this.title
            });
        }
    }
</script>

<style scoped>

</style>