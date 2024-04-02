Page({
  data:{
    user_id:0,
    userinfomation:{},
    data1:{},
    data2:{},
    data3:{},
    rest_num:{},
  },
  backto: function(){
    wx.navigateBack({
      delta: 0,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  todetail2: function(){
    wx.navigateTo({
      url: '/pages/details/detail2',
    })
  },
  search1: function(){
    wx.request({
      url: 'http://127.0.0.1:5000//test/gethistory2/',
      header:{"content-Type" :"application/x-www-form-urlencoded"},
      method:"POST",
      data:'user_id='+this.data.user_id,
      success:(res)=>{
        this.setData({
          data1:res.data[0],
          data2:res.data[1],
          data3:res.data[2],
          rest_num:res.data[3]
        })
      },
    })
    },
  ChangeNow: function(event){
    var Now_value = event.currentTarget.dataset.datanum1;
    if(Now_value == 1){
      var data_num = event.currentTarget.dataset.datanum2;
      if(data_num=='1'){wx.showModal({content: '确认修改发帖状态吗',
        complete: (res) => {if(res.confirm){
          var chaged_data = this.data.data1
          chaged_data[10] = 0
          this.setData({
            data1:chaged_data
          })
          wx.request({
            url: 'http://127.0.0.1:5000//share/finish/',
            header:{"content-Type" :"application/x-www-form-urlencoded"},
            method:"POST",
            data:'name='+this.data.data1[0]+'&number='+this.data.data1[1]+'&way='+this.data.data1[2]+'&introduce='+this.data.data1[3]+'&user_name='+this.data.data1[4]+'&type0='+this.data.data1[5]+'&time0='+this.data.data1[6]+'&Lat='+this.data.data1[7]+'&Lng='+this.data.data1[8]+'&nearby='+this.data.data1[9]+'&now='+this.data.data1[10]+'&user_id='+this.data.data1[11],
            success:(res)=>{
              console.log('修改成功')
            }
          })
      }}})}
      if(data_num=='2'){wx.showModal({content: '确认修改发帖状态吗',
      complete: (res) => {if(res.confirm){
        var chaged_data = this.data.data2
        chaged_data[10] = 0
        this.setData({
          data2:chaged_data
        })
        wx.request({
          url: 'http://127.0.0.1:5000//share/finish/',
          data:this.data.data2
        })
      }}})}
      if(data_num=='3'){wx.showModal({content: '确认修改发帖状态吗',
      complete: (res) => {if(res.confirm){
        var chaged_data = this.data.data3
        chaged_data[10] = 0
        this.setData({
          data3:chaged_data
        })
        wx.request({
          url: 'http://127.0.0.1:5000//help/finish/',
          data:this.data.data3
        })
      }}})}
    }
  },
  onLoad(options) {
    wx.getStorage({
      key:'userinfomation',
      success:(res)=>{
        this.setData({
          userinfomation:res.data,
          user_id:res.data.user_id
        })
        this.search1()
      }
    })
    },
})