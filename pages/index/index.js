//index.js
//获取应用实例
var app = getApp()
var errorIcon = "../../resource/delete.png"; //静态图片路径
var pageObject = {
  data: {
    ysykbh: '',
    loading: false,
    btnDisabled: false,
    nav:{navbar: ['首页', '搜索', '我'],
    currentTab: 0}
  },
  onLoad: function (e) {

  },
  formSubmit: function (e) {
    var that = this;
    that.setData({ //防止多次请求
      loading: true,
      btnDisabled: true
    })
    wx.request({ //服务器校验请求
      url: app.host + '/pub/api/ysyk/' + e.detail.value.yzm,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == "200" && res.data.lx == 'ysyk') { //登陆成功
          try {
            wx.removeStorageSync('ysykInfo'); //清除数据存储
            wx.setStorageSync('ysykInfo', res.data.data); //数据存储
          } catch (e) {}
          wx.navigateTo({ //跳转页面
            url: '../ysyk/ysyk?yzm=' + e.detail.value.yzm,
            fail: function (fres) { //跳转失败
              wx.showToast({
                title: '页面跳转失败',
                image: errorIcon,
                duration: 3000
              });
              that.setData({
                loading: false,
                btnDisabled: false
              });
            },
            success: function () { //跳转成功
              that.setData({
                loading: false,
                btnDisabled: false
              })
            }
          })
        } else { //登陆失败
          let errmsg = !!res.data.error?res.data.error:'验证码无效'
          wx.showToast({
            title: errmsg,
            image: errorIcon,
            duration: 3000
          });
          that.setData({
            loading: false,
            btnDisabled: false
          });
        }

      },
      fail: function (e) { //服务器校验请求失败
        console.log(e)
        let er = JSON.stringify(e);
        wx.showModal({
          title: 'error',
          content: er,
          confirmText: "确认",
          cancelText: "取消",
        })
        // wx.showToast({
        //   title: '网络连接失败',
        //   image: errorIcon,
        //   duration: 3000
        // });
        that.setData({
          loading: false,
          btnDisabled: false
        })
      }
    })

  },
  bindResendYzm: function (e) {
    wx.scanCode({
      success: function (res) {
        let ysykbh = res.result
        wx.navigateTo({
          url: '../cfyzm/cfyzm?' + 'ysykbh=' + ysykbh
        })
      },
      fail: function () {
        wx.showToast({
          title: '扫码失败',
          image: errorIcon,
          duration: 3000
        });
      }
    })
  }
}


Page(pageObject)