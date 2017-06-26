// dtxx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tkId = options.tkId
    getList(tkId);
  },
  /**
   * 获取随机题目
   */
  getList: function (tkid) {
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/tk',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      data:{parentId:tkid},
      success: (res) => {
        if (res.statusCode == '200') {
          this.setData({
            questions: res.data.data,
          })

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
        // complete
      }
    })
  }

})