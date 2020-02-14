/*
1 输入框绑定 值改变时间 input事件
  1 获取到输入框的值 发送到后台
  2 合法性判断
  3 检验通过 把输入框的值 发送到后台
  4 返回的数据打印到页面上
*/
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[]
  },
  handleInput(e){
  //1 获取输入框的值
  const {value}=e.detail;
  //2 检验合法性
  if(!value.trim()){
    //值不合法
    return;
  }
  //3 准备发送请求获取数据
    this.qsearch(value);
  },
  async qsearch(query){
    const res=await request({url:'/goods/qsearch',data:{query}});
    console.log(res);
    this.setData({
      goods:res
    })
  }
})