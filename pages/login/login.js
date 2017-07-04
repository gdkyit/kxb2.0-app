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
    let username = e.detail.value.username;
    let password = e.detail.value.password;
    /* 测试使用账户，正式环境去掉 */
    // username = '13829397905';
    // password = '666666'
    /* ====================================  */
    if (!!username && !!password) {
      let app = getApp();
      that.setData({
        loading: true
      });
      wx.request({
        url: app.host + '/api/auth',
        data: {
          username: username,
          password: password
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json'
        }, // 设置请求的 header
        success: res => {
          if(res.statusCode == 200){
            wx.setStorageSync('token', res.data.token)
            wx.reLaunch({
              url: '../kaoshi/kaoshi'
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