// xdjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },

  /**
   * 获取知识库列表
   */
  getList: function () {
    const app = getApp();
    wx.showNavigationBarLoading()
    const token = wx.getStorageSync('token');
    wx.request({
      url: app.host + '/api/userXdjlTs',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        'x-auth-token': token
      }, // 设置请求的 header
      success: (res) => {
        if (res.statusCode == '200') {
          let location = '/sxb-backend/ueditorupload'
          let data = res.data.data.map(item=>{
            item.CONTENT = item.CONTENT.replace(/\/sxb-backend\/ueditorupload/g,app.uploadHost + location);
            return item;
          })
          wx.setStorageSync('xdjl',data)
          this.setData({
            list:data,
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
        wx.hideNavigationBarLoading()
      }
    })
  },
  /**
   * 水平滑动返回
   */
  bindtouchstart(e) {
    this.setData({
      clientx: e.changedTouches[0].clientX,
      clienty: e.changedTouches[0].clientY,
      timeStamp: e.timeStamp
    })
  },
  bindtouchend(e) {
    let lastx = e.changedTouches[0].clientX;
    let lasty = e.changedTouches[0].clientY;
    let lastTimeStamp = e.timeStamp;

    //滑动水平距离超过100个像素，水平夹角不超过15°（使用tan值做条件判断），判定为滑动翻页
    // 水平滑动距离判定条件值，可按需调整，当前取值100像素
    const conDisX = 100; 
    //滑动水平夹角判定条件值，可按需调整,当前取值15度
    const conTanY = Math.tan(18 * Math.PI/180); 

    let distanceX = lastx - this.data.clientx;
    let tan = Math.abs((lasty - this.data.clienty) / distanceX)
    if (tan < conTanY && distanceX > conDisX) {
      wx.navigateBack();
    }
  }
})