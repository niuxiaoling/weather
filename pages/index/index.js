/**index.js**/
/// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var utils = require('../../utils/util.js')
let globalData = getApp().globalData;
Page({
  data: {
    weatherData: '',
    cityDatas: {},
    searchText: '',
    icons: ['/img/clothing.png', '/img/carwashing.png', '/img/pill.png', '/img/running.png', '/img/sun.png'],
  },
  calcPM(pm) {
    if (pm > 0 && pm <= 50) {
      return {
        value: pm,
        desc: '优',
        detail: ''
      }
    } else if (pm > 50 && pm <= 100) {
      return {
        value: pm,
        desc: '良',
        detail: ''
      }
    } else if (pm > 100 && pm <= 150) {
      return {
        value: pm,
        desc: '轻度污染',
        detail: '对敏感人群不健康',
      }
    } else if (pm > 150 && pm <= 200) {
      return {
        value: pm,
        desc: '中度污染',
        detail: '不健康',
      }
    } else if (pm > 200 && pm <= 300) {
      return {
        value: pm,
        desc: '重度污染',
        detail: '非常不健康',
      }
    } else if (pm > 300 && pm <= 500) {
      return {
        value: pm,
        desc: '严重污染',
        detail: '有毒物',
      }
    } else if (pm > 500) {
      return {
        value: pm,
        desc: '爆表',
        detail: '能出来的都是条汉子',
      }
    }
  },
  success(data) {
    wx.stopPullDownRefresh();
    // 存下来源数据
    let now = new Date()
    // 存下来源数据
    data.updateTime = now.getTime()
    data.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm")
    let results = data.originalData.results[0] || {}
    data.pm = this.calcPM(results['pm25'])
    // 当天实时温度
    data.temperature = `${results.weather_data[0].date.match(/\d+/g)[2]}`
    wx.setStorage({
      key: 'cityDatas',
      data: data,
    })
    this.setData({
      cityDatas: data,
    })
    console.log(data)
  },
  fail(res) {
    var that = this;
    wx.stopPullDownRefresh();
    let errMsg = res.errMsg || '';
    // 拒绝授权地理位置权限
    if (errMsg.indexOf('deny') !== -1 || errMsg.indexOf('denied') !== -1) {
      wx.showToast({
        title: '需要开启地理位置授权',
        icon: "none",
        duration: 2500,
        success(res) {
          let timer = setTimeout(function () {
            clearTimeout(timer);
            wx.openSetting({})
          }, 2500)
        }
      })
    } else {
      wx.showToast({
        title: '网络不给力',
        icon: 'none'
      })
    }
    console.log(res)
  },
  init(params) {
    var that = this;
    // 新建百度地图对象
    var BMap = new bmap.BMapWX({
      ak: globalData.ak
    });
    // 请求天气信息
    BMap.weather({
      location: params.location,
      fail: that.fail,
      success: that.success
    })
  },
  commitSearch(res) {
    let that = this;
    let val = ((res.detail || {}).value || '').replace(/\s+/g, '');
    that.search(val)
  },
  search(val) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    })
    if (val) {
      let that = this
      this.getlocationCode(val, (loc) => {
        that.init({
          location: `${loc.lng},${loc.lat}`
        })
      })
    }
  },
  // 获取地理位置编码
  getlocationCode(address, success) {
    let that = this;
    wx.request({
      url: getApp().setGeocoderUrl(address),
      success(res) {
        let data = res.data || {};
        if (!data.status) {
          let location = (data.result || {}).location || {};
          success && success(location)
        } else {
          wx.showToast({
            title: data.msg || '网络不给力，请稍后再试',
            icon: 'none',
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: res.errMsg || '网络不给力，请稍后再试',
          icon: 'none',
        })
      },
      complete() {
        that.setData({
          searchText: '',
        })
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh(res) {
    this.init({});
  },
  // 城市搜索页
  searchCity() {
    console.log(123)
    wx.navigateTo({
      url: "../city/city",
    })
  },
  onLoad: function () {
    console.log(globalData)
    var that = this;
    that.init({})
  }
})