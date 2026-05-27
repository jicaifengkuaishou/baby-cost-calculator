// pages/result/result.js
const app = getApp()
const calculator = require('../../utils/calculator.js')

Page({
  data: {
    totalCost: 0,
    formattedTotal: '0',
    singleChildCost: 0,
    childCount: 1,
    breakdown: {},
    yearlyCost: [],
    totalYears: 22,
    parentProfile: {},
    houseCount: '0',
    carCount: '0',
    travelCount: '0'
  },

  onLoad() {
    // 执行计算
    const calculationData = app.globalData.calculationData
    const result = calculator.calculate(calculationData)

    // 计算趣味对比
    const houseCount = Math.floor(result.totalCost / 5000000) // 假设500万/套
    const carCount = Math.floor(result.totalCost / 500000)    // 假设50万/辆
    const travelCount = Math.floor(result.totalCost / 200000) // 假设20万/次环游

    // 计算年度花费百分比（用于图表）
    const maxCost = Math.max(...result.yearlyCost.map(item => item.avgCost))
    const yearlyCostWithPercentage = result.yearlyCost.map(item => ({
      ...item,
      percentage: (item.avgCost / maxCost) * 100
    }))

    this.setData({
      totalCost: result.totalCost,
      formattedTotal: this.formatMoney(result.totalCost),
      singleChildCost: result.singleChildCost,
      childCount: result.childCount,
      breakdown: result.breakdown,
      yearlyCost: yearlyCostWithPercentage,
      totalYears: result.totalYears,
      parentProfile: result.parentProfile,
      houseCount: houseCount > 0 ? houseCount : '不到1',
      carCount: carCount > 0 ? carCount : '不到1',
      travelCount: travelCount > 0 ? travelCount : '不到1'
    })

    // 保存结果到全局
    app.globalData.costResult = result
  },

  formatMoney(num) {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万'
    }
    return num.toLocaleString()
  },

  shareResult() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    
    wx.showToast({
      title: '点击右上角分享',
      icon: 'none',
      duration: 2000
    })
  },

  restart() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  // 转发分享
  onShareAppMessage() {
    return {
      title: `养${this.data.childCount}个孩子要花${this.data.formattedTotal}！你敢生吗？`,
      path: '/pages/index/index',
      imageUrl: '' // 可以自定义分享图片
    }
  }
})
