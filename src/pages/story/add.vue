<template>
    <van-row>
        <van-col span="24">
            <van-cell title="日期" :value="formData.date" required clickable @click="showPopup = true" />
            <van-field
                    :value="formData.content"
                    label="日记"
                    type="textarea"
                    placeholder="日志写在这里哦(๑′ᴗ‵๑)"
                    autosize
                    :border="false"
                    :show-confirm-bar="false"
                    @change="getContent"
            />
            <van-panel title="图片">
                <image-upload v-model="formData.images"></image-upload>
            </van-panel>

            <van-row>
                <van-col offset="8" span="8">
                    <van-button type="primary" :loading="confirmLoading" :disabled="confirmLoading" loading-text="保存中..." block @click="confirm">确 定</van-button>
                </van-col>
            </van-row>

            <van-popup
                    :show="showPopup"
                    position="bottom"
                    :close-on-click-overlay="true"
                    custom-style="height: 40%;"
                    @close="showPopup = false"
            >
                <van-datetime-picker
                    type="date"
                    :value="pickerDate"
                    @cancel="showPopup = false"
                    @confirm="getDate"
                />
            </van-popup>

            <van-toast id="van-toast" />
        </van-col>
    </van-row>
</template>

<script>
    import {formatDate} from '../../utils/index'
    export default {
        name: "story_add",
        data() {
            return {
                formData: {
                    date: formatDate(new Date()),
                    content: '',
                    images: '',
                },
                pickerDate: new Date().getTime(),
                showPopup: false,
                confirmLoading: false,
            }
        },
        methods: {
            getDate(val) {
                this.pickerDate = val.mp.detail;
                this.formData.date = formatDate(new Date(val.mp.detail));
                this.showPopup = false;
            },
            getContent(val) {
                this.formData.content = val.mp.detail;
            },
            confirm() {
                if (this.formData.date === '' || this.formData.date === undefined) {
                    this.$toast.fail('请选择日期');
                    return false;
                }
                this.confirmLoading = true;
                this.formData.wx_user_id = this.$route.query.wx_user_id;
                this.$fly.request({
                    method: 'post',
                    url: '/api/mini/story/add',
                    body: this.formData,
                }).then(res => {
                    if (res) {
                        this.$router.back();
                    }
                    this.confirmLoading = false;
                })
            }
        },
        mounted() {
            this.formData = {
                date: formatDate(new Date()),
                content: '',
                images: '',
            };
            this.pickerDate = new Date().getTime();
            this.showPopup = false;
            this.confirmLoading = false;
        }
    }
</script>

<style scoped>

</style>