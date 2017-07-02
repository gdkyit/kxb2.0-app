// zstsmx.js
 var WxParse = require('../../lib/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    date:'',
    title:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let content = options.content;
    let date = options.date;
    let title = options.title;
    WxParse.wxParse('article', 'html', content, this);
    this.setData({
      date:date,
      title:title
    })
  },
})