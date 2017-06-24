// ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    phblist: ['积分榜', '群组榜', '考试榜', '业务榜'],
    userScoreRank:{},
    scoreRank:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp();
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/jfb',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      success: (res) => {
        console.log(res)
        if(res.statusCode == '200'){
          res.data.data.userScoreRank.score = res.data.data.userScoreRank.score.toFixed(2)
          this.setData({
            userScoreRank:res.data.data.userScoreRank,
            scoreRank:res.data.data.scoreRank
          })
          
        }else {
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  bindPhbChange: function (e) {
    this.setData({
      current: e.detail.value
    })
  }

})