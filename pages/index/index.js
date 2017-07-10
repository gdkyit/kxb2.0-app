var app = getApp();
Page({
    data: {

    },
    onLoad: function (option) {
        app.launching = true;
        wx.getStorage({ //获取token
            key: 'token',
            success: function (res) {
                setTimeout(function(){
                    wx.reLaunch({
                        url: '../kaoshi/kaoshi'
                    })
                    app.launching = false;
                    app.onShow();
                },3000)
            },
            fail: err => { //获取token失败
                setTimeout(function(){
                    wx.redirectTo({
                        url: '../login/login',
                    })
                },3000)
            }
        })
    },
    


});