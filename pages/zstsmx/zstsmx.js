// zstsmx.js
var WxParse = require('../../lib/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    date: '',
    title: '',
    clientx: 0,
    clienty: 0,
    timeStamp: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.i;
    let zsts = wx.getStorageSync('zsts');
    let content = zsts[index].CONTENT;
    let title = zsts[index].TITLE;
    let date = zsts[index].DATE;
    WxParse.wxParse('article', 'html', content, this);
    this.setData({
      date: date,
      title: title
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