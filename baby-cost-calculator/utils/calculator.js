// utils/calculator.js
// 成本计算引擎

// 教育成本配置（单位：元/年）
const EDU_COST = {
  kindergarten: {
    '公立': { tuition: 36000, extra: 0 },  // 3千/月 * 12月
    '私立': { tuition: 96000, extra: 0 },  // 8千/月 * 12月
    '国际': { tuition: 180000, extra: 0 }  // 1.5万/月 * 12月
  },
  primary: {
    '公立': { tuition: 2000, extra: 0 },
    '私立': { tuition: 30000, extra: 0 },
    '国际': { tuition: 200000, extra: 0 }
  },
  middle: {
    '公立': { tuition: 2000, extra: 0 },
    '私立': { tuition: 50000, extra: 0 },
    '国际': { tuition: 250000, extra: 0 }
  },
  high: {
    '公立': { tuition: 2000, extra: 0 },
    '私立': { tuition: 80000, extra: 0 },
    '国际': { tuition: 300000, extra: 0 }
  },
  college: {
    '本科': { tuition: 25000, living: 30000 },
    '研究生': { tuition: 30000, living: 35000 },
    '博士': { tuition: 35000, living: 40000 }
  }
}

// 课外班成本（单位：元/月）
const EXTRA_COST = {
  '极简': 500,
  '基本': 2000,
  '舒适': 5000,
  '富裕': 10000,
  '奢侈': 20000
}

// 生活成本（单位：元/月/人）
const LIFE_COST = {
  '极简': 2000,
  '基本': 3500,
  '舒适': 5000,
  '富裕': 8000,
  '奢侈': 15000
}

// 城市系数
const CITY_MULTIPLIER = {
  '一线': 1.5,
  '二线': 1.0
}

// 生育成本（单位：元）
const BIRTH_COST = {
  pregnancy: 8000,    // 孕期
  delivery: 15000,    // 生产
  confinement: 12000, // 月子
  infant: 36000       // 0-1岁婴儿用品
}

// 育儿嫂成本（单位：元/月）
const NANNY_COST = 10000

/**
 * 计算单个孩子的总成本
 */
function calculateSingleChildCost(data) {
  const { kyc, education, lifestyle } = data
  const cityMultiplier = CITY_MULTIPLIER[kyc.cityTier]
  
  let totalCost = 0
  let breakdown = {
    birth: 0,
    infant: 0,
    kindergarten: 0,
    primary: 0,
    middle: 0,
    high: 0,
    college: 0,
    living: 0,
    extra: 0
  }

  // 1. 生育成本
  breakdown.birth = BIRTH_COST.pregnancy + BIRTH_COST.delivery + BIRTH_COST.confinement + BIRTH_COST.infant
  totalCost += breakdown.birth

  // 2. 0-3岁（育儿嫂+婴幼儿生活费）
  if (lifestyle.needNanny) {
    breakdown.infant += NANNY_COST * 12 * lifestyle.nannyYears
  }
  breakdown.infant += LIFE_COST[lifestyle.lifeLevel] * 12 * 3 * cityMultiplier
  totalCost += breakdown.infant

  // 3. 幼儿园（3-6岁，3年）
  const kCost = EDU_COST.kindergarten[education.kindergartenType]
  breakdown.kindergarten = kCost.tuition * 3 * cityMultiplier
  breakdown.extra += EXTRA_COST[education.extraLevel] * 12 * 3 * cityMultiplier
  totalCost += breakdown.kindergarten

  // 4. 小学（6-12岁，6年）
  const pCost = EDU_COST.primary[education.primaryType]
  breakdown.primary = pCost.tuition * 6 * cityMultiplier
  breakdown.extra += EXTRA_COST[education.extraLevel] * 12 * 6 * cityMultiplier
  totalCost += breakdown.primary

  // 5. 初中（12-15岁，3年）
  const mCost = EDU_COST.middle[education.middleType]
  breakdown.middle = mCost.tuition * 3 * cityMultiplier
  breakdown.extra += EXTRA_COST[education.extraLevel] * 12 * 3 * cityMultiplier
  totalCost += breakdown.middle

  // 6. 高中（15-18岁，3年）
  const hCost = EDU_COST.high[education.highType]
  breakdown.high = hCost.tuition * 3 * cityMultiplier
  breakdown.extra += EXTRA_COST[education.extraLevel] * 12 * 3 * cityMultiplier
  totalCost += breakdown.high

  // 7. 大学（18-22岁，4年）+ 研究生/博士
  let collegeYears = 4
  if (education.eduTarget === '研究生') {
    collegeYears = 7 // 本科4年+研究生3年
  } else if (education.eduTarget === '博士') {
    collegeYears = 10 // 本科4年+研究生3年+博士3年
  }
  
  const cCost = EDU_COST.college[education.eduTarget]
  breakdown.college = (cCost.tuition + cCost.living) * collegeYears
  totalCost += breakdown.college

  // 8. 基础生活费（3-18岁，15年）
  breakdown.living = LIFE_COST[lifestyle.lifeLevel] * 12 * 15 * cityMultiplier
  totalCost += breakdown.living

  // 9. 课外班总计
  totalCost += breakdown.extra

  return {
    total: Math.round(totalCost),
    breakdown: breakdown,
    years: 22 + (education.eduTarget === '研究生' ? 3 : education.eduTarget === '博士' ? 6 : 0)
  }
}

