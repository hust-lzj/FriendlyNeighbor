Page({
  data:{
    code:'',
    userInfo:{},
    is_code:0,
    is_user:0,
    Lat:0,
    Lng:0,
  },
  backto: function(){
    wx.navigateBack({
      delta: 0,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  getadress:function(){
    wx.getLocation({
      success: (res) => {
        this.setData({lat:res.latitude,lng:res.longitude})
        console.log(this.data.lat,this.data.lng)
      },
    })
  },
  getUserInfo:function(){
    return new Promise((resolve,reject) => {
      wx.getUserProfile({
        desc: '用户登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({userInfo:res.userInfo,is_user:1})
          console.log(this.data.userInfo)
          wx.getLocation({
            success: (res) => {
              this.setData({lat:res.latitude,lng:res.longitude})
              console.log(this.data.lat,this.data.lng)
            },
          })
        },
        fail:(err) => {
          reject(err)
        }
      })
    })
  },
  getLogin:function(){
   return new Promise((resolve,reject) => {
     wx.login({
       success: (res) => {
         this.setData({code:res.code,is_code:1})
         console.log(this.data.code)
      },
      fail: (err) => {
        reject(err)
       }
    })
   })
  },
//使用promise封装wx.login接口
  login: function(){
    let userRes = this.getUserInfo()
    let loginRes = this.getLogin()
    //使用promise.all()平级调用
    Promise.all([userRes,loginRes]).then((res) => {
      wx.navigateTo({
        url: '/pages/face/face',
      })
    })
  }
})
