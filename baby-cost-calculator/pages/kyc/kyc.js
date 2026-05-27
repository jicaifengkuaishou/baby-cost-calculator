// pages/kyc/kyc.js
const app = getApp()

Page({
  data: {
    cityList: ['北京(一线)', '上海(一线)', '广州(一线)', '深圳(一线)', '杭州(二线)', '成都(二线)', '武汉(二线)', '南京(二线)', '西安(二线)', '重庆(二线)', '其他城市'],
    cityIndex: 0,
    
    ageList: ['20-24岁', '25-29岁', '30-34岁', '35-39岁', '40-44岁', '45岁以上'],
    ageIndex: 1,
    
    incomeList: ['10万以下', '10-20万', '20-30万', '30-50万', '50-80万', '80-100万', '100万以上'],
    incomeIndex: 2,
    
    hasChild: false,
    
    childAgeList: ['0-1岁', '1-3岁', '3-6岁', '6-12岁', '12-15岁', '15-18岁'],
    childAgeIndex: 0
  },

  onCityChange(e) {
    this.setData({
      cityIndex: e.detail.value
    })
  },

  onAgeChange(e) {
    this.setData({
      ageIndex: e.detail.value
    })
  },

  onIncomeChange(e) {
    this.setData({
      incomeIndex: e.detail.value
    })
  },

  selectHasChild(e) {
    this.setData({
      hasChild: e.currentTarget.dataset.value
    })
  },

  onChildAgeChange(e) {
    this.setData({
      childAgeIndex: e.detail.value
    })
  },

  nextStep() {
    const { cityIndex, ageIndex, incomeIndex, hasChild, childAgeIndex, cityList, ageList, incomeList, childAgeList } = this.data

    // 保存数据到全局
    app.globalData.calculationData.kyc = {
      city: cityList[cityIndex],
      cityTier: cityList[cityIndex].includes('一线') ? '一线' : '二线',
      age: ageList[ageIndex],
      income: incomeList[incomeIndex],
      hasChild: hasChild,
      childAge: hasChild ? childAgeList[childAgeIndex] : null
    }

    // 跳转到下一页
    wx.navigateTo({
      url: '/pages/fertility/fertility'
    })
  }
})
