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
    currentIndex:0
  },
  //接口的返回数据
    Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory();

  },
    //获取分类数据方法
    getCategory(){

      request({url:"https://api.zbztb.cn/api/public/v1/categories"})
      .then(result=>{
            this.Cates=result.data.message;

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
    })
    }
})