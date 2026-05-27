// pages/lifestyle/lifestyle.js
const app = getApp()

Page({
  data: {
    lifeLevel: '舒适',
    lifeLevelPrice: '5千元',
    needNanny: false,
    nannyYears: 1
  },

  selectLifeLevel(e) {
    const level = e.currentTarget.dataset.level
    const priceMap = {
      '极简': '2千元',
      '基本': '3.5千元',
      '舒适': '5千元',
      '富裕': '8千元',
      '奢侈': '1.5万元'
    }
    this.setData({
      lifeLevel: level,
      lifeLevelPrice: priceMap[level]
    })
  },

  selectNanny(e) {
    this.setData({
      needNanny: e.currentTarget.dataset.value
    })
  },

  selectNannyYears(e) {
    this.setData({
      nannyYears: e.currentTarget.dataset.years
    })
  },

  prevStep() {
    wx.navigateBack()
  },

  nextStep() {
    const { lifeLevel, needNanny, nannyYears } = this.data

    // 保存数据
    app.globalData.calculationData.lifestyle = {
      lifeLevel: lifeLevel,
      needNanny: needNanny,
      nannyYears: needNanny ? nannyYears : 0
    }

    // 跳转到趣味问答
    wx.navigateTo({
      url: '/pages/quiz/quiz'
    })
  }
})
