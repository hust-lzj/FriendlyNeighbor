// pages/login/login.js
Page({
  data: {
    btnColor1: 'white',
    btnColor2: 'white',
    btnColor3: 'white',
    name:'',
    type0:0,
    telnum:'',
    quantity:'',
    details:'',
    user_id:0,
    user_name:'',
    Lat:0,
    Lng:0,
    Year:'',
    Month:'',
    Date:'',
    status:false,
    nearby:'华中科技大学',
  },
  changeColor1: function () {
    this.setData({
      btnColor1: 'rgba(14,208,208,1)',
      btnColor2: 'white',
      btnColor3: 'white',
      type0:1
    })
  },
  changeColor2: function () {
    this.setData({
      btnColor1: 'white',
      btnColor2: 'rgba(14,208,208,1)',
      btnColor3: 'white',
      type0:2
    })
  },
  changeColor3: function () {
    this.setData({
      btnColor1: 'white',
      btnColor2: 'white',
      btnColor3: 'rgba(14,208,208,1)',
      type0:3
    })
  },
  backto: function(){
    wx.navigateBack({
      delta: 0,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  inputName:function(event){
    this.setData({
      name:event.detail.value
    })
  },
  inputTelnum:function(event){
    this.setData({
      telnum:event.detail.value
    })
  },
  inputQuantity:function(event){
    this.setData({
      quantity:event.detail.value
    })
  },
  inputDetails:function(event){
    this.setData({
      details:event.detail.value
    })
  },
  require :function(){
    if(this.data.details==''){wx.showToast({title: '详细情况尚未填写',icon: 'none',duration: 1000})}
    if(this.data.quantity==''){wx.showToast({title: '数量尚未填写',icon: 'none',duration: 1000})}
    if(this.data.telnum==''){wx.showToast({title: '联系方式尚未填写',icon: 'none',duration: 1000})}
    if(this.data.type0==''){wx.showToast({title: '类型尚未选择',icon: 'none',duration: 1000})}
    if(this.data.name==''){wx.showToast({title: '名称尚未填写',icon: 'none',duration: 1000})}
    else{this.setData({status:true})}
    if(this.data.status==true){
    this.setData({
      Year:new Date().getFullYear(),
      Month:new Date().getMonth()+1,
      Date:new Date().getDate(),
    })
    wx.request({
      url: 'http://127.0.0.1:5000//help/search/',
      header:{"content-Type" :"application/x-www-form-urlencoded"},
      method:"POST",
      data:'name='+this.data.name+'&number='+this.data.quantity+'&way='+this.data.telnum+'&type0='+this.data.type0+'&introduce='+this.data.details+'&time0='+this.data.Year+'-'+this.data.Month+'-'+this.data.Date+'&Lat='+this.data.Lat+'&Lng='+this.data.Lng+'&user_name='+this.data.user_name+'&nearby='+this.data.nearby+'&user_id='+this.data.user_id,
      success:(res)=>{wx.redirectTo({url: '../over/over1',})},
      fail:(res)=>{wx.showToast({
        title: '发布失败',
        icon:'none',
      })}
    })
    
  }
  },
  onLoad(options) {
    this.setData({user_name:options.user_name,Lat:options.Lat,Lng:options.Lng,user_id:options.user_id})
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
