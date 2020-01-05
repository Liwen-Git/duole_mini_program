import Fly from 'flyio/dist/npm/wx'

const fly = new Fly();
const host = process.env.NODE_ENV === 'production' ? 'https://zlf520.com.cn' : 'http://laravel-li.com';

// 添加请求拦截器
fly.interceptors.request.use((request) => {
    mpvue.showLoading({
        title: '加载中...',
        mask: true,
    });
    request.headers = {
        "X-Tag": "flyio",
        "content-type": "application/json",
    };

    request.body = {
        ...request.body,
    };
    return request;
});

// 添加响应拦截器
fly.interceptors.response.use((response) => {
    mpvue.hideLoading();
    let data = response.data;
    if (data.code === 0) {
        return data.data;
    } else {
        mpvue.showToast({
            title: data.message,
            icon: 'none',
            duration: 2000
        });
        return false;
    }
}, (err) => {
        //请求出错，根据返回状态码判断出错原因
        mpvue.hideLoading();
        if (err) {
            mpvue.showToast({
                title: '请求失败',
                icon: 'none',
                duration: 2000
            });
            return err;
        }
    }
);

fly.config.baseURL = host;

export default fly;