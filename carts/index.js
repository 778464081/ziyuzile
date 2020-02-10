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
3 onShow
  1 获取缓存中的购物车数组
  2 把购物车数据 填充到data中
4 全选的实现 数据的展示
  1 onShow 获取缓存中的购物车数组
  2 根据购物车中的商品数据 所以的商品都被选中 checked=true 全选就被选中
5 总价格和总数量
  1 都需要商品被选中 
  2 获取购物车数组
  3 判断商品是否被选中
  4 总价格+=商品的单价*商品的数量
  5 总数量+=商品的数量
  6 把计算后的的价格和数量 设置回data中即可
6 商品的选中
  1 绑定change事件
  2 获取到被修改的商品对象
  3 商品对象的选中状态 取反
  4 重新填充回data中和缓存中
  5 重新计算全选，总价格，总数量

*/ 
import { getSetting, openSetting, chooseAddress} from "../../utils/asyncWx.js";
Page({
  data:{
      address:{},
      cart:[],
      allChecked:false,
      totalPrice:0,
      totalNum:0,
  },
  onShow(){
    //1 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    //1 获取缓存中的购物车数据
    const cart=wx.getStorageSync('cart') || [];
    this.setData({address});
    this.setCart(cart);
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
  },
 
  handleItemchange(e){
    //1 获取被修改的商品的ID
    const goods_id=e.currentTarget.dataset.id;
    //2 获取购物车数组
    let {cart} =this.data;
    //3 找到被修改的商品对象
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    //4 选中状态取反
    cart[index].checked=!cart[index].checked;
    this.setCart(cart);
  },
  // 设置购物车状态 重新计算 底部工具栏的数据 全选 总价格 购买的数据
  setCart(cart){
    let allChecked=true
    //1 总价格 总数量
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=> {
      if(v.checked){
      totalPrice+=v.num*v.goods_price;
      totalNum+=v.num;
      }else{
        allChecked=false;
      }
    });
    //判断数组是否为空
    allChecked=cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,totalNum,allChecked,
    });
    wx.setStorageSync("cart", cart);
  }
})