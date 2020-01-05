<template>
    <div>
        <van-panel title="互动空间" header-class="index-van-panel-header-class">
            <van-grid clickable column-num="2">
                <van-grid-item icon="like-o" link-type="navigateTo" @click="showPass(2)" text="FeVer物语" />
                <van-grid-item icon="star-o" link-type="navigateTo" @click="showPass(1)" text="李子语录" />
            </van-grid>
        </van-panel>

        <van-dialog use-slot title="请输入密码" :show="show" show-cancel-button @confirm="checkPassword" @cancel="show = false">
            <van-field
                    :value="password"
                    left-icon="lock"
                    type="password"
                    placeholder="密码"
                    :border="false"
                    @change="onChange"
            />
        </van-dialog>

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
                },
                password: '',
                show: false,
                type: '',
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
            showPass(type) {
                this.password = '';
                this.type = type;
                this.show = true;
            },
            onChange(e) {
                this.password = e.mp.detail;
            },
            checkPassword() {
                this.$fly.request({
                    method: "post",
                    url: '/api/mini/story/check',
                    body: {
                        password: this.password,
                    }
                }).then(res => {
                    if (res) {
                        let query = {};
                        if (this.type === 2) {
                            query = {
                                type: this.type,
                                title: 'FeVer物语',
                            }
                        } else {
                            query = {
                                type: this.type,
                                title: '李子语录',
                            }
                        }
                        this.$router.push({
                            path: '/pages/story/index',
                            query: query,
                        });
                    }
                    this.show = false;
                })
            }
        },
        created() {

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