/**
 * 计算年度花费曲线
 */
function calculateYearlyCost(data) {
  const { kyc, education, lifestyle } = data
  const cityMultiplier = CITY_MULTIPLIER[kyc.cityTier]
  
  const stages = [
    { name: '0-3岁', years: 3, avgCost: (LIFE_COST[lifestyle.lifeLevel] * 12 + (lifestyle.needNanny ? NANNY_COST * 12 : 0)) * cityMultiplier },
    { name: '幼儿园', years: 3, avgCost: (EDU_COST.kindergarten[education.kindergartenType].tuition + EXTRA_COST[education.extraLevel] * 12 + LIFE_COST[lifestyle.lifeLevel] * 12) * cityMultiplier },
    { name: '小学', years: 6, avgCost: (EDU_COST.primary[education.primaryType].tuition + EXTRA_COST[education.extraLevel] * 12 + LIFE_COST[lifestyle.lifeLevel] * 12) * cityMultiplier },
    { name: '初中', years: 3, avgCost: (EDU_COST.middle[education.middleType].tuition + EXTRA_COST[education.extraLevel] * 12 + LIFE_COST[lifestyle.lifeLevel] * 12) * cityMultiplier },
    { name: '高中', years: 3, avgCost: (EDU_COST.high[education.highType].tuition + EXTRA_COST[education.extraLevel] * 12 + LIFE_COST[lifestyle.lifeLevel] * 12) * cityMultiplier },
    { name: '大学', years: 4, avgCost: EDU_COST.college[education.eduTarget].tuition + EDU_COST.college[education.eduTarget].living }
  ]

  return stages.map(stage => ({
    ...stage,
    avgCost: Math.round(stage.avgCost)
  }))
}

/**
 * 生成父母画像
 */
function generateParentProfile(data) {
  const { quiz, education, lifestyle } = data
  
  const styleMap = {
    '佛系': {
      title: '佛系养娃派',
      desc: '相信孩子的自然成长，不过度干预',
      icon: '😌'
    },
    '鸡娃': {
      title: '精英培养派',
      desc: '追求卓越教育，全方位规划',
      icon: '📚'
    },
    '平衡': {
      title: '快乐成长派',
      desc: '注重身心平衡，快乐与学习并重',
      icon: '⚖️'
    }
  }

  return styleMap[quiz.style] || styleMap['平衡']
}

/**
 * 主计算函数
 */
function calculate(data) {
  const childCount = data.fertility.childCount
  const singleCost = calculateSingleChildCost(data)
  const yearlyCost = calculateYearlyCost(data)
  const parentProfile = generateParentProfile(data)

  return {
    totalCost: singleCost.total * childCount,
    singleChildCost: singleCost.total,
    childCount: childCount,
    breakdown: singleCost.breakdown,
    yearlyCost: yearlyCost,
    totalYears: singleCost.years,
    parentProfile: parentProfile,
    cityTier: data.kyc.cityTier
  }
}

module.exports = {
  calculate
}
