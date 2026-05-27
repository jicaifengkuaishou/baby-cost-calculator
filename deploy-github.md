# 使用 GitHub Pages 部署教程

## 步骤一：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库（例如：baby-cost-calculator）
3. 设置为 Public

## 步骤二：上传文件

在终端执行：

```bash
cd /Users/jicaifeng/.codeflicker/workshop
git init
git add index.html
git commit -m "Initial commit: Baby cost calculator"
git branch -M main
git remote add origin https://github.com/你的用户名/baby-cost-calculator.git
git push -u origin main
```

## 步骤三：开启 GitHub Pages

1. 进入仓库 Settings
2. 找到 Pages 选项
3. Source 选择 "main" 分支
4. 点击 Save

等待 2-3 分钟后，访问：
`https://你的用户名.github.io/baby-cost-calculator/index.html`

这就是你的外部访问链接！
