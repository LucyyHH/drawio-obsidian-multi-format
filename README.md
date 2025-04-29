# Draw.io diagram plugin for Obsidian.md

这个插件为 Obsidian 引入了可以包含在笔记中或作为独立文件的图表功能。图表以 SVG 文件形式创建（也支持 .drawio 扩展名）。

![Screenshot](/docs/image/screenshot1.png)

## 使用方法
### 添加/插入新图表

![Insert new diagram](/docs/image/screenshot2.png)

### 编辑现有图表

![Edit existing diagram](/docs/image/screenshot3.png)

## 开发指南

### 安装依赖
```bash
npm install
```

### 构建项目
```bash
npm run build
```

### 开发模式（监视文件变化）
```bash
npm run dev
```

### 本地测试
要将构建好的插件复制到本地 Obsidian 插件目录进行测试：

1. 在项目根目录创建 `.vault-path` 文件，写入您的 Obsidian vault 路径，例如：
   ```
   C:\Users\YourName\Documents\ObsidianVault
   ```

2. 运行以下命令，它会构建插件并自动复制到您的 Obsidian 插件目录：
   ```bash
   npm run test-local
   ```

## GitHub Actions 工作流程

本项目使用 GitHub Actions 进行自动化构建、测试和发布。

### 可用的工作流程

1. **build.yml**: 自动构建和测试
   - 在推送代码到主分支或创建 PR 时触发
   - 构建产物可在 Actions 运行结果页面下载

2. **release.yml**: 发布新版本
   - 在创建新的标签时触发
   - 自动创建 GitHub Release 并上传构建文件

3. **publish.yml**: 发布到 Obsidian 插件市场
   - 手动触发，需要提供版本号和更新说明
   - 自动更新版本号、创建 Release 并提交 PR 到 Obsidian 插件库

### 如何发布新版本

1. 确保代码已准备好发布
2. 进入 GitHub 仓库的 Actions 标签页
3. 选择 "Publish Obsidian Plugin to Community Plugins" 工作流程
4. 点击 "Run workflow"
5. 填写新版本号和更新说明
6. 点击 "Run workflow" 按钮开始执行

### 如何使用构建产物进行测试

1. 在 GitHub 仓库中，转到 Actions 标签页
2. 点击最近一次构建工作流程运行记录
3. 在工作流程运行详情页下方找到 "Artifacts" 部分
4. 下载 "obsidian-plugin-build" 文件
5. 将解压后的文件手动复制到您的 Obsidian 插件目录
   ```
   <您的Vault路径>/.obsidian/plugins/drawio-obsidian/
   ```