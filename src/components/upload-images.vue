<template>
    <van-row>
        <van-col>
                test
            <van-uploader :file-list="fileList" @afterRead="afterRead"></van-uploader>
        </van-col>
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
            }
        },
        methods: {
            afterRead(event) {
                console.log(event);
                this.$fly.request({
                    method: 'post',
                    headers: {
                        'content-type': "multipart/form-data"
                    },
                    url: '/api/mini/local/upload',
                    body: {
                        file: event.mp.detail.path
                    },
                }).then(res => {
                    console.log('res', res);
                })
            }
        }
    }
</script>

<style scoped>

</style>