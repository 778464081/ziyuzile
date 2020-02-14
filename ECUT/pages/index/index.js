import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //导航 数组
    catesList:[],
    //楼层 数组
    floorList:[]
  },

  /**
   * 页面加载就会触发
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //   wx.request({
      //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      //   success: (result)=>{
      //     this.setData({
      //       swiperList:result.data.message
      //     })
      //   }
      // });
        this.getSwiperList();
        this.getCatesList();
        this.getFloorList();
  },
getSwiperList(){

    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({
            swiperList: result
         })
    })
  },
  getCatesList(){

    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
            catesList: result
         })
    })
  },
  getFloorList(){

    request({url:"/home/floordata"})
    .then(result=>{
      this.setData({
           floorList: result
         })
    })
  },
})