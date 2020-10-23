#!/usr/bin/env sh
echo $1
echo '开始'
# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git add -A
git commit -m $1

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
gp

echo '部署成功'