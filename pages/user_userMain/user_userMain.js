Page({
    data: {
        token: '',
        recordMap: {},
        userName: "",
        IUrl: "",
        contribution: 0,
    },
    onLoad: function (option) {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            mask: true,
            duration: 50000
        })
        let app = getApp();
        let that = this;
        // let urlHost = app.uploadHost + "/images";
        let urlHost = "http://202.104.10.34:83" + "/images";
        wx.getStorage({ //获取token
            key: 'token',
            success: function (res) {
                that.setData({
                    token: res.data
                })
                wx.request({
                    url: app.host + '/api/currentUser',
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {
                        'content-type': 'application/json',
                        'x-auth-token': res.data
                    }, // 设置请求的 header
                    success: reqRes => {
                        if (reqRes.data.code == "200") {
                            let rs = reqRes.data.data;
                            that.setData({
                                recordMap: rs.userInfo,
                                userName: rs.userInfo.USER_NAME,
                                IUrl: !!rs.userInfo.PHOTO ? urlHost + rs.userInfo.PHOTO + "?date=" + new Date().getTime() : "",
                                contribution: !rs.userGxz.gxz ? rs.userGxz.count : rs.userGxz.gxz,
                                scoreRank: rs.userScoreRank,
                                totalUserResult: rs.totalUserResult,
                                rightPersent: !rs.userScoreRank.score ? "无" : (rs.totalUserResult.totalRightCount / rs.totalUserResult.totalCount * 100).toFixed(2) + '%'
                            })
                            wx.hideToast();
                        } else if (reqRes.data.code == "401") {
                            wx.hideToast();
                            wx.showModal({
                                title: '登陆过期',
                                content: '登陆信息已过期，你需要登录才能使用本功能',
                                showCancel: false,
                                confirmText: '去登录',
                                success: res => {
                                    if (res.confirm) {
                                        wx.redirectTo({
                                            url: '../login/login',
                                        })
                                    }
                                }
                            })
                        } else {
                            wx.showModal({
                                title: '后台服务错误',
                                content: reqRes.data.error,
                                showCancel: false,
                                confirmText: '返回',
                                success: res => {
                                    if (res.confirm) {
                                        wx.redirectTo({
                                            url: wx.navigateBack({
                                                delta: 1
                                            }),
                                        })
                                    }
                                }
                            })
                        }

                    },
                    fail: e => {
                        wx.showModal({
                            title: '网络访问故障',
                            content: e,
                            showCancel: false,
                            confirmText: '返回',
                            success: res => {
                                if (res.confirm) {
                                    wx.redirectTo({
                                        url: wx.navigateBack({
                                            delta: 1
                                        }),
                                    })
                                }
                            }
                        })
                    },
                })
            },
            fail: err => { //获取token失败
                wx.showModal({
                    title: '尚未登录',
                    content: '你需要登录才能使用本功能',
                    showCancel: false,
                    confirmText: '去登录',
                    success: res => {
                        if (res.confirm) {
                            wx.redirectTo({
                                url: '../login/login',
                            })
                        }
                    }
                })
            }
        })
    },
    loginOut: function () {
        wx.removeStorageSync('token');
        wx.showModal({
            title: '消息',
            content: '成功退出',
            showCancel: false,
            confirmText: '返回登陆',
            success: res => {
                if (res.confirm) {
                    wx.redirectTo({
                        url: '../login/login',
                    })
                }
            }
        });
    }
})