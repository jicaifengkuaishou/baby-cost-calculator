// 游戏数据
const gameData = {
  city: '',
  cityMultiplier: 1.0,
  age: 25,
  lifestyle: '',
  lifeCost: 0,
  duration: 0,
  wealth: 0,
  wealthLevel: ''
};

// 趣味小知识
const funFacts = [
  "💡 躺平小知识：日本有3000万人选择极简生活",
  "💡 躺平小知识：北欧国家平均每天工作6小时",
  "💡 躺平小知识：全球有2%的人实现了财务自由",
  "💡 躺平小知识：中国古代有很多「归隐田园」的诗人",
  "💡 躺平小知识：躺平≠懒惰，而是一种生活态度"
];

// 开始游戏
function startGame() {
  hideScreen('intro-screen');
  showScreen('level-1');
}

// 关卡1：选择城市
function selectCity(city, multiplier) {
  gameData.city = city;
  gameData.cityMultiplier = multiplier;
  
  // 震动反馈（如果支持）
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  
  setTimeout(() => {
    hideScreen('level-1');
    showScreen('level-2');
  }, 300);
}

// 关卡2：更新年龄
function updateAge(age) {
  gameData.age = parseInt(age);
  document.getElementById('age-value').textContent = age;
  
  // 根据年龄更新状态
  const statusEmoji = document.querySelector('.status-emoji');
  const statusText = document.querySelector('.status-text');
  
  if (age < 25) {
    statusEmoji.textContent = '🔥';
    statusText.textContent = '青春无敌，躺平难度MAX！';
  } else if (age < 30) {
    statusEmoji.textContent = '💪';
    statusText.textContent = '正是奋斗好年华...或者躺？';
  } else if (age < 40) {
    statusEmoji.textContent = '🤔';
    statusText.textContent = '上有老下有小，躺平需勇气';
  } else if (age < 50) {
    statusEmoji.textContent = '😌';
    statusText.textContent = '看淡浮华，躺平正当时';
  } else {
    statusEmoji.textContent = '🧘';
    statusText.textContent = '人生导师，躺平大师级';
  }
}

// 下一关
function nextLevel(current) {
  hideScreen(`level-${current}`);
  showScreen(`level-${current + 1}`);
}

// 关卡3：选择生活方式
function selectLifestyle(lifestyle, cost) {
  gameData.lifestyle = lifestyle;
  gameData.lifeCost = cost;
  
  setTimeout(() => {
    hideScreen('level-3');
    showScreen('level-4');
  }, 300);
}

// 关卡4：选择时长
function selectDuration(years) {
  gameData.duration = years;
  
  setTimeout(() => {
    hideScreen('level-4');
    showScreen('level-5');
  }, 300);
}

// 关卡5：选择财富
function selectWealth(level, amount) {
  gameData.wealthLevel = level;
  gameData.wealth = amount;
  
  // 开始计算
  setTimeout(() => {
    hideScreen('level-5');
    showScreen('calculating');
    startCalculating();
  }, 300);
}

// 计算动画
function startCalculating() {
  let factIndex = 0;
  const factElement = document.getElementById('fun-fact');
  
  // 切换趣味小知识
  const factInterval = setInterval(() => {
    factElement.style.opacity = '0';
    setTimeout(() => {
      factIndex = (factIndex + 1) % funFacts.length;
      factElement.textContent = funFacts[factIndex];
      factElement.style.opacity = '1';
    }, 300);
  }, 2000);
  
  // 3秒后显示结果
  setTimeout(() => {
    clearInterval(factInterval);
    calculateResult();
    hideScreen('calculating');
    showScreen('result');
  }, 3000);
}

// 计算结果
function calculateResult() {
  // 基础生活成本
  const monthlyLife = gameData.lifeCost;
  
  // 租房成本（根据城市和生活方式）
  const rentMap = {
    '极简': { '一线': 2000, '新一线': 1500, '二线': 1000, '小城': 600 },
    '舒适': { '一线': 3500, '新一线': 2500, '二线': 1800, '小城': 1000 },
    '小资': { '一线': 5000, '新一线': 3500, '二线': 2500, '小城': 1500 },
    '养老': { '一线': 2500, '新一线': 1800, '二线': 1200, '小城': 800 }
  };
  
  const monthlyRent = rentMap[gameData.lifestyle][gameData.city] * gameData.cityMultiplier;
  
  // 娱乐消遣（生活成本的30%）
  const monthlyFun = monthlyLife * 0.3;
  
  // 医疗储备（每年5000元）
  const annualMedical = 5000;
  
  // 总月度成本
  const monthlyTotal = monthlyLife + monthlyRent + monthlyFun;
  
  // 总年度成本
  const annualTotal = monthlyTotal * 12 + annualMedical;
  
  // 躺平总成本
  const totalCost = annualTotal * gameData.duration;
  
  // 各项分解
  const rentCost = monthlyRent * 12 * gameData.duration;
  const lifeCost = monthlyLife * 12 * gameData.duration;
  const funCost = monthlyFun * 12 * gameData.duration;
  const medicalCost = annualMedical * gameData.duration;
  
  // 更新页面
  document.getElementById('total-cost').textContent = `¥${formatMoney(totalCost)}`;
  document.getElementById('cost-subtitle').textContent = `躺平${gameData.duration}年需要这些钱`;
  
  document.getElementById('rent-cost').textContent = `¥${formatMoney(rentCost)}`;
  document.getElementById('life-cost').textContent = `¥${formatMoney(lifeCost)}`;
  document.getElementById('fun-cost').textContent = `¥${formatMoney(funCost)}`;
  document.getElementById('medical-cost').textContent = `¥${formatMoney(medicalCost)}`;
  
  // 现实检验
  document.getElementById('current-wealth').textContent = `¥${formatMoney(gameData.wealth)}`;
  document.getElementById('target-cost').textContent = `¥${formatMoney(totalCost)}`;
  
  const gap = totalCost - gameData.wealth;
  const gapElement = document.getElementById('gap-amount');
  const gapTextElement = document.getElementById('gap-text');
  
  if (gap > 0) {
    gapTextElement.textContent = '距离躺平还差：';
    gapElement.textContent = `¥${formatMoney(gap)}`;
    gapElement.style.color = '#e17055';
  } else {
    gapTextElement.textContent = '恭喜！已达成躺平目标，还剩：';
    gapElement.textContent = `¥${formatMoney(Math.abs(gap))}`;
    gapElement.style.color = '#00b894';
  }
  
  // 躺平等级
  const levelData = getLevelData(gap, totalCost);
  document.querySelector('.level-emoji').textContent = levelData.emoji;
  document.querySelector('.level-name').textContent = levelData.name;
  
  // 建议
  generateAdvice(gap, totalCost);
  
  // 趣味对比
  document.getElementById('burger-compare').textContent = `= ${Math.floor(totalCost / 30)}个汉堡`;
  document.getElementById('movie-compare').textContent = `= ${Math.floor(totalCost / 50)}场电影`;
  document.getElementById('coffee-compare').textContent = `= ${Math.floor(totalCost / 35)}杯咖啡`;
}

