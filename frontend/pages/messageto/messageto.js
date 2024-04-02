Page({
  data:{
    userinfomation:{},
    user_id:0,
    inputValue:'',
    Year:'',
    Month:'',
    Date:'',
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
  messageover: function(){
    if(this.data.inputValue !== ''){
      this.postmessage()
    }
    else{wx.showToast({title: '未填写内容',icon: 'none',duration: 1000})}
  },
  contentupdate: function(options){
    this.setData({  
      inputValue: options.detail.value // 更新data中的inputValue  
    })
  },
  postmessage :function(){
    this.setData({
      Year:new Date().getFullYear(),
      Month:new Date().getMonth()+1,
      Date:new Date().getDate(),
    })
    wx.request({
      url: 'http://127.0.0.1:5000//getmessage/',
      header:{"content-Type" :"application/x-www-form-urlencoded"},
      method:"POST",
      data:'&message='+this.data.inputValue+'&time0='+this.data.Year+'-'+this.data.Month+'-'+this.data.Date+'&Lat='+this.data.userinfomation.Lat+'&Lng='+this.data.userinfomation.Lng+'&user_name='+this.data.user_name+'&user_id='+this.data.user_id,
      success:(res)=>{    wx.navigateTo({
        url: '/pages/messageto/messageover',
      })},
      fail:(res)=>{wx.showToast({
        title: '提交失败',
        icon:'none',
      })}
    })
    
  
  },
  onLoad(options) {
    wx.getStorage({
      key:'userinfomation',
      success:(res)=>{
        this.setData({
          userinfomation:res.data,
          user_id:res.data.user_id
        })
      }
    })
    },
})