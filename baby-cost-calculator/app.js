App({
  globalData: {
    userInfo: null,
    calculationData: {
      kyc: {},
      fertility: {},
      education: {},
      lifestyle: {},
      quiz: {}
    },
    costResult: null
  },

  onLaunch() {
    console.log('App Launch')
    // 初始化云开发环境
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
  }
})
