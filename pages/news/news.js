Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    // 被点击的导航菜单索引
    currentIndexNav: 0,
    // 导航
    navList: ["历史上的今天","视频推荐","笑话段子"],
    // 视频页数
    page_video:1,
    page_oher:1,
    // 视频列表
    video_list:[],
    // 笑话内容
    joke:[],
    page_joke:1,
    // 历史上的今天
    history:[],
    page_history:1,
    total:0,

  },
  // 历史上的今天
    getHistory(){
      var that=this;
      that.setData({ hidden: false })
      wx.request({
        url:'https://www.mxnzp.com/api/history/today?app_id=jyqldqlvhlntujln&app_secret=VzVqelIrQW9tTkdqU05QL0tMUUVqZz09&type=0',
        success(res){
          // console.log(res)
          if (res.data.code === 1){
            that.setData({
              history:res.data.data,
             
            })
          }
          that.setData({hidden:true})
        }
      })
        that.setData({hidden:true})
    },
    // 历史上的今天内容刷新
    // changeHistoy(e){
    //   console.log(e)
    //   var page=e.currentTarget.dataset.page+1;
    //   this.setData({
    //     page_history:page
    //   })
    //   this.getHistory(e.currentTarget.dataset.month, e.currentTarget.dataset.day, page, e.currentTarget.dataset.total)
    // },
    // 获取视频内容
    getVideo(page){
      var that=this;
      that.setData({ hidden: false })
      wx.request({
        url: 'https://www.mxnzp.com/api/news/list?app_id=jyqldqlvhlntujln&app_secret=VzVqelIrQW9tTkdqU05QL0tMUUVqZz09&typeId=526&page='+page,
        success(res){
          // console.log(res)
          if (res.data.code === 1) {
            that.setData({
              video_list: res.data.data
            })
          }
          that.setData({ hidden: true })
        }
      })
    },
    // 获取笑话内容
    getJoke(page){
      var that=this;
      that.setData({hidden:false})
      wx.request({
        url: 'https://www.mxnzp.com/api/jokes/list?app_id=jyqldqlvhlntujln&app_secret=VzVqelIrQW9tTkdqU05QL0tMUUVqZz09&page='+page,
        success(res){
          if(res.data.code===1){
            that.setData({
              joke:res.data.data.list
            })
          }
          that.setData({ hidden: true })
        }
      })
    },
    //刷新笑话内容
    changeListJoke(e){
      var page = e.currentTarget.dataset.page;
      page=page+1;
      this.setData({page_joke:page})
      this.getJoke(page)
    },
    // 点击首页导航按钮
    activeNav(e) {
      var that=this;
      var page_video = e.target.dataset.page_video;
      var page_joke = e.target.dataset.page_joke;
      var page_history = e.target.dataset.page_history;
      var total=e.target.dataset.total;
      var index = e.target.dataset.index;
      this.setData({
        currentIndexNav:index
      })
      if(index===0){
        that.getHistory()
      }else if(index===1){
        that.getVideo(page_video)
      }else if(index===2){
        that.getJoke(page_joke)
      }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      page_history: 1,
      page_joke: 1,
      page_video: 1,
      page_oher: 1
    })
    this.getHistory()
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