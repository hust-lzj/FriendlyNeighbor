Page({
  data:{
    username:'',
    touxiang:'',
    userinfomation:{}
  },
  onShow(){
    wx.getStorage({
      key:'userinfomation',
      success:(res)=>{
        this.setData({
          userinfomation:res.data,
          username:res.data.nickName,
          touxiang:res.data.avatarUrl
        })
      }
    })
  },
  requirehistory: function(){
    wx.navigateTo({
      url: '/pages/history/history1',
    })
  },
  sharehistory: function(){
    wx.navigateTo({
      url: '/pages/history/history2',
    })
  },
  aboutus: function(){
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  },
  messageto: function(){
    wx.navigateTo({
      url: '/pages/messageto/messageto',
    })
  },
  help: function(){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  getadress:function(){
    wx.navigateTo({
      url: '/pages/test/test',
    })
  },
  backto: function(){
    wx.redirectTo({
      url: '/pages/face/face',
    })
  }
})