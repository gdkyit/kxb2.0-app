//app.js
//#000000 主要内容、标题字色
//#888888 次要信息字色
//#353535 大段的说明且属于主要内容
//#bfbfbf 暗提示色
//#f4333c 错误、警示色
//#ff5b05 重点提醒色
//#f5f5f9 app底色
//#3FBE69 app主题色
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // wx.removeStorageSync('token')
  },
  globalData: {},
  host: "http://120.76.241.230:8090"
})