// 获取躺平等级
function getLevelData(gap, total) {
  const percentage = (gap / total) * 100;
  
  if (gap <= 0) {
    return { emoji: '🏆', name: '钻石躺平王' };
  } else if (percentage < 20) {
    return { emoji: '💎', name: '铂金躺平侠' };
  } else if (percentage < 50) {
    return { emoji: '🥇', name: '黄金躺平师' };
  } else if (percentage < 80) {
    return { emoji: '🥈', name: '白银躺平者' };
  } else {
    return { emoji: '🥉', name: '青铜躺平员' };
  }
}

// 生成建议
function generateAdvice(gap, total) {
  const adviceList = document.getElementById('advice-list');
  adviceList.innerHTML = '';
  
  const advices = [];
  
  if (gap > 0) {
    const monthsNeeded = Math.ceil(gap / 5000);
    advices.push({
      emoji: '💼',
      text: `如果每月存5000元，还需要${monthsNeeded}个月（约${Math.ceil(monthsNeeded/12)}年）`
    });
    
    if (gameData.city === '一线') {
      advices.push({
        emoji: '🏃',
        text: '考虑搬到二线城市，可以节省40%的成本'
      });
    }
    
    if (gameData.lifestyle === '小资') {
      advices.push({
        emoji: '✂️',
        text: '降低生活档位到「舒适」，每年可省10万+'
      });
    }
    
    if (gameData.duration > 20) {
      advices.push({
        emoji: '⏰',
        text: '躺平时间太长了！先躺10年试试？'
      });
    }
  } else {
    advices.push({
      emoji: '🎉',
      text: '恭喜！你已经达成躺平条件，随时可以开始！'
    });
    
    advices.push({
      emoji: '💰',
      text: '建议将资金投入低风险理财，让钱生钱'
    });
    
    advices.push({
      emoji: '🎯',
      text: '躺平不等于躺废，保持适度学习和社交'
    });
  }
  
  advices.forEach(advice => {
    const item = document.createElement('div');
    item.className = 'advice-item';
    item.innerHTML = `
      <div class="advice-emoji">${advice.emoji}</div>
      <div class="advice-text">${advice.text}</div>
    `;
    adviceList.appendChild(item);
  });
}

// 格式化金额
function formatMoney(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toLocaleString();
}

// 分享结果
function shareResult() {
  const totalCost = document.getElementById('total-cost').textContent;
  const level = document.querySelector('.level-name').textContent;
  
  const text = `我测了躺平成本：${totalCost}，获得「${level}」称号！你离躺平还有多远？`;
  
  if (navigator.share) {
    navigator.share({
      title: '躺平成本计算器',
      text: text,
      url: window.location.href
    }).catch(() => {});
  } else {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text + '\n' + window.location.href).then(() => {
        alert('结果已复制到剪贴板！');
      });
    } else {
      alert('分享功能需要在移动设备上使用');
    }
  }
}

// 重新开始
function restart() {
  // 重置数据
  gameData.city = '';
  gameData.cityMultiplier = 1.0;
  gameData.age = 25;
  gameData.lifestyle = '';
  gameData.lifeCost = 0;
  gameData.duration = 0;
  gameData.wealth = 0;
  gameData.wealthLevel = '';
  
  // 重置年龄滑块
  document.getElementById('age-slider').value = 25;
  document.getElementById('age-value').textContent = '25';
  
  // 返回首页
  hideScreen('result');
  showScreen('intro-screen');
}

// 屏幕切换辅助函数
function showScreen(id) {
  document.getElementById(id).classList.add('active');
}

function hideScreen(id) {
  document.getElementById(id).classList.remove('active');
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  // 预加载趣味小知识
  console.log('躺平游戏已加载！');
});
