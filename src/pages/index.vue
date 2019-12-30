<template>
    <div>
        <van-panel title="互动空间" header-class="index-van-panel-header-class">
            <van-grid clickable column-num="2">
                <van-grid-item icon="like-o" link-type="navigateTo" url="/pages/counter" text="FeVer物语" />
                <van-grid-item icon="star-o" link-type="navigateTo" url="" text="李子语录" />
            </van-grid>
        </van-panel>

        <van-button type="primary" v-if="false" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
            授权登录
        </van-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    nickName: 'mpvue',
                    avatarUrl: ''
                }
            }
        },
        methods: {
            getUserInfo () {
                // 调用登录接口
                mpvue.login({
                    success: (res) => {
                        console.log('login', res);
                        mpvue.getUserInfo({
                            success: (res) => {
                                console.log('user', res);
                                this.userInfo = res.userInfo
                            }
                        })
                    }
                })
            },
            bindGetUserInfo(e) {
                console.log('e', e);
            },
            test() {
                this.$fly.request({
                    method: "get",
                    url: '/api/mini/story/check'
                }).then(res => {
                    console.log(res);
                })
            }
        },
        created() {
            this.test();
        }
    }
</script>

<style>
    .index-van-panel-header-class:after {
        border-bottom: none !important;
    }
    .index-van-panel-header-class .van-cell__title {
        color: rgba(69, 90, 100, 0.6) !important;
    }
</style>
