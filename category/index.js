import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList:[],
    //右侧的菜单数据
    rightMenuList:[],
    //被点击的左侧菜单
    currentIndex:0,
    //右侧内容的滚动条距离顶部的距离
    scrollTop:0,
  },
  //接口的返回数据
    Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    0 web 中的本地存储和小程序中的本地存储的区别
        1 写代码的方式不一样
          web: localStorage.setItem("key","value") lcoalStorage.getItem("key")
          小程序中： wx-setStorageSync("key", "value"); wx.getStorageSync("cates");
        2 存的时候 有没有做类型转换
          web:不管存入的是什么类型的数据，最终都会先调用以下toString(),把数据变成字符串 再存入进去
          小程序：不存在 类型转换的这个操作 存什么类似的数据进入，获取的时候就是什么类型

    1 先判断一下本地存储中有没有旧的数据
    2 没有旧的数据 直接发送新请求
    3 有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
    */
    //1  获取本地存储中的数据
      const Cates=wx.getStorageSync("cates");
    //2 判断
    if(!Cates){
      // 不存在 发送请求数据
      this.getCates();
    }else{
      //有旧的数据 定义过期时间 10s 改成 5min
        if(Date.now()-Cates.time>1000*10){
          this.getCates();
        }else{
          //可以使用旧的数据

          this.Cates=Cates.data;  //获取本地存储数据
            //构造左侧的菜单数据
            let leftMenuList=this.Cates.map(v=>v.cat_name);
            //构造右侧的菜单数据
          let rightMenuList=this.Cates[0].children; 
          this.setData({
                leftMenuList,
                rightMenuList
          })
        }

    }

  },
    //获取分类数据方法
getCates(){

      request({url:"https://api.zbztb.cn/api/public/v1/categories"})
      .then(result=>{
            this.Cates=result.data.message;
            // 吧接口的数据存入到本地存中
            wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
            //构造左侧的菜单数据
          let leftMenuList=this.Cates.map(v=>v.cat_name);
            //构造右侧的菜单数据
          let rightMenuList=this.Cates[0].children; 
          this.setData({
                leftMenuList,
                rightMenuList
          })

      })
    },
    handleItemTap(e){
      /*
      1 获取被点击的标题身上的索引
      2 给data中的currentIndex赋值就可以了
      3 根据不同的索引来渲染右侧的商品内容
      */
     const {index}=e.currentTarget.dataset;
     let rightMenuList=this.Cates[index].children;
     this.setData({
      currentIndex:index,
      rightMenuList,
      //重新设计 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop:0,
    })
    }
})