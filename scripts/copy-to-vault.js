// 将构建结果复制到本地 Obsidian 插件目录
const fs = require('fs');
const path = require('path');
const os = require('os');

// 获取构建文件
const sourceDir = path.join(__dirname, '..', 'dist');
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'manifest.json'), 'utf8'));
const pluginId = manifest.id;

// 确定 Obsidian 插件目录
function getObsidianPluginDir() {
  let vaultPath;
  try {
    vaultPath = fs.readFileSync(path.join(__dirname, '..', '.vault-path'), 'utf8').trim();
  } catch (err) {
    // 如果 .vault-path 文件不存在，使用默认路径
    const homeDir = os.homedir();
    if (os.platform() === 'win32') {
      // Windows
      vaultPath = path.join(homeDir, 'AppData', 'Roaming', 'Obsidian', 'Obsidian Help');
    } else if (os.platform() === 'darwin') {
      // macOS
      vaultPath = path.join(homeDir, 'Library', 'Application Support', 'obsidian', 'Obsidian Help');
    } else {
      // Linux 和其他平台
      vaultPath = path.join(homeDir, '.config', 'obsidian', 'Obsidian Help');
    }
  }
  
  return path.join(vaultPath, '.obsidian', 'plugins', pluginId);
}

// 创建目标目录（如果不存在）
const targetDir = getObsidianPluginDir();
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 复制文件
const files = ['main.js', 'manifest.json', 'styles.css'];
files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  
  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✓ 已复制 ${file} 到 ${targetDir}`);
    } else {
      console.log(`✗ 未找到 ${file}，跳过`);
    }
  } catch (err) {
    console.error(`✗ 复制 ${file} 失败:`, err);
  }
});

console.log('🎉 插件已复制到本地 Obsidian 插件目录');
console.log(`➡️ ${targetDir}`);
console.log('📝 提示: 要指定自定义 vault 路径，请在项目根目录创建 .vault-path 文件并写入 vault 路径'); 