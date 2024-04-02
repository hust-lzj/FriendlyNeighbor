// pages/test/test1.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled:false,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    Lat:0,
    Lng:0,
    user_id:0,
  },
  topolicy:function(){
    wx.navigateTo({
      url: '/pages/policy/policy',
    })
  },
  topolicy1:function(){
    wx.navigateTo({
      url: '/pages/policy/policy1',
    })
  },
  onLoad() {
    wx.getStorage({
      key:'userinfomation',
      success:(res)=>{
          wx.navigateTo({
            url: '/pages/face/face',
          })
      }
    })
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于显示用户头像昵称',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.getLocation({
          success: (res) => {
            this.setData({Lat:res.latitude,Lng:res.longitude})
            // console.log(this.data.Lat,this.data.Lng)
            wx.setStorage({key:"userinfomation",data:{nickName:this.data.userInfo.nickName,avatarUrl:this.data.userInfo.avatarUrl,Lat:this.data.Lat,Lng:this.data.Lng,user_id:this.data.user_id}})
            wx.navigateTo({
              url: '/pages/face/face',
            })
          },
        })
        this.user_login()
        // console.log(res)
        wx.navigateTo({
          url: '/pages/face/face?username='+this.data.userInfo.nickName+'&touxiang='+this.data.userInfo.avatarUrl,
          success: (result) => {},
          fail: (res) => {},
          complete: (res) => {},
        })
      }
      }
    ) 
  },
  user_login(){
    wx.login({
      success: (res) => {
        if(res['errMsg']=="login:ok"){wx.request({
          url: 'http://127.0.0.1:5000//login/',
          header:{"content-Type" :"application/x-www-form-urlencoded"},
          method:"POST",
          data:'js_code='+res['code']+'&Lat='+this.data.Lat+'&Lng='+this.data.Lng,
          success:(res)=>{this.setData({user_id:res.data[0][0]})},
          fail:(res)=>{wx.showToast({
            title: '登陆失败',
            icon:'none',
          })}
        })}
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})