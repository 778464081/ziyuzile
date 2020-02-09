/*
1 获取用户的收货地址
  1 绑定点击事件
  2 调用小程序内置api 获取用户的收货地址 wx.chooseAddress

2 获取 用户 对小程序 所授予 获取地址的 权限 状态 scope
  1 假设 用户 点击获取收货地址的提示框 确定 authSetting scope.address
  scope 值 true 直接调用 获取收货地址
  2  假设 用户 出来没有调用过 收货地址的api
   scope undefined
  3 假设 用户 点击获取收货地址的提示框 取消
   scope 值 false
     1 诱导用户自己打开授权设置页面 当用户重新给予 获取地址权限的时候
     2 获取收货地址
  4 把获取到的收货地址 存入到 本地存储中
2 页面加载完毕
  1 获取本地存储中的地址数据
  2 把数据 设置给data中的一个变量
*/ 
import { getSetting, openSetting, chooseAddress} from "../../utils/asyncWx.js";
Page({
  data:{
      address:{},
  },
  onShow(){
    //1 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    //2 给data赋值
    this.setData({
      address
    })
  },
  //点击 收货地址
 async handleChooseAdress(){
  //1 获取 权限状态
  // wx.getSetting({
  //   success: (result)=>{
  //     // 2 获取权限状态
  //     const scopeAddress=result.authSetting["scope.address"];
  //     if(scopeAddress===true||scopeAddress===undefined){
  //       wx.chooseAddress({
  //         success: (result1)=>{
  //           console.log(result1);
  //         }
  //       });
  //     }else{
  //       //3用户 以前拒绝过授权 先诱导用户打开授权页面
  //       wx.openSetting({
  //         success: (result2)=>{
  //          //4 可以调用 收货地址代码
  //          wx.chooseAddress({
  //           success: (result3)=>{
  //             console.log(result3);
  //           }
  //         });
  //         }
  //       });
  //     }

  //   },
  //   fail: ()=>{},
  //   complete: ()=>{}
  // });
  try {
    
    //1 获取权限状态
  const res1=await getSetting();
  const scopeAddress=res1.authSetting["scope.address"];
  //2 判断权限状态
  if(scopeAddress===false){
    //3 调用获取收货地址的api
    await openSetting();
    
  }
    // 4 调用获取收货地址的 api
    let address=await chooseAddress();
    address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;

    //5 把获取到的数据存入到本地存储中
    wx.setStorageSync("address", address);
  } catch (error) {
    console.log(error);
    
  }
}
})