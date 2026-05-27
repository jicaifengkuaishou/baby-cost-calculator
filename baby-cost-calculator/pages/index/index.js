// pages/index/index.js
Page({
  data: {},

  onLoad() {
    // 清空之前的计算数据
    const app = getApp()
    app.globalData.calculationData = {
      kyc: {},
      fertility: {},
      education: {},
      lifestyle: {},
      quiz: {}
    }
  },

  startCalculation() {
    wx.navigateTo({
      url: '/pages/kyc/kyc'
    })
  }
})
