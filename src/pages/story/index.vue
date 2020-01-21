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
                    <van-swipe-cell id="swipe-cell" :right-width="60" async-close @close="editStory(val)">
                        <van-panel :title="val.date"></van-panel>
                        <van-button slot="right" type="primary">编辑</van-button>
                    </van-swipe-cell>
                    <van-notice-bar
                            wrapable
                            scrollable="false"
                            :text="val.content"
                    />
                    <van-image
                            v-for="(item, index) in val.imagesArr"
                            :key="index"
                            v-if="item"
                            width="5rem"
                            height="5rem"
                            fit="contain"
                            :src="item"
                            @click="previewImg(item, val.imagesArr)"
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
                onShowRefresh: false,
            }
        },
        methods: {
            editStory(val) {
                this.$router.push({
                    path: '/pages/story/edit',
                    query: {
                        id: val.id,
                    },
                })
            },
            addStory() {
                this.$router.push({
                    path: '/pages/story/add',
                    query: {wx_user_id: this.wx_user_id},
                })
            },
            getList() {
                this.list = [];
                this.pageSize =  10;
                this.page =  1;
                this.total =  0;

                this.$fly.request({
                    method: 'get',
                    url: '/api/mini/story/list',
                    body: {
                        wx_user_id: this.wx_user_id,
                        page: this.page,
                        pageSize: this.pageSize,
                    }
                }).then(res => {
                    if (res) {
                        res.list.forEach(function(item) {
                            item.imagesArr = item.images.split(',');
                        });
                        this.list = res.list;
                        this.total = res.total;
                    }
                })
            },
            previewImg(current, urls) {
                this.onShowRefresh = true;
                mpvue.previewImage({
                    current: current, // 当前显示图片的http链接
                    urls: urls // 需要预览的图片http链接列表
                })
            }
        },
        mounted() {

        },
        onLoad() {
            this.title = this.$route.query.title;
            this.wx_user_id = this.$route.query.type;
            mpvue.setNavigationBarTitle({
                title: this.title
            });
        },
        // 生命周期函数--监听小程序显示(后退到这个页面的时候这个就会被回调) 当小程序启动，或从后台进入前台显示，会触发 onShow
        onShow() {
            if (this.onShowRefresh) {
                this.onShowRefresh = false;
            } else {
                this.getList();
            }
        },
        // 下拉刷新
        onPullDownRefresh() {
            mpvue.showNavigationBarLoading();
            setTimeout(()=>{
                this.getList();
                mpvue.stopPullDownRefresh();
                mpvue.hideNavigationBarLoading();
            },3000)
        },
        // 上拉加载
        onReachBottom() {
            if (this.page * this.pageSize < this.total) {
                this.page = this.page + 1;
                this.$fly.request({
                    method: 'get',
                    url: '/api/mini/story/list',
                    body: {
                        wx_user_id: this.wx_user_id,
                        page: this.page,
                        pageSize: this.pageSize,
                    }
                }).then(res => {
                    if (res) {
                        res.list.forEach(function(item) {
                            item.imagesArr = item.images.split(',');
                        });
                        this.list.push(...res.list);
                    }
                })
            }

        }
    }
</script>

<style scoped>

</style>