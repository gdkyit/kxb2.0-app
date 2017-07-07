var app = getApp();
Page({
    data: {

    },
    onLoad: function (option) {
        wx.getStorage({ //获取token
            key: 'token',
            success: function (res) {
                setTimeout(function(){
                    wx.reLaunch({
                        url: '../kaoshi/kaoshi'
                    })
                },4000)
            },
            fail: err => { //获取token失败
                setTimeout(function(){
                    wx.redirectTo({
                        url: '../login/login',
                    })
                },4000)
            }
        })
    },
    


});