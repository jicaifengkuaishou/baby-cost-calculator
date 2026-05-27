// pages/quiz/quiz.js
const app = getApp()

Page({
  data: {
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: ''
  },

  selectAnswer1(e) {
    this.setData({
      answer1: e.currentTarget.dataset.value
    })
  },

  selectAnswer2(e) {
    this.setData({
      answer2: e.currentTarget.dataset.value
    })
  },

  onAnswer3Input(e) {
    this.setData({
      answer3: e.detail.value
    })
  },

  selectAnswer4(e) {
    this.setData({
      answer4: e.currentTarget.dataset.value
    })
  },

  prevStep() {
    wx.navigateBack()
  },

  nextStep() {
    const { answer1, answer2, answer3, answer4 } = this.data

    // 保存问答数据
    app.globalData.calculationData.quiz = {
      trait: answer1,
      career: answer2,
      message: answer3,
      style: answer4
    }

    // 跳转到结果页面
    wx.redirectTo({
      url: '/pages/result/result'
    })
  }
})
