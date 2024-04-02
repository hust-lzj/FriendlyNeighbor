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
  },
  topolicy:function(){
    wx.navigateTo({
      url: '/pages/policy/policy',
    })
  },
  onLoad() {
    wx.getStorage({
      key:'userinfomation',
      success:(res)=>{
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/face/face',
          })
        },1000)
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
        wx.setStorage({key:"userinfomation",data:res.userInfo})
        wx.navigateTo({
          url: '/pages/face/face?username='+this.data.userInfo.nickName+'&touxiang='+this.data.userInfo.avatarUrl,
          success: (result) => {},
          fail: (res) => {},
          complete: (res) => {},
        })}
      }
    ) 
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