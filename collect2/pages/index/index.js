
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    region:['北京市','北京市','东城区'],
    now:''
  },
  changeRegion:function(e){
    this.setData({
      region:e.detail.value
    })
    this.getWeater(); //更新天气
  },
  getWeater:function(){
    var that=this; //this不可以直接在wxAPI函数内部使用
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data:{
        location:that.data.region[1],
        key:'a013ec849ff04ff58dea3a5822566c26'
      },
      success:function(res){
        // console.log(res.data)
        that.setData({now:res.data.HeWeather6[0].now})
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
