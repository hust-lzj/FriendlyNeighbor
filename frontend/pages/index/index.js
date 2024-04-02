// pages/list/list.js
Page({
  data: {
    account: '',
    password: ''
  },
  inputAccount: function(event) {
    console.log('账号',event.detail.value)
    this.setData({
      account: event.detail.value
    })
  },
  inputPassword: function(event) {
    this.setData({
      password: event.detail.value
    })
  },
  login: function() {
    if (this.data.account == '' || this.data.password == '') {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // 发送登录请求
    wx.request({
      url: 'https://example.com/onLogin',
      method: 'POST',
      data: {
        account: this.data.account,
        password: this.data.password
      },
      success: function(res) {
        // 登录成功处理逻辑
      },
      fail: function(res) {
        // 登录失败处理逻辑
      }
    })
  },
  toface: function(){
    wx.navigateTo({
      url: '../face/face',
    })
  },
  test: function(){
    wx.navigateTo({
      url: '../test/test',
    })
  },
  tofirstpage: function(){
    wx.navigateTo({
      url: '../firstpage/firstpage',
    })
  },
  tohouduan: function(){
    wx.navigateTo({
      url: '../test/test1',
    })
  }
})
