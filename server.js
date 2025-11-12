const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8081;
const BUILD_DIR = path.join(__dirname, 'build');

// MIME 类型映射
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.ico': 'image/x-icon',
  '.map': 'application/json'
};

// 获取文件的 MIME 类型
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

// 创建服务器
const server = http.createServer((req, res) => {
  // 解析请求路径
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = filePath.split('?')[0]; // 移除查询参数
  
  // 防止路径遍历攻击
  if (filePath.includes('..')) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  const fullPath = path.join(BUILD_DIR, filePath);
  const mimeType = getMimeType(fullPath);

  // 检查文件是否存在
  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 文件不存在，对于 SPA 应用，返回 index.html
      if (req.method === 'GET' && !filePath.includes('.')) {
        const indexPath = path.join(BUILD_DIR, 'index.html');
        fs.readFile(indexPath, (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
          }
          res.writeHead(200, { 
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          });
          res.end(data);
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
      return;
    }

    // 读取并返回文件
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      // 设置响应头
      const headers = {
        'Content-Type': mimeType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      };

      // 对于 WASM 文件，确保使用正确的 Content-Type
      if (path.extname(fullPath).toLowerCase() === '.wasm') {
        headers['Content-Type'] = 'application/wasm';
      }

      // 设置缓存头（可选）
      if (mimeType.includes('image') || mimeType.includes('font') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
        headers['Cache-Control'] = 'public, max-age=31536000'; // 1年
      }

      res.writeHead(200, headers);
      res.end(data);
    });
  });
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`🚀 服务器已启动`);
  console.log(`📁 服务目录: ${BUILD_DIR}`);
  console.log(`🌐 访问地址: http://localhost:${PORT}`);
  console.log(`📝 按 Ctrl+C 停止服务器`);
});

// 错误处理
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ 端口 ${PORT} 已被占用，请使用其他端口`);
    console.log(`💡 提示: 设置环境变量 PORT 来指定端口，例如: PORT=3000 node server.js`);
  } else {
    console.error('❌ 服务器错误:', err);
  }
  process.exit(1);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 正在关闭服务器...');
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});

