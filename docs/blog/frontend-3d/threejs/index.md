# Three.js

Three.js 是最流行的WebGL 3D库，提供了简洁易用的API来创建和显示3D图形内容。

## 概述

Three.js 由Ricardo Cabello（Mr.doob）创建，是一个轻量级的跨浏览器JavaScript库，使用WebGL底层API来创建和显示3D图形。

## 核心特性

### 🎨 渲染引擎
- **WebGL Renderer** - 高性能WebGL渲染器
- **Canvas Renderer** - Canvas 2D降级渲染
- **SVG Renderer** - SVG矢量渲染
- **CSS3D Renderer** - CSS3 3D变换渲染

### 📐 几何体系统
- 内置基础几何体（立方体、球体、圆柱体等）
- 复杂几何体（Text、Extrude、Lathe等）
- 自定义几何体支持
- 几何体合并和优化

### 🖼️ 材质系统
- **基础材质** - 纯色材质
- **Lambert材质** - 漫反射材质
- **Phong材质** - 高光反射材质
- **Standard材质** - 物理渲染材质
- **Shader材质** - 自定义着色器

### 💡 光照系统
- 环境光（AmbientLight）
- 方向光（DirectionalLight）
- 点光源（PointLight）
- 聚光灯（SpotLight）
- 区域光（AreaLight）
- 阴影支持

### 📦 对象系统
- **Scene** - 场景管理
- **Camera** - 相机控制（透视、正交）
- **Mesh** - 网格对象
- **Group** - 对象分组
- **Object3D** - 3D对象基类

## 快速开始

### 安装
```bash
npm install three
```

### 基础场景
```javascript
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```

## 主要组件详解

### 1. 场景管理
```javascript
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // 设置背景色
scene.fog = new THREE.Fog(0xffffff, 1, 100); // 添加雾效

// 添加对象到场景
scene.add(mesh);
scene.remove(mesh);
```

### 2. 相机控制
```javascript
// 透视相机
const camera = new THREE.PerspectiveCamera(
  75, // 视野角度
  aspect, // 宽高比
  0.1, // 近裁剪面
  1000 // 远裁剪面
);

// 正交相机
const camera = new THREE.OrthographicCamera(
  left, right, top, bottom, near, far
);
```

### 3. 几何体创建
```javascript
// 基础几何体
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);

// 复杂几何体
const textGeometry = new THREE.TextGeometry('Hello', {
  font: font,
  size: 80,
  height: 5
});

// 从外部加载
const loader = new THREE.GLTFLoader();
loader.load('model.gltf', (gltf) => {
  scene.add(gltf.scene);
});
```

### 4. 材质应用
```javascript
// 基础材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  map: texture
});

// 物理材质
const standardMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  metalness: 0.5,
  roughness: 0.3,
  normalMap: normalTexture
});

// 自定义着色器
const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 }
  },
  vertexShader: vertexShaderCode,
  fragmentShader: fragmentShaderCode
});
```

## 加载器系统

### 模型加载器
```javascript
// GLTF/GLB加载器
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load('model.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
});

// OBJ加载器
const objLoader = new THREE.OBJLoader();
objLoader.load('model.obj', (object) => {
  scene.add(object);
});

// FBX加载器
const fbxLoader = new THREE.FBXLoader();
fbxLoader.load('model.fbx', (object) => {
  scene.add(object);
});
```

### 纹理加载器
```javascript
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('texture.jpg', () => {
  // 加载完成回调
}, undefined, (error) => {
  // 加载错误回调
});

// 环境贴图
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envMap = cubeTextureLoader.load([
  'px.jpg', 'nx.jpg',
  'py.jpg', 'ny.jpg',
  'pz.jpg', 'nz.jpg'
]);
scene.environment = envMap;
```

## 控制器

### OrbitControls
```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
```

### 其他控制器
- **FlyControls** - 飞行控制
- **FirstPersonControls** - 第一人称控制
- **PointerLockControls** - 指针锁定控制
- **TransformControls** - 变换控制

## 性能优化

### 几何体优化
```javascript
// 合并几何体
const geometries = [];
// ... 添加几何体
const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);

// 实例化渲染
const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
for (let i = 0; i < count; i++) {
  matrix.setPosition(x, y, z);
  instancedMesh.setMatrixAt(i, matrix);
}
instancedMesh.instanceMatrix.needsUpdate = true;
```

### 纹理优化
```javascript
// 压缩纹理
const compressedTexture = textureLoader.load('texture.jpg');
compressedTexture.minFilter = THREE.LinearMipmapLinearFilter;
compressedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

// 纹理图集
const textureAtlas = new THREE.TextureLoader().load('atlas.png');
material.map = textureAtlas;
```

### 渲染优化
```javascript
// LOD（细节层次）
const lod = new THREE.LOD();
lod.addLevel(highDetailMesh, 0);
lod.addLevel(mediumDetailMesh, 50);
lod.addLevel(lowDetailMesh, 100);
scene.add(lod);

// 遮挡剔除
renderer.autoClear = false;
renderer.setClearAlpha(0);
```

## 常用插件和扩展

### React Three Fiber
```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}
```

### Drei 工具库
```javascript
import { Text, Box, Environment } from '@react-three/drei';

// 3D文本
<Text color="black" anchorX="center" anchorY="middle">
  Hello Three.js
</Text>

// 环境贴图
<Environment preset="city" />
```

## 调试工具

### Spector.js
浏览器扩展，用于调试WebGL渲染：
- 查看Draw Call
- 分析性能瓶颈
- 检查着色器

### Stats.js
性能监控面板：
```javascript
import Stats from 'three/examples/jsm/libs/stats.module.js';
const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
  requestAnimationFrame(animate);
  stats.begin();
  renderer.render(scene, camera);
  stats.end();
}
```

## 最佳实践

### 1. 资源管理
- 及时释放几何体和材质
- 使用对象池减少GC压力
- 合理设置纹理尺寸和格式

### 2. 渲染优化
- 减少不必要的渲染调用
- 使用实例化渲染大量相似对象
- 合理使用LOD技术

### 3. 用户体验
- 提供加载进度指示
- 优化移动端性能
- 实现响应式设计

### 4. 错误处理
- 捕获WebGL上下文丢失
- 提供降级渲染方案
- 监听资源加载错误

## 学习资源

### 官方资源
- [Three.js官网](https://threejs.org/)
- [官方文档](https://threejs.org/docs/)
- [官方示例](https://threejs.org/examples/)

### 教程课程
- [Three.js Journey](https://threejs-journey.com/)
- [WebGL Fundamentals](https://webglfundamentals.org/)

### 社区资源
- [Discord社区](https://discord.gg/56GBJwAnUS)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/three.js)

Three.js 的强大功能和活跃社区使其成为前端3D开发的首选库，无论是创意项目还是商业应用都能找到合适的解决方案。