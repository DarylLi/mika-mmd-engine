# MIKA MMD TV - 项目功能与技术说明文档

一个基于 Three.js 和 React 的 MMD（MikuMikuDance）3D 动画播放器项目，以圣园未花（Mika）为主角的模拟电视 MMD 动画播放系统。

## 📋 项目简介

MIKA MMD TV 是一个在浏览器中运行的 3D MMD 动画播放器，支持加载 PMX 格式的人物模型、VMD 格式的动作和镜头动画，并提供了丰富的场景、灯光和特效功能。项目采用模块化设计，支持微前端架构，可以轻松集成到其他项目中。

## ✨ 功能特性

### 核心功能
- **MMD 模型加载**：支持 PMX 格式的人物模型加载和渲染
- **动作播放**：支持 VMD 格式的动作和镜头动画播放
- **场景管理**：支持多个场景模型加载，随机场景切换
- **音频同步**：音乐与动作动画精确同步播放
- **随机播放**：支持随机选择人物、动作和场景进行组合播放
- **推荐列表**：内置个人推荐的 MMD 作品组合

### 视觉效果
- **动态光照系统**：支持环境光、方向光、聚光灯等多种光源
- **天空盒渲染**：动态天空效果，支持昼夜自动切换（18点后自动切换为夜晚）
- **雨天特效**：基于 WebGPU 的高性能粒子雨效果
- **轮廓描边**：使用 OutlineEffect 实现模型轮廓描边效果
- **阴影系统**：支持实时阴影渲染

### 交互功能
- **播放控制**：播放、暂停、重播、下一个等功能
- **借物表显示**：显示当前使用的模型、动作、音乐、场景信息
- **推荐选择**：点击推荐列表快速切换不同的 MMD 作品
- **关闭功能**：优雅的资源清理和内存释放

### 性能优化
- **WebWorker 缓存**：使用 WebWorker 进行场景模型加载和缓存
- **资源管理**：完善的资源清理机制，防止内存泄漏
- **代码分割**：Webpack 代码分割，按需加载
- **Ammo.js 物理引擎**：支持物理模拟（可动态重载）

## 🛠 技术栈

### 前端框架
- **React 18.2.0**：UI 框架
- **Vue 3.4.19**：部分组件使用 Vue（支持混合开发）

### 3D 渲染引擎
- **Three.js 0.163.0**：3D 图形渲染核心库
- **MMDLoader**：MMD 模型加载器（支持自定义扩展）
- **MMDAnimationHelper**：MMD 动画辅助工具
- **OrbitControls**：相机轨道控制器
- **OutlineEffect**：轮廓描边效果

### 构建工具
- **Webpack 5.20.0**：模块打包工具
- **Babel**：JavaScript 编译器（支持 React、ES6+）
- **TypeScript 5.4.5**：类型系统支持
- **Sass/SCSS**：CSS 预处理器

### 微前端
- **Qiankun 2.10.16**：微前端框架，支持子应用集成

### WebAssembly
- **WASM 支持**：使用 Rust 编译的 WASM 模块（wasm_ex）
- **@wasmer/sdk**：WASM 运行时支持
- **@wasmer/wasi**：WASI 接口支持

### 其他工具库
- **Axios**：HTTP 请求库
- **TWEEN.js**：动画补间库（已集成但部分功能未启用）
- **lil-gui**：调试 GUI 工具（开发模式）

## 📁 项目结构

```
mikaTV/
├── src/                    # 源代码目录
│   ├── mmd/                # MMD 核心模块
│   │   ├── mika.ts         # 主控制器类
│   │   ├── loader.ts       # 模型和动画加载器
│   │   ├── sceneMain.ts    # 场景管理
│   │   ├── camera.ts       # 相机控制
│   │   ├── renderer.ts     # 渲染器管理
│   │   ├── light.ts        # 光照配置
│   │   ├── rainEffect.ts   # 雨天特效（WebGPU）
│   │   ├── filelists.js    # 资源文件列表
│   │   └── extra/          # 扩展加载器
│   │       ├── mmdExtLoader.js    # MMD 扩展加载器
│   │       ├── mmdSceneLoader.js  # 场景加载器（29K+ 行）
│   │       └── tgaLoader.js       # TGA 纹理加载器
│   ├── mikaTV.jsx          # 主 React 组件
│   ├── app.jsx             # 应用入口
│   ├── mikaQiankun.jsx     # 微前端集成组件
│   ├── pkg/                # WASM 相关文件
│   │   ├── wasm_ex.js
│   │   ├── wasm_ex_bg.wasm
│   │   └── wasm_ex_bg.js
│   └── ...
├── public/                 # 静态资源
│   ├── *.wasm             # WASM 文件
│   ├── mmdList.json       # MMD 资源列表
│   └── mmdWorker.js       # WebWorker 脚本
├── build/                 # 构建输出目录
├── webpack.config.js      # Webpack 配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目依赖配置
```

