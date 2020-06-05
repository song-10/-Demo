Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制显示天气详情
    detail:true,
    // 城市
    city:'',
    // 控制加载提示框
    hidden:true,
    editTrue: false,
    showModalStatus: false,
    future:[],
    future_date:[],
    today: {},
    todayInfo:[],
    latitude:'',
    longitude:'',
    //存储黄历
    perpetual_clr:[],
  },
  // 获取当前位置（经纬度）
  loadInfo: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.loadWeather(latitude, longitude)
        that.setData({
          latitude:latitude,
          longitude:longitude
        })
      }
    })
  },
  // 获取天气信息
  loadWeather: function (latitude, longitude) {
    var that = this;
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/?location=' + latitude + ',' + longitude +'&key=563a678ae4164c21b731ad5f1c752f6d' ,
      success: function (res) {
        that.setData({ 
          city: res.data.HeWeather6[0].basic.parent_city + '-' + res.data.HeWeather6[0].basic.location,
          today: res.data.HeWeather6[0].now, 
          future: res.data.HeWeather6[0].daily_forecast ,
          todayInfo: res.data.HeWeather6[0].lifestyle,
          })
        that.getDate(res.data.HeWeather6[0].daily_forecast[0].date.replace(/-/g, ""), res.data.HeWeather6[0].daily_forecast[1].date.replace(/-/g, ""), res.data.HeWeather6[0].daily_forecast[2].date.replace(/-/g, ""))
      }
    });
  },
  // 获取黄历
  getDate(date1,date2,date3){
    var that=this;
    wx.request({
      url: 'https://www.mxnzp.com/api/holiday/multi/' + date1 + ',' + date2 + ',' + date3 +'?app_id=jyqldqlvhlntujln&app_secret=VzVqelIrQW9tTkdqU05QL0tMUUVqZz09',
      success(res){
        console.log(res.data.data)
        if(res.data.code===1){
          that.setData({
            perpetual_clr:res.data.data
          })
        }
      }
    })
  },
  // 显示当前日期的详细信息
  showDetail(e){
    if (e.currentTarget.dataset.status){
      this.setData({detail:false})
    }else{
      this.setData({detail:true})
    }
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInfo();
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
  // onShareAppMessage: function () {}
})