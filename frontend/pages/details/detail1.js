Page({
  data:{
    datadic:{}
  },
  backto: function(){
    wx.navigateBack({
      delta: 0,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  onLoad(options) {
    this.setData({datadic:[options.detailtitle,options.detailtype,options.detailcontent,options.detailname,options.detailway,options.detailtime]})
  },
})