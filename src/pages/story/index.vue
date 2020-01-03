<template>
    <van-row>
        <van-row>
            <van-col span="22" offset="1">
                <van-button plain type="primary" block icon="plus" @click="addStory">日记</van-button>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                <div v-for="(val, key) in list" :key="key">
                    <van-swipe-cell id="swipe-cell" :right-width="60" async-close @close="onClose">
                        <van-panel :title="val.date"></van-panel>
                        <van-button slot="right" type="primary">编辑</van-button>
                    </van-swipe-cell>
                    <van-notice-bar
                            wrapable
                            scrollable="false"
                            :text="val.content"
                    />
                </div>
            </van-col>
        </van-row>
    </van-row>
</template>

<script>
    export default {
        name: "story",
        data() {
            return {
                title: '',
                wx_user_id: '',
                list: [],
                pageSize: 10,
                page: 1,
                total: 0,
            }
        },
        methods: {
            onClose() {

            },
            addStory() {
                this.$router.push({
                    path: '/pages/story/add',
                    query: {wx_user_id: this.wx_user_id},
                })
            },
            getList() {
                this.$fly.request({
                    method: 'get',
                    url: '/api/mini/story/list',
                    body: {
                        page: this.page,
                        pageSize: this.pageSize,
                    }
                }).then(res => {
                    if (res) {
                        console.log('res', res);
                        this.list = res.list;
                        this.total = res.total;
                    }
                })
            }
        },
        mounted() {
            this.title = this.$route.query.title;
            this.wx_user_id = this.$route.query.type;
            mpvue.setNavigationBarTitle({
                title: this.title
            });
            this.getList();
        },
        onUnload() {
            mpvue.reLaunch({
                url: '/pages/index'
            })
        }
    }
</script>

<style scoped>

</style>