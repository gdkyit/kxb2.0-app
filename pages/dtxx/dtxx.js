// dtxx.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions:[],
    mode:['（判断题）','（单选题）','（多选题）'],
    index:0,
    next:true,
    quest:{},
    answers:[],
    feedback:{},
    zan:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let flid = options.flid
    this.getList(flid);
  },
  /**
   * 获取随机题目
   */
  getList: function (flid) {
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/tk',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      data:{parentId:flid},
      success: (res) => {
        if (res.statusCode == '200') {
          this.setData({
            questions: res.data.data,
            index:0
          })
          let tkid = this.data.questions[0].ID_
          this.getAnswer(tkid);
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
   * 获取题目答案
   */
  getAnswer: function (tkid) {
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/tkxzx',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      data:{tkId:tkid},
      success: (res) => {
        if (res.statusCode == '200') {
          this.setData({
            answers: res.data.data,
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
   * 提交答案
   */
  commitAnswer: function (tkid) {
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/tkxzx',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      data:{
        tkId:"24fac6c1e3414a18b2fcb901e02f11d8",
        result:"A",
        startTime:"2017-06-26T12:50:37.138Z",
        endTime:"2017-06-26T12:55:39.219Z",
        mode:"0"
      },
      success: (res) => {
        if (res.statusCode == '200') {
          this.setData({
            answers: res.data.data,
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
   * 下一题
   */
  next:function(){
    

  }

})