// pages/education/education.js
const app = getApp()

Page({
  data: {
    eduTarget: '本科',
    kindergartenType: '公立',
    primaryType: '公立',
    middleType: '公立',
    highType: '公立',
    extraLevel: '舒适',
    extraLevelPrice: '5千元'
  },

  selectEduTarget(e) {
    this.setData({
      eduTarget: e.currentTarget.dataset.value
    })
  },

  selectKindergarten(e) {
    this.setData({
      kindergartenType: e.currentTarget.dataset.type
    })
  },

  selectPrimary(e) {
    this.setData({
      primaryType: e.currentTarget.dataset.type
    })
  },

  selectMiddle(e) {
    this.setData({
      middleType: e.currentTarget.dataset.type
    })
  },

  selectHigh(e) {
    this.setData({
      highType: e.currentTarget.dataset.type
    })
  },

  selectExtraLevel(e) {
    const level = e.currentTarget.dataset.level
    const priceMap = {
      '极简': '500元',
      '基本': '2千元',
      '舒适': '5千元',
      '富裕': '1万元',
      '奢侈': '2万元'
    }
    this.setData({
      extraLevel: level,
      extraLevelPrice: priceMap[level]
    })
  },

  prevStep() {
    wx.navigateBack()
  },

  nextStep() {
    const { eduTarget, kindergartenType, primaryType, middleType, highType, extraLevel } = this.data

    // 保存数据
    app.globalData.calculationData.education = {
      eduTarget: eduTarget,
      kindergartenType: kindergartenType,
      primaryType: primaryType,
      middleType: middleType,
      highType: highType,
      extraLevel: extraLevel
    }

    // 跳转到生活档位页面
    wx.navigateTo({
      url: '/pages/lifestyle/lifestyle'
    })
  }
})
