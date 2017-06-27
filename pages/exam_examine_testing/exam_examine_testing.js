var app = getApp();
Page({
    data:{
        token:'',
        examList:[],
        userRsList:[],
        selectItems: [],
        rs:"",
        buttonLoading:false,
        rightAnswer:0,
        worngAnswer:0,
        totalScore:0.00,
        endExam:false
    },
    onLoad:function(option){
    let that=this;
    wx.getStorage({//获取token
        key: 'token',
        success: function(res) {
            that.setData({
                token:res.data
            })
            wx.request({
                url: app.host + '/api/examDetail?examId='+option.examId,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                'content-type': 'application/json',
                'x-auth-token': res.data
                }, // 设置请求的 header
                success: reqRes => {
                    console.log(reqRes)
                    let currIndex=0;
                    let examList=reqRes.data.data.examDetail;
                    let userRsList=reqRes.data.data.userRs;
                    let currContext=examList[currIndex];
                    if(reqRes.data.code=="200"){
                        //获取答案选项
                        wx.request({
                            url: app.host + '/api/tkxzx?tkId='+currContext.ID_,
                            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                            header: {
                            'content-type': 'application/json',
                            'x-auth-token': res.data
                            }, // 设置请求的 header
                            success: reqResAnswer => {
                                console.log(reqResAnswer);
                                if(reqResAnswer.data.code=="200"){
                                    that.setData({
                                        examList:examList,
                                        currIndex:currIndex,
                                        currContext:currContext,
                                        selectItems:reqResAnswer.data.data,
                                        startTime:new Date(),
                                        totalIss:examList.length,
                                        finishIss:userRsList.length
                                    })
                                }else{
                                    wx.showModal({
                                        title: '后台服务错误',
                                        content: reqRes.data.error,
                                        showCancel: false,
                                        confirmText: '返回',
                                        success: res => {
                                            if(res.confirm) {
                                                wx.redirectTo({
                                                    url: wx.navigateBack({delta: 1}),
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
                                        if(res.confirm) {
                                            wx.redirectTo({
                                                url: wx.navigateBack({delta: 1}),
                                            })
                                        }
                                    }
                                })
                            },
                        })
                    }else{
                         wx.showModal({
                            title: '后台服务错误',
                            content: reqRes.data.error,
                            showCancel: false,
                            confirmText: '返回',
                            success: res => {
                                if(res.confirm) {
                                    wx.redirectTo({
                                        url: wx.navigateBack({delta: 1}),
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
                            if(res.confirm) {
                                wx.redirectTo({
                                    url: wx.navigateBack({delta: 1}),
                                })
                            }
                        }
                    })
                },
            })
        },
        fail:err =>{
            wx.showModal({
                title: '尚未登录',
                content: '你需要登录才能使用本功能',
                showCancel: false,
                confirmText: '去登录',
                success: res => {
                    if(res.confirm) {
                        wx.redirectTo({
                            url: '../login/login',
                        })
                    }
                }
            })
        }
    })
    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.selectItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].XZ_KEY == e.detail.value;
        }
        this.setData({
            selectItems: radioItems,
            rs:e.detail.value+""
        });
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        var checkboxItems = this.data.selectItems, values = e.detail.value;
        let rs="";
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(checkboxItems[i].XZ_KEY == values[j]){
                    checkboxItems[i].checked = true;
                    if(rs.length>0){
                        rs +=';'
                        
                    }
                    rs += values[j];
                    break;
                }
            }
        }
        this.setData({
            selectItems: checkboxItems,
            rs:rs
        });
    },
    putAnswer:function(event){
        this.setData({buttonLoading:true,rsText:"回答正确"})
        let answers=event.detail.value.selectedAnswer;
        if(answers.length>0){

            let currContext=this.data.currContext;
            let rs = this.data.rs;
            // let examItem ={
            //     tkId:currContext.ID_,
            //     result:rs,
            //     startTime:this.data.startTime,
            //     endTime:new Date(),
            //     mode:currContext.MODE,
            //     examDetailId:currContext.detailId
            // };
            let examItem ={
                tkId:"d81c3c69382c47c4aa0f800725c0e082",
                result:rs,
                startTime:this.data.startTime,
                endTime:new Date(),
                mode:currContext.MODE,
                examDetailId:3688
            };
            if(this.data.currIndex==(this.data.examList.length-1)){
                setTimeout(
                    this.setData({endExam:true}).bind(this),2000
                )
                
            }else{
                setTimeout(
                    this.completePOST,200
                )
            }
            // let examItem={
            //     endTime:"2017-06-26T08:28:38.446Z",
            //     examDetailId:3701,
            //     mode:"1",
            //     result:"B",
            //     startTime:"2017-06-26T08:28:26.800Z",
            //     tkId:"a1def54e73f84cfc98d5e83621c4ec7a",
            // }
            // wx.request({
            //     url: app.host + '/api/checkExamItem',
            //     method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            //     data: examItem,
            //     header: {
            //     'content-type': 'application/json',
            //     'x-auth-token': this.data.token
            //     }, // 设置请求的 header
            //     success: reqResAnswer => {
            //         console.log(reqResAnswer);
            //         if(reqResAnswer.data.code=="200"){
            //             // that.setData({
            //             // })
            //         }else{
            //             wx.showModal({
            //                 title: '后台服务错误',
            //                 content: '已做题目将保存并退出考试',
            //                 showCancel: false,
            //                 confirmText: '返回',
            //                 success: res => {
            //                     if(res.confirm) {
            //                         wx.redirectTo({
            //                             url: wx.navigateBack({delta: 1}),
            //                         })
            //                     }
            //                 }
            //             })
            //         }
                
            //     },
            //     fail: e => {
            //         wx.showModal({
            //             title: '网络访问故障',
            //             content: '已做题目将保存并退出考试',
            //             showCancel: false,
            //             confirmText: '返回',
            //             success: res => {
            //                 if(res.confirm) {
            //                     wx.redirectTo({
            //                         url: wx.navigateBack({delta: 1}),
            //                     })
            //                 }
            //             }
            //         })
            //     },
            // })
        }else{
            wx.showToast({
            title: '请选择答案',
            image: '/resource/img/error.png',
            duration: 1000
          });
        }
    },
    completePOST:function(){
        let index=this.data.currIndex;
        let examList=this.data.examList;
        let rAnswer=this.data.rightAnswer+1
        let tScore=(parseInt(this.data.totalScore) +2).toFixed(2);
        let that=this;
        wx.request({
            url: app.host + '/api/tkxzx?tkId='+examList[index+1].ID_,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
            'content-type': 'application/json',
            'x-auth-token': this.data.token
            }, // 设置请求的 header
            success: reqResAnswer => {
                console.log(reqResAnswer);
                if(reqResAnswer.data.code=="200"){
                    that.setData({
                        currIndex:index+1,
                        currContext:examList[index+1],
                        selectItems:reqResAnswer.data.data,
                        rs:"",
                        rsText:"",
                        rightAnswer:rAnswer,
                        totalScore:tScore,
                        buttonLoading:false
                    })
                }else{
                    wx.showModal({
                        title: '后台服务错误',
                        content: reqRes.data.error,
                        showCancel: false,
                        confirmText: '返回',
                        success: res => {
                            if(res.confirm) {
                                wx.redirectTo({
                                    url: wx.navigateBack({delta: 1}),
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
                        if(res.confirm) {
                            wx.redirectTo({
                                url: wx.navigateBack({delta: 1}),
                            })
                        }
                    }
                })
            },
        })
        
    }
})