## 🚀 安装与运行

### 环境要求
- Node.js >= 14.x
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm start
# 或
yarn start
```

开发服务器将在 `http://127.0.0.1:8081` 启动，支持热更新。

### 生产构建

```bash
npm run build
# 或
yarn build
```

构建产物将输出到 `build/` 目录。

## 💻 使用方法
### 启动server在浏览器访问
```bash
npm run serve
# 或
yarn serve
# listen at 8081
```

### 作为 NPM 包使用

1. 安装包：
```bash
npm i 'mika-mmd-tv'
```

2. 在 HTML 中引入 Ammo.js 物理引擎：
```html
<script src="https://threejs.org/examples/jsm/libs/ammo.wasm.js" onload='eval("window.Ammo?.()")'></script>
```

3. 在 React 组件中使用：
```jsx
import { MikaTV } from "mika-mmd-tv"
import { Suspense } from 'react';

function App() {
  const [showMMD, setShowMMD] = useState(false);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MikaTV 
        show={showMMD} 
        onClose={() => setShowMMD(false)} 
      />
    </Suspense>
  );
}
```

## 🔧 主要技术点详解

### 1. MMD 模型加载系统

**技术实现**：
- 使用 Three.js 的 `MMDLoader` 加载 PMX 格式的 3D 模型
- 自定义扩展加载器 `mmdExtLoader.js` 增强功能
- 通过 WebWorker 异步加载场景模型，避免阻塞主线程
- 实现模型缓存机制，提升加载性能

**关键代码位置**：
- `src/mmd/loader.ts` - 主要加载逻辑
- `src/mmd/extra/mmdExtLoader.js` - 扩展加载器
- `src/mmd/extra/mmdSceneLoader.js` - 场景加载器（29K+ 行代码）

**技术亮点**：
- 支持模型材质自定义和着色器修改
- 实现模型资源的动态加载和释放
- 通过 WebWorker 实现场景模型的并行加载和缓存

### 2. 动画系统

**技术实现**：
- 使用 `MMDAnimationHelper` 统一管理动画播放
- 支持 VMD 格式的动作动画（人物动作）
- 支持 VMD 格式的镜头动画（相机运动）
- 实现音频与动画的精确同步

**关键代码位置**：
- `src/mmd/loader.ts` - 动画加载和播放逻辑
- `src/mmd/mika.ts` - 动画控制主类

**技术亮点**：
- 音频时间轴与动画时间轴精确对齐
- 支持动画循环播放和结束回调
- 实现动画的暂停、恢复、重播功能

### 3. 场景管理系统

**技术实现**：
- 动态场景加载和切换机制
- 随机场景选择算法
- 场景光照配置文件（`light.ts`）
- 天空盒和昼夜效果自动切换

**关键代码位置**：
- `src/mmd/sceneMain.ts` - 场景管理主类
- `src/mmd/light.ts` - 光照配置数据

**技术亮点**：
- 根据时间自动切换昼夜效果（18点后切换为夜晚）
- 每个场景可配置独立的光照参数
- 支持场景模型的动态加载和卸载

### 4. WebAssembly 集成

**技术实现**：
- Rust 编译的 WASM 模块
- WASI 接口支持
- 自定义 Webpack loader 处理 WASM 文件
- 浏览器 WASM 运行时集成

**关键代码位置**：
- `src/pkg/wasm_ex.js` - WASM 模块入口
- `src/pkg/wasm_ex_bg.wasm` - 编译后的 WASM 文件
- `webpack.config.js` - WASM loader 配置

**技术亮点**：
- 使用 Rust 编写高性能计算模块
- 支持 WASI 标准接口
- 实现 WASM 模块的动态加载

### 5. 性能监控与埋点

**技术实现**：
- WebGL 渲染器信息收集
- 设备信息埋点（显卡型号、渲染器类型）
- 性能数据上报到服务器
- 客户端性能状态监控

**关键代码位置**：
- `src/mikaTV.jsx` - 设备信息收集和上报

**技术亮点**：
- 自动检测用户硬件信息
- 实现性能数据的远程收集
- 支持性能问题的诊断和分析

## ⚠️ 注意事项

2. **浏览器兼容性**：需要支持 WebGL 2.0 或 WebGPU 的现代浏览器
3. **性能要求**：建议使用独立显卡，集成显卡可能影响渲染性能
4. **内存占用**：大量模型和动画可能占用较多内存，建议定期清理
5. **版权声明**：所有人物模型、舞蹈动作均为他人开源创作资源，仅供个人娱乐展示，不提供商业用途

---

**kira~⭐** 希望这个项目能给大家带来快乐！

mmd update logs:

2024/12/10: new bones, new material updating wip.

before:


https://github.com/user-attachments/assets/66b1a0dd-aa07-43c6-b3c7-017dc1a40bc1




after:



https://github.com/user-attachments/assets/6a99edf3-5404-41b7-b528-58aa6304ffe3

