import Fly from 'flyio/dist/npm/wx'

const fly = new Fly();
const host = process.env.NODE_ENV === 'production' ? '' : 'http://laravel-li.com';

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
    return response.data;
}, (err) => {
        //请求出错，根据返回状态码判断出错原因
        console.log(err);
        mpvue.hideLoading();
        if (err) {
            return "请求失败";
        }
    }
);

fly.config.baseURL = host;

export default fly;