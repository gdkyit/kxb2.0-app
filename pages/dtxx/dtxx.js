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
    next:false,
    quest:{},
    answers:[],
    feedbackUserRs:{},
    feedbackDans:{},
    feedbackRs:'',
    startTime:new Date(),
    zan:false,
    score:0,
    rightCount:0,
    wrongCount:0,
    last:false
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
            startTime:new Date()
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
  commitAnswer: function (e) {
    const token = wx.getStorageSync('token');
    let index = this.data.index;
    let mode = this.data.questions[index].MODE;
    let tkid = this.data.questions[index].ID_;
    let postdata = {
      startTime:this.data.startTime,
      endTime:new Date(),
      tkId:tkid,
    };
    if (mode==0){
      postdata.mode="0";
      postdata.result = e.detail.value.yesno
    }else if(mode == 1){
      postdata.mode="1";
      postdata.result = e.detail.value.single
    }else if (mode == 2){
      postdata.mode="2";
      postdata.result = e.detail.value.multi.join(';')
    }
    wx.request({
      url: app.host + '/api/checkDtxx',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      data:postdata,
      success: (res) => {
        if (res.statusCode == '200' && res.data.code == '200') {
          let score = this.data.score;
          let wc = this.data.wrongCount;
          let rc = this.data.rightCount;
          let result = res.data.data.userRs.result;
          if(result == 'Y'){
            score += res.data.data.userRs.resultScore;
            rc += 1
          }else {
            wc += 1
          }
          this.setData({
            feedbackUserRs: res.data.data.userRs,
            feedbackDans:res.data.data.dans,
            feedbackRs:res.data.data.rs,
            score:score,
            wrongCount:wc,
            rightCount:rc
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
      complete: () => {
        this.setData({
          next:true
        })
      }
    })
  },
  /**
   * 下一题
   */
  next:function(){
    let index = this.data.index+1;
    let tkid = this.data.questions[index].ID_;
    let last = false;
    this.getAnswer(tkid);
    if(index == this.data.questions.length){
      last = true
    }
    this.setData({index:index,next:false,last:last,answers:[]})

  }

})