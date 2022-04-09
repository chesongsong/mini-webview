Page({
    data: {
        // baseUrl: 'http://192.168.0.100:3456/guide.html',
        baseUrl: 'https://moroll.tech/guide.html',
        url: ''
    },
    // 获取URL参数并转换成对象
    getQueryParams: (url) => {
        const sUrl = url.split('?');
        // 取最后一位，兼容全链接有？和纯参数无？
        const sParams = sUrl[sUrl.length - 1];
        const arr = sParams.split('&'); // ['a=1', 'b=2']
        const result = {};
        arr.forEach((item) => {
            const keyVal = item.split('=');
            // key值
            const key = keyVal.shift();
            // value值，兼容参数没encode时有=，例如'a=b=1' => [a, b, 1] => key: a，value: b=1
            const value = decodeURIComponent(keyVal.join('='));
            result[key] = value;
        })
        return result;
    },
    handleOptions: (options = {}, key) => {
        let params = JSON.parse(JSON.stringify(options));
        if (params.q || params.scene) {
            params = {
                ...params,
                ...this.getQueryParams(decodeURIComponent(params.q || params.scene)),
            }
        }
        if (key) {
            return params[key];
        } else {
            return params;
        }
    },
    onLoad: function (options) {
        const params = this.handleOptions(options) || {};
        const queryStr = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
        console.log(options,params,this.data.baseUrl + '?' + queryStr)
        this.setData({
            url: this.data.baseUrl + '?' + queryStr
        })
    },
    loadData: function (callback) {

    }

})