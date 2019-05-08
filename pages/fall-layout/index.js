// pages/fall-layout/index.js
let col1H = 0;  // 左侧长度
let col2H = 0;  // 右侧长度

Page({

  data: {
    scrollH: 0,  // 可滚动高度
    imgWidth: 0, // 图片宽度
    loadingCount: 0, // 图片加载长度
    images: [],  // 所有图片
    col1: [],    // 左侧的所有图片
    col2: []     // 右侧的所有图片
  },

  onLoad: function () {
    // 获取窗口的宽高
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });
        // 初始化图片的长度和大小
        this.loadImages();
      }
    })
  },
  //当图片载入完毕时触发，event.detail = {height, width}
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;
    // 循环图片加图片id
    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;
    // 如果左侧的高度小于右侧的高度，左侧加
    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },

  loadImages: function () {
    let images = [
      { pic: "../../img/1.png", height: 0 },
      { pic: "../../img/2.png", height: 0 },
      { pic: "../../img/3.png", height: 0 },
      { pic: "../../img/4.png", height: 0 },
      { pic: "../../img/5.png", height: 0 },
      { pic: "../../img/6.png", height: 0 },
      { pic: "../../img/7.png", height: 0 },
      { pic: "../../img/8.png", height: 0 },
      { pic: "../../img/9.png", height: 0 },
      { pic: "../../img/10.png", height: 0 },
      { pic: "../../img/11.png", height: 0 },
      { pic: "../../img/12.png", height: 0 },
      { pic: "../../img/13.png", height: 0 },
      // { pic: "../../img/14.png", height: 0 }
    ];

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }

    this.setData({
      loadingCount: images.length,
      images: images
    });
  }

})