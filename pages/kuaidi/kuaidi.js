// pages/kuaidi/kuaidi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: true,
    hidden:true,
    // 快递单号
    kd_number:'',
    // 包裹状态
    message: [],
    kc_status:'',
    // 快递公司名称及编号
    kc_name:'快递公司',
    kc:1,
  },
  // 获取快递单号并查询对应的公司
  bindKeyInput: function (e) {
    var that=this;
    wx.request({
      url: 'https://www.mxnzp.com/api/logistics/discern?app_id=jyqldqlvhlntujln&app_secret=VzVqelIrQW9tTkdqU05QL0tMUUVqZz09&logistics_no=' + e.detail.value,
      success(res){
        // console.log(res)
        if(res.data.code===1){
          that.setData({
            kd_number: e.detail.value,
            kc_name: res.data.data.searchList[0].logisticsTypeName,
            kc: res.data.data.searchList[0].logisticsTypeId,
            select:true
          })
        }
      }
    })
  },
  // 查询快递
  detialSearch(e){
    var that=this;
    that.setData({hidden:false})
    wx.request({
      url: 'https://www.mxnzp.com/api/logistics/details/search?app_id=jyqldqlvhlntujln&app_secret=VzVqelIrQW9tTkdqU05QL0tMUUVqZz09&',
      data:{
        logistics_no: e.currentTarget.dataset.number,
        logistics_id: e.currentTarget.dataset.comp,
      },
      success: function (res) {
        // console.log(res)
        if(res.data.code===1){
          that.setData({
            select:false,
            message:res.data.data.data,
            kc_status:res.data.data.status
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