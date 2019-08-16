// pages/garbage/garbage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    h1:true,
    // 目标结果
    aim:[],
    // 相关搜索
    recommendList:[],
    // 输入内容
    content:'',
  },
  // 获取输入内容
  bindKeyInput(e){
    this.setData({content:e.detail.value})
  },
  // 查询分类结果
  getSearch(e){
    var name=e.currentTarget.dataset.name;
    var that=this;
    that.setData({h1:false,hidden:true})
    wx.request({
      url: 'https://www.mxnzp.com/api/rubbish/type?name='+name,
      success(res){
        // console.log(res)
        if(res.data.code===1){
          that.setData({
            aim:res.data.data.aim,
            recommendList:res.data.data.recommendList
          })
        }
        that.setData({h1:true,hidden:false})
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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