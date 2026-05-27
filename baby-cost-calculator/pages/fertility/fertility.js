// pages/fertility/fertility.js
const app = getApp()

Page({
  data: {
    childCount: 1,
    birthYearList: [],
    child1YearIndex: 0,
    child2YearIndex: 1,
    child3YearIndex: 2
  },

  onLoad() {
    // 生成未来20年的年份列表
    const currentYear = new Date().getFullYear()
    const yearList = []
    for (let i = 0; i < 20; i++) {
      yearList.push(`${currentYear + i}年`)
    }
    this.setData({
      birthYearList: yearList
    })
  },

  selectChildCount(e) {
    this.setData({
      childCount: e.currentTarget.dataset.count
    })
  },

  onChild1YearChange(e) {
    this.setData({
      child1YearIndex: e.detail.value
    })
  },

  onChild2YearChange(e) {
    this.setData({
      child2YearIndex: e.detail.value
    })
  },

  onChild3YearChange(e) {
    this.setData({
      child3YearIndex: e.detail.value
    })
  },

  prevStep() {
    wx.navigateBack()
  },

  nextStep() {
    const { childCount, child1YearIndex, child2YearIndex, child3YearIndex, birthYearList } = this.data
    
    const children = []
    if (childCount >= 1) {
      children.push({ birthYear: birthYearList[child1YearIndex] })
    }
    if (childCount >= 2) {
      children.push({ birthYear: birthYearList[child2YearIndex] })
    }
    if (childCount >= 3) {
      children.push({ birthYear: birthYearList[child3YearIndex] })
    }

    // 保存数据
    app.globalData.calculationData.fertility = {
      childCount: childCount,
      children: children
    }

    // 跳转到教育规划页面
    wx.navigateTo({
      url: '/pages/education/education'
    })
  }
})
