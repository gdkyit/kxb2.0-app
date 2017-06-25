// ranking.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    view: '0',
    current: 0,
    phblist: ['积分榜', '群组榜', '考试榜', '业务榜'],
    userScoreRank: {},
    scoreRank: [],
    phbSubList: [],
    userExam: [],
    userExamRank: {},
    examRank: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getJfb()
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
  getJfb: function () {
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/jfb',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      success: (res) => {
        if (res.statusCode == '200') {
          res.data.data.userScoreRank.score = res.data.data.userScoreRank.score.toFixed(2)
          for (let i = 0; i < res.data.data.scoreRank.length; i++) {
            let user = res.data.data.scoreRank[i];
            user.score = user.score.toFixed(2);
          }
          this.setData({
            userScoreRank: res.data.data.userScoreRank,
            scoreRank: res.data.data.scoreRank
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
  },
  /**
   * 获取群组榜列表
   */
  getQzbList: function () {
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/userGroup',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      success: (res) => {
        if (res.statusCode == '200') {
          this.setData({
            phbSubList: res.data.data,
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
  },
  /**
   * 获取特定群组榜单
   */
  getQzb: function (gid) {
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/qzb',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: { groupId: gid },
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      success: (res) => {
        if (res.statusCode == '200') {
          res.data.data.userScoreRank.score = res.data.data.userScoreRank.score.toFixed(2)
          for (let i = 0; i < res.data.data.scoreRank.length; i++) {
            let user = res.data.data.scoreRank[i];
            user.score = user.score.toFixed(2);
          }
          this.setData({
            userScoreRank: res.data.data.userScoreRank,
            scoreRank: res.data.data.scoreRank
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
  },
  /**
   * 获取考试榜列表
   */
  getKsbList: function () {
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/userExam',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      success: (res) => {
        if (res.statusCode == '200') {
          this.setData({
            phbSubList: res.data.data,
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
  },
  /**
   * 获取特定考试榜单
   */
  getKsb: function (eid) {
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/ksb',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: { examId: eid },
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      success: (res) => {
        if (res.statusCode == '200') {
          res.data.data.userExamRank.score = Math.round(res.data.data.userExamRank.score)
          for (let i = 0; i < res.data.data.examRank.length; i++) {
            let user = res.data.data.examRank[i];
            user.score = Math.round(user.score);
          }
          this.setData({
            userExamRank: res.data.data.userExamRank,
            examRank: res.data.data.examRank
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
  },
  /**
   * 获取业务榜列表
   */
  getFlpmList: function () {
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/tkfl',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      success: (res) => {
        if (res.statusCode == '200') {
          this.setData({
            phbSubList: res.data.data,
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
  },
  /**
   * 获取特定分类业务榜单
   */
  getFlpm: function (eid) {
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/flpm',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: { flId: eid },
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      success: (res) => {
        if (res.statusCode == '200') {
          /*res.data.data.userDtxxRank.score = res.data.data.userDtxxRank.score.toFixed(2)
          for (let i = 0; i < res.data.data.dtxxRank.length; i++) {
            let user = res.data.data.dtxxRank[i];
            user.score = user.score.toFixed(2);
          }*/
          this.setData({
            userScoreRank: res.data.data.userDtxxRank[0],
            scoreRank: res.data.data.dtxxRank
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
  },
  bindUserGroup(e) {
    let gid = e.currentTarget.dataset.gid
    this.getQzb(gid);
    this.setData({ view: '12' })
  },
  bindUserExam(e) {
    let eid = e.currentTarget.dataset.eid
    this.getKsb(eid);
    this.setData({ view: '22' })
  },
  bindUserFlpm(e) {
    let eid = e.currentTarget.dataset.eid
    this.getFlpm(eid);
    this.setData({ view: '32' })
  },
  bindPhbChange: function (e) {
    let phb = e.detail.value
    this.setData({
      current: phb
    })
    if (phb == 0) {
      this.getJfb();
      this.setData({ view: '0' })
    } else if (phb == 1) {
      this.getQzbList();
      this.setData({ view: '11' })
    } else if (phb == 2) {
      this.getKsbList();
      this.setData({ view: '21' })
    } else if (phb == 3) {
      this.getFlpmList();
      this.setData({ view: '31' })
    }
  }

})