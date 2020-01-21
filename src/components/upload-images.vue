<template>
    <van-row>
        <van-col>
            <van-uploader
                    :file-list="fileList"
                    @afterRead="afterRead"
                    @delete="deleteImg"
                    @oversize="overSize"
                    :max-size="52428800"></van-uploader>
        </van-col>
        <van-toast id="van-toast" />
        <van-overlay :show="showOverlay">
            <van-loading size="24px" vertical class="upload-loading-cls">图片上传中...</van-loading>
        </van-overlay>
    </van-row>
</template>

<script>
    export default {
        name: "upload-images",
        props: {
            value: {type: String},
        },
        data() {
            return {
                fileList: [],
                showOverlay: false,
            }
        },
        methods: {
            afterRead(event) {
                let _self = this;
                let host = process.env.NODE_ENV === 'production' ? 'https://zlf520.com.cn' : 'http://laravel-li.com';
                const { file } = event.mp.detail;
                this.showOverlay = true;
                // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
                mpvue.uploadFile({
                    url: host + '/api/mini/local/upload',
                    filePath: file.path,
                    name: 'file',
                    formData: {
                        directory: 'diary',
                        type: 1
                    },
                    success(res) {
                        let data = JSON.parse(res.data);
                        let url = data.data.url;
                        _self.fileList.push({
                            url: url
                        });
                        _self.showOverlay = false;
                        _self.emitInput();
                    },
                    fail() {
                        _self.showOverlay = false;
                        _self.$toast.fail('图片上传失败');
                    }
                });
            },
            deleteImg(event) {
                this.fileList.splice(event.mp.detail.index, 1);
                this.emitInput();
            },
            emitInput(){
                let value = [];
                this.fileList.forEach(item => {
                    value.push(item.url)
                });
                value = value.join(',');
                this.$emit('input', value);
            },
            overSize() {
                this.$toast.fail('图片不能超过50M');
            },
            initFileList(){
                let value = [];
                if(this.value){
                    value = this.value.split(',')
                }
                this.fileList = [];
                value.forEach(item => {
                    this.fileList.push({
                        url: item
                    })
                })
            }
        },
        created(){
            this.initFileList()
        },
        watch: {
            value (){
                this.initFileList()
            }
        },
    }
</script>

<style>
    .upload-loading-cls {
        justify-content: center;
        display: flex;
        align-items: center;
        height: 600px;
    }
</style>