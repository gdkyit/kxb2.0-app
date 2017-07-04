var app = getApp();
Page({
    data: {
        files: null,
        disableUserInfo:false,
        loadingUserInfo:false
    },
    onLoad:function(option){
        let urlHost="http://202.104.10.34:83/images";
        this.setData({
            oldValue:option,
            name:option.name,
            phone:option.phone,
            photo:option.photo,
            photo:option.photo!=null&&option.photo!=""?urlHost+option.photo+"?date="+new Date():"",
            birthday:this.formatDate(option.birthday),
            rzday:this.formatDate(option.rzday),
            userId:option.userId,
            endTime:new Date()
        })
    },
    chooseImage: function (e) {//上传照片
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: res.tempFilePaths[0]
                });
            }
        })
    },
    previewImage: function(e){//点击照片放大
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: [this.data.files!=null?this.data.files:this.data.photo] // 需要预览的图片http链接列表
        })
    },
    bindBirthdayChange: function (e) {
        this.setData({
            birthday: e.detail.value
        })
    },
    bindRzdayChange: function (e) {
        this.setData({
            rzday: e.detail.value
        })
    },
    putUserInfo:function(value){
        this.setData({
            disableUserInfo:true,
            loadingUserInfo:true,
        })
        let newValue=value.detail.value,oldValue=this.data.oldValue;
        if(newValue.name==""||newValue.phone==""){
            //判断姓名手机是否为空
            wx.showToast({
                title: '请填写姓名和手机',
                image: '/resource/img/error.png',
                duration: 3000
            });
        }else if(newValue.name==oldValue.name&&newValue.phone==oldValue.phone&&newValue.birthday==oldValue.birthday&&newValue.rzday==oldValue.rzday&&this.data.files==null){
            wx.showToast({
                title: '没有数据修改',
                image: '/resource/img/error.png',
                duration: 2000
            });
        }else{
            const token = wx.getStorageSync('token');
            newValue.userId=this.data.userId//添加userID
            let that=this;
            wx.request({
                url: app.host + '/api/updateUser',
                data: newValue,
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                'content-type': 'application/json',
                'x-auth-token': token
                }, // 设置请求的 header
                success: res => {
                    if(res.statusCode == 200&&res.data.code=="200"){
                        wx.showToast({
                            title: '修改成功',
                            icon: 'success',
                            mask:true,
                            duration: 2000
                        })
                        that.setData({
                            oldValue:newValue,//更新旧数据
                            disableUserInfo:false,
                            loadingUserInfo:false,
                        })
                    }else{
                        wx.showToast({
                        title: '修改失败',
                        image: '/resource/img/error.png',
                        duration: 2000
                        });
                    }
                },
                fail: e => {
                    wx.showToast({
                        title: '网络访问故障',
                        image: '/resource/img/error.png',
                        duration: 3000
                    });
                }
            })
            if(that.data.files!=null){//判断是否上传照片
                wx.uploadFile({
                    url: app.host + '/api/upload', 
                    filePath: that.data.files,
                    name: 'file',
                    header: {
                        'x-auth-token': token
                    }, 
                    success: function(res){
                        that.setData({
                            files:null,//重置照片
                            photo:that.data.photo+"&date="+new Date()//重新访问照片
                        })
                    },
                    fail:e=>{
                        wx.showToast({
                            title: '照片上传失败',
                            image: '/resource/img/error.png',
                            duration: 3000
                        });
                    }
                })

            }

        }
    },
    backTo:function(){
        wx.reLaunch({
              url: '../user_userMain/user_userMain'
            })
    },
    formatDate:function(date){
        let newDate=new Date(date);
        return newDate.getFullYear()+"-"+(newDate.getMonth()+1)+"-"+newDate.getDay()
    }
});