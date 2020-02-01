// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      swiperImg:[
        {src:"http://image1.chinanews.com.cn/cnsupload/big/2019/10-01/4-426/a7e426b0dd6c43d2bc710fafe810a0d5.jpg"},
        {src:"http://i2.chinanews.com/simg/cmshd/2019/10/05/998e12aa71f248d4a797761b18e48418.jpg"},
        {src:"http://i2.chinanews.com/simg/cmshd/2019/10/01/c5391220f28d49bdbd14c58a4300bde0.jpg"},
      ],
      newsList:[
        {
          id:'546734',
          title:'中国成功发射高分十号卫星 主要用于国土普查、防灾减灾等领域',
          poster:'http://i2.chinanews.com/simg/cmshd/2019/10/05/998e12aa71f248d4a797761b18e48418.jpg',
          add_date:'2019-10-05'
        },
        {
          id:'356412',
          title:'特写：2019，天安门城楼前的中国',
          poster:'http://image1.chinanews.com.cn/cnsupload/big/2019/10-01/4-426/a7e426b0dd6c43d2bc710fafe810a0d5.jpg',
          add_date:'2019-10-01'
        },
        {
          id:'239875',
          title:'记者手记：国家庆典，每个人都是记录者',
          poster:'http://i2.chinanews.com/simg/cmshd/2019/10/01/c5391220f28d49bdbd14c58a4300bde0.jpg',
          add_date:'2019-10-01'
        }
      ]
  },
  a(){
    wx.navigateTo({
      url: '/pages/detai/detail',
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