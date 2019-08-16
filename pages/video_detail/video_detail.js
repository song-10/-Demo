// pages/video_detail/video_detail.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    hidden:true,
    page:1,
    // 视频标题
    title:'',
    // 视频来源
    source:'',
    // 视频链接
    video_src:'',
    // 推荐视频
    otherList:[],
  },
  // 获取推荐视频
  getotherList(){
    var that=this;
    that.setData({hidden:false})
    wx.request({
      url: 'https://www.mxnzp.com/api/news/list?typeId=526&page=1',
      success(res){
        if(res.data.code===1){
          that.setData({
            otherList: res.data.data
          })
        }
        that.setData({ hidden: true })
      }
    })
  },
  // 刷新视频
  changeList(e){
    this.setData({ hidden: false })
    var page = e.currentTarget.dataset.page;
    page=page+1;
    var that=this;
    that.setData({
      page:page
    })
    wx.request({
      url: 'https://www.mxnzp.com/api/news/list?typeId=526&page='+page,
      success(res){
        if (res.data.code === 1) {
          that.setData({
            otherList: res.data.data
          })
        }
        that.setData({ hidden: true })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title,
      video_src:options.src,
      source: options.source
    })
    this.getotherList()
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