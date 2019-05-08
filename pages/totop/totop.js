// pages/goods/goods.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {
      id: 1,
      image: '/image/goods1.png',
      title: '新鲜梨花带雨',
      price: 0.01,
      stock: '有货',
      detail: '这里是梨花带雨详情。',
      parameter: '125g/个',
      service: '不支持退货',
      gallery: [
        "https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/15270/31/6068/188719/5c4591c4E05bd9768/2eecd7f6f768668e.jpg!q80.dpg.webp",
        "https://m.360buyimg.com/mobilecms/s843x843_jfs/t1/12056/2/5028/120945/5c36ebfbEe80ad73e/0f328afc416467ed.jpg!q70.dpg.webp"
      ]
    },  //商品信息
    cartGoodsCount: 0, //购物车数量
    curIndex: 0,  //tab切换下标
    menuFixed: false,  //固定tab
    openAttr: false,  //打开详情
    number: 1,  //商品数量
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 打开详情开关
   */
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
  },
  /**
   * 关闭详情开关
   */
  closeAttr: function () {
    this.setData({
      openAttr: false,
    });
  },
  /**
   * 切换tab
   */
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },
  /**
  * 减少数量
  */
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  },
  /**
  * 下单
  */
  bugGoods: function (options) {
    wx.navigateTo({
      url: "/pages/checkout/checkout"
    })
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
    var that = this;
    var query = wx.createSelectorQuery()//创建节点查询器 query
    query.select('#affix').boundingClientRect() //获取节点位置信息的查询请求
    query.exec(function (res) {
      that.setData({
        menuTop: res[0].top
      })
    });
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

  },
  onPageScroll: function (e) {
    // console.log(e.scrollTop);
    var that = this;
    // 3.当页面滚动距离scrollTop > menuTop菜单栏距离文档顶部的距离时，菜单栏固定定位
    if (e.scrollTop > that.data.menuTop) {
      that.setData({
        menuFixed: true
      })
    } else {
      that.setData({
        menuFixed: false
      })
    }
  }

})