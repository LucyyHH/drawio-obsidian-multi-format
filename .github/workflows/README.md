# GitHub Actions 工作流程

本文档描述了此插件使用的 GitHub Actions 工作流程。

## 工作流程文件

1. **build.yml**: 自动构建和测试
2. **release.yml**: 发布新版本
3. **publish.yml**: 发布到 Obsidian 插件市场

## 各工作流程说明

### build.yml

每当代码推送到主分支或创建针对主分支的 Pull Request 时，此工作流程会自动执行。

功能:
- 检出代码（包括子模块）
- 安装依赖
- 构建插件
- 运行自动化测试

### release.yml

当创建新的标签（tag）时，此工作流程会自动执行。

功能:
- 检出代码（包括子模块）
- 安装依赖
- 构建插件
- 创建 GitHub Release
- 上传构建的文件作为 Release 资产

### publish.yml

此工作流程需要手动触发，用于发布新版本到 Obsidian 插件市场。

功能:
- 更新 manifest.json 和 package.json 中的版本号
- 更新 versions.json 文件
- 构建插件
- 创建 GitHub Release
- 为 Obsidian 社区插件库创建 Pull Request

## 使用说明

### 发布新版本

1. 确保代码已准备好发布
2. 进入 GitHub 仓库的 Actions 标签页
3. 选择 "Publish Obsidian Plugin to Community Plugins" 工作流程
4. 点击 "Run workflow"
5. 填写新版本号和更新说明
6. 点击 "Run workflow" 按钮开始执行

### 所需 Secrets

- `GITHUB_TOKEN`: 自动提供，用于创建 Release 和 PR
- `PLUGIN_PR_TOKEN`: 需手动添加，用于向 Obsidian 社区插件库提交 PR

## 配置 PLUGIN_PR_TOKEN

1. 创建具有足够权限的 GitHub 个人访问令牌
2. 在仓库的 Settings > Secrets > Actions 中添加名为 PLUGIN_PR_TOKEN 的 secret

## 注意事项

- release.yml 在创建新标签时自动触发，无需手动操作
- publish.yml 将创建标签并更新版本文件，请确保提供正确的版本号 