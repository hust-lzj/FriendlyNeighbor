// pages/list/list.js
Page({
  data: {
    range1: ["生活物资", "医疗物资", "社会服务"],
    type0_list:[1,2,3],
    selected1: "物资分类",
    range2:["今日内","一周内","一月内"],
    dTime_list:[1,7,30],
    selected2: "时间",
    range3: ["一百米内","五百米内","一千米内"],
    distance_list:[100,500,1000],
    selected3: "距离",
    Year:'',
    Month:'',
    Date:'',
    type0:0,
    dTime:0,
    distance:0,
    currentData:0,
    user_name:'',
    touxiang:'',
    user_id:0,
    Lat:0,
    Lng:0,
    userinfomation:{},
    data1:{},
    data2:{},
    data3:{},
    data4:{},
    data5:{},
    data6:{},
  },
  onPickerChange1: function (e) {
    this.setData({
      selected1: this.data.range1[e.detail.value],
      type0: this.data.type0_list[e.detail.value]
    });
  },
  onPickerChange2: function (e) {
    this.setData({
      selected2: this.data.range2[e.detail.value],
      dTime: this.data.dTime_list[e.detail.value]
    });
  },
  onPickerChange3: function (e) {
    this.setData({
      selected3: this.data.range3[e.detail.value],
      distance: this.data.distance_list[e.detail.value]
    });
  },
  toshare: function(){
    wx.navigateTo({
      url: '../content/share?user_name='+this.data.user_name+'&Lat='+this.data.Lat+'&Lng='+this.data.Lng+'&user_id='+this.data.user_id,
    })
  },
  torequire: function(){
    wx.navigateTo({
      url: '../content/require?user_name='+this.data.user_name+'&Lat='+this.data.Lat+'&Lng='+this.data.Lng+'&user_id='+this.data.user_id,
    })
  },
    //获取当前滑块的index
  bindchange: function (e) {
      const that = this;
      that.setData({
        currentData: e.detail.current
      })
  },
    //点击切换，滑块index赋值
  checkCurrent: function (e) {
      const that = this;
      if (that.data.currentData === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentData: e.target.dataset.current
        })
      }
  },
  search1: function(){
    wx.request({
      url: 'http://127.0.0.1:5000//test/getform/',
      header:{"content-Type" :"application/x-www-form-urlencoded"},
      method:"POST",
      data:'dTime='+this.data.dTime+'&Type='+this.data.type0+'&distance='+this.data.distance+'&Lat='+this.data.Lat+'&Lng='+this.data.Lng,
      success:(res)=>{
        this.setData({
          data1:res.data[0],
          data2:res.data[1],
          data3:res.data[2],
        })
      },
    })
    },
  torequiredata: function(datanum){
    var datanum_ = datanum['target']['dataset']['datanum']
    if(datanum_ == "1"){wx.navigateTo({url: '../details/detail1?detailtitle='+this.data.data1[0]+'&detailtype='+this.data.data1[5]+'&detailcontent='+this.data.data1[3]+'&detailname='+this.data.data1[4]+'&detailway='+this.data.data1[2]+'&detailtime='+this.data.data1[6]})}
    if(datanum_ == "2"){wx.navigateTo({url: '../details/detail1?detailtitle='+this.data.data2[0]+'&detailtype='+this.data.data2[5]+'&detailcontent='+this.data.data2[3]+'&detailname='+this.data.data2[4]+'&detailway='+this.data.data2[2]+'&detailtime='+this.data.data2[6]})}
    if(datanum_ == "3"){wx.navigateTo({url: '../details/detail1?detailtitle='+this.data.data3[0]+'&detailtype='+this.data.data3[5]+'&detailcontent='+this.data.data3[3]+'&detailname='+this.data.data3[4]+'&detailway='+this.data.data3[2]+'&detailtime='+this.data.data3[6]})}
  },
  tosharedata: function(datanum){
    var datanum_ = datanum['target']['dataset']['datanum']
    if(datanum_ == "1"){wx.navigateTo({url: '../details/detail2?detailtitle='+this.data.data4[0]+'&detailtype='+this.data.data4[5]+'&detailcontent='+this.data.data4[3]+'&detailname='+this.data.data4[4]+'&detailway='+this.data.data4[2]+'&detailtime='+this.data.data4[6]})}
    if(datanum_ == "2"){wx.navigateTo({url: '../details/detail2?detailtitle='+this.data.data5[0]+'&detailtype='+this.data.data5[5]+'&detailcontent='+this.data.data5[3]+'&detailname='+this.data.data5[4]+'&detailway='+this.data.data5[2]+'&detailtime='+this.data.data5[6]})}
    if(datanum_ == "3"){wx.navigateTo({url: '../details/detail2?detailtitle='+this.data.data6[0]+'&detailtype='+this.data.data6[5]+'&detailcontent='+this.data.data6[3]+'&detailname='+this.data.data6[4]+'&detailway='+this.data.data6[2]+'&detailtime='+this.data.data6[6]})}
  },
  search2: function(){
    wx.request({
      url: 'http://127.0.0.1:5000//test/getform2/',
      header:{"content-Type" :"application/x-www-form-urlencoded"},
      method:"POST",
      data:'dTime='+this.data.dTime+'&Type='+this.data.type0+'&distance='+this.data.distance+'&Lat='+this.data.Lat+'&Lng='+this.data.Lng,
      success:(res)=>{
        this.setData({
          data4:res.data[0],
          data5:res.data[1],
          data6:res.data[2],
        })
      },
    })
    },
  onLoad(options) {
    wx.getStorage({
      key:'userinfomation',
      success:(res)=>{
        this.setData({
          userinfomation:res.data,
          user_name:res.data.nickName,
          touxiang:res.data.avatarUrl,
          Lat:res.data.Lat,
          Lng:res.data.Lng,
          user_id:res.data.user_id
        })
        // console.log(this.data.userinfomation)
      }
    })
    this.search1()
    this.search2()
    },
  onShow(){
    
  },
  userself: function(){
      wx.navigateTo({
        url: '/pages/usercenter/usercenter',
      })
  }
})