// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    src:"/images/index1.png",
    show:true,
    newsList:[
      {
        id:'546734',
        title:'中国成功发射高分十号卫星 主要用于国土普查、防灾减灾等领域',
        poster:'http://i2.chinanews.com/simg/cmshd/2019/10/05/998e12aa71f248d4a797761b18e48418.jpg',
        add_date:'2019-10-05'
      },
    ]

  },
  getMyInfo:function(e){
    console.log(e.detail.userInfo)
    var isShow=this.data.show;
    let info=e.detail.userInfo;
    this.setData({
      name:info.nickName,
      src:info.avatarUrl,
      show:!isShow,

    })
  },
  jump:function(e){
    wx.navigateTo({
      url:"../detail/detail"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})