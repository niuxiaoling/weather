Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText:'',
    current:0,
    all: { id: "全选", val: "全选", checked: false },
    items:[], //全部任务
  },
  //tab切换
  tab: function (event) {
    this.setData({ current: event.target.dataset.current })
  },
  //滑动事件
  eventchange: function (event) {
    this.setData({ current: event.detail.current })
  },
  //全选事件
  checkboxChange:function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var t_items = [];
    if (e.detail.value == this.data.all.id) {
      for (var i = 0; i < this.data.items.length; i++) {
        t_items[i] = { id: this.data.items[i].id, val: this.data.items[i].val, checked: true };
      }
      this.setData({ items: t_items });
    } else {
      for (var i = 0; i < this.data.items.length; i++) {
        t_items[i] = { id: this.data.items[i].id, val: this.data.items[i].val, checked: false };
      }
      this.setData({ items: t_items });
    };

  },
  //存储的值
  stroage:function(items){
    wx.setStorageSync('all', JSON.stringify(items));
    var all = JSON.parse(wx.getStorageSync('all'));
    this.setData({
      items: all
    })
  },
  // 选中事件
  checkchange:function(e){
    var that = this;
    var newdata = this.data.items.filter(function (item, index, arr) {
      if (item.id == e.target.dataset.index){
        item.checked = !item.checked;
      }
      return item;
    });
    this.setData({
      items:newdata
    })
    this.stroage(that.data.items);
  },
  // 删除事件
  close:function(options){
    var that = this;
    wx.showModal({
      title: '啊哦',
      content: '确定要删除您的任务日程吗?',
      success: function (res) {
        if (res.confirm) {
          var closeid = options.target.dataset.close;
          var item = that.data.items;
          item.splice(closeid, 1);
          that.setData({
            items: item
          });
          that.stroage(that.data.items)
        } else if (res.cancel) {
        }
      }
    })
   
   
  },
  // 失去焦点事件
  comitTodo:function(e){
    var that = this;
    var todovalue = e.detail.value;
    if (todovalue) {
      var obj= [
          {
            id: that.data.items.length + 1,
            val: todovalue,
            checked: false
          }
      ];
      this.setData({
        items:that.data.items.concat(obj),
      })
      wx.setStorageSync('all', JSON.stringify(that.data.items));
     }
     this.setData({
       searchText:''
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     wx.showToast({
      mask: true,
      title: '加载中...',
      icon: 'loading',
      duration: 500
    });
    if (wx.getStorageSync('all')) {
      var all = JSON.parse(wx.getStorageSync('all'));
      var checkeddata = all.filter((item, index, arr) => {
        return item.checked == false;
      })
      var otherdata = all.filter((item,index,arr)=>{
        return item.checked == true;
      })
      this.setData({
        items: all,
        checkedItem: checkeddata,
        otherItmes: otherdata
      })
    }   
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
  // onPullDownRefresh: function () {
    
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
    
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if(res.from=="button"){
      console.log(res.message);
    }
    return {
       title:'天空之城',
       page:'/pages/express/express'
    }
  }
})