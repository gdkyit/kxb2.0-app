// login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit(e) {
    let that = this;
    if (!!e.detail.value.password && !!e.detail.value.username) {
      let app = getApp();
      that.setData({
        loading: true
      });
      wx.request({
        url: app.host + '/api/auth',
        data: {
          username: e.detail.value.username,
          password: e.detail.value.password
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json'
        }, // 设置请求的 header
        success: res => {
          if(res.statusCode == 200){
            wx.setStorageSync('token', res.data.token)
            wx.switchTab({
              url: '/pages/kaoshi/kaoshi',
            })
          }else{
            wx.showModal({
              title:'登录失败',
              content:'手机号码/密码不符',
              showCancel:false
            })
          }
          
        },
        fail: e => {
          wx.showToast({
            title: '网络访问故障',
            image: '/resource/img/error.png',
            duration: 3000
          });
        },
        complete: e => {
          that.setData({
            loading: false
          })
        }
      })
    }
  }


})