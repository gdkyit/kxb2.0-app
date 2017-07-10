//app.js
//#000000 主要内容、标题字色
//#888888 次要信息字色
//#353535 大段的说明且属于主要内容
//#bfbfbf 暗提示色
//#f4333c 错误、警示色
//#ff5b05 重点提醒色
//#f5f5f9 app底色
//#3FBE69 app主题色
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
  },
  onShow: function () {
    const token = wx.getStorageSync('token');
    if (!this.launching) {
      wx.request({
        url: this.host + '/api/messages/groupchange',
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json',
          'x-auth-token': token
        }, // 设置请求的 header
        success: (res) => {
          if (res.statusCode == '200') {
           wx.showModal({
              title: 'join group',
              content: 'join group',
              showCancel:false,
              mask:true
            });

          } else {
            wx.showToast({
              title: res.data.error,
              image: '/resource/img/error.png',
              duration: 3000
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: '网络访问故障',
            image: '/resource/img/error.png',
            duration: 3000
          });
        },
        complete: function () {
        }
      })
    }

  },
  globalData: {},
  host: "http://120.76.241.230:8090",
  uploadHost: 'http://120.76.46.145:82',
  launching: false
})