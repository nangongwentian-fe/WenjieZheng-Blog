# Babylon.js

Babylon.js 是微软开源的实时3D渲染引擎，为Web平台提供了完整的3D游戏开发和可视化解决方案。

## 概述

Babylon.js 由David Catuhe创建，是一个功能强大的JavaScript 3D引擎，专注于游戏开发、数据可视化和复杂3D应用。它提供了丰富的API和工具链，支持从简单场景到复杂游戏的开发需求。

## 核心特性

### 🎮 游戏引擎功能
- 完整的场景图系统
- 物理引擎集成
- 动画系统
- 粒子系统
- 音频引擎

### 🎨 渲染管线
- PBR（物理渲染）材质系统
- 后处理效果
- 阴影和反射
- 全局光照
- GPU实例化

### 🛠️ 开发工具
- Babylon.js Playground - 在线编辑器
- Babylon.js Inspector - 场景调试工具
- Babylon.js GUI - UI系统
- Node Material Editor - 可视化着色器编辑

### 🔧 高级特性
- WebXR支持
- 多线程渲染（Web Workers）
- 物理引擎集成（Cannon.js、Havok）
- AI集成（行为系统）

## 快速开始

### 安装
```bash
npm install @babylonjs/core
npm install @babylonjs/loaders
```

### 基础场景
```javascript
import { Engine, Scene, UniversalCamera, HemisphericLight, MeshBuilder } from '@babylonjs/core';

// 创建引擎
const canvas = document.getElementById('renderCanvas');
const engine = new Engine(canvas, true);

// 创建场景
const scene = new Scene(engine);

// 创建相机
const camera = new UniversalCamera('camera', new Vector3(0, 5, -10), scene);
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);

// 创建光源
const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

// 创建立方体
const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);

// 渲染循环
engine.runRenderLoop(() => {
  scene.render();
});

// 响应式调整
window.addEventListener('resize', () => {
  engine.resize();
});
```

## 场景管理

### 场景组件
```javascript
const scene = new Scene(engine);

// 场景背景
scene.clearColor = new Color4(0, 0, 0, 1);
scene.createDefaultEnvironment();

// 重力和碰撞
scene.gravity = new Vector3(0, -9.81, 0);
scene.collisionsEnabled = true;
```

### 相机系统
```javascript
// 通用相机
const camera = new UniversalCamera('camera', position, scene);

// 弧球相机
const arcCamera = new ArcRotateCamera('arcCamera', alpha, beta, radius, target, scene);

// 自由相机
const freeCamera = new FreeCamera('freeCamera', position, scene);

// 相机配置
camera.speed = 0.5;
camera.inertia = 0.3;
camera.angularSensibility = 1000;
camera.applyGravity = true;
camera.checkCollisions = true;
```

## 光照系统

### 光源类型
```javascript
// 半球光
const hemisphericLight = new HemisphericLight('hemiLight', position, scene);

// 方向光
const directionalLight = new DirectionalLight('dirLight', direction, scene);
directionalLight.position = position;

// 点光源
const pointLight = new PointLight('pointLight', position, scene);
pointLight.intensity = 0.5;
pointLight.range = 100;

// 聚光灯
const spotLight = new SpotLight('spotLight', position, direction, angle, exponent, scene);
```

### 阴影
```javascript
// 阴影生成器
const shadowGenerator = new ShadowGenerator(1024, light);
shadowGenerator.addShadowCaster(mesh);
shadowGenerator.useExponentialShadowMap = true;

// 接收阴影
mesh.receiveShadows = true;
```

## 材质系统

### 标准材质
```javascript
// PBR材质
const pbrMaterial = new PBRMaterial('pbr', scene);
pbrMaterial.albedoColor = new Color3(1, 0, 0);
pbrMaterial.metallic = 0.5;
pbrMaterial.roughness = 0.3;
pbrMaterial.emissiveColor = new Color3(0, 0.5, 0);

// 纹理
pbrMaterial.albedoTexture = new Texture('texture.jpg', scene);
pbrMaterial.normalTexture = new Texture('normal.jpg', scene);
pbrMaterial.metallicTexture = new Texture('metallic.jpg', scene);

mesh.material = pbrMaterial;
```

### 节点材质
```javascript
// 可视化创建材质或通过代码
const nodeMaterial = new NodeMaterial('nodeMaterial', scene);
nodeMaterial.setToDefault();

// 添加节点块
const positionBlock = new PositionBlock('position');
const colorBlock = new ColorBlock('color');
nodeMaterial.addOutputNode(colorBlock);

mesh.material = nodeMaterial;
```

## 动画系统

### 基础动画
```javascript
// 动画组
const animationGroup = new AnimationGroup('animationGroup');

// 位置动画
const positionAnimation = Animation.CreateAndStartAnimation(
  'positionAnimation',
  box,
  'position',
  30, // fps
  60,  // 帧数
  box.position,
  new Vector3(0, 5, 0),
  Animation.ANIMATIONLOOPMODE_CYCLE
);

// 旋转动画
Animation.CreateAndStartAnimation(
  'rotationAnimation',
  box,
  'rotation',
  30,
  60,
  box.rotation,
  new Vector3(0, Math.PI * 2, 0),
  Animation.ANIMATIONLOOPMODE_CYCLE
);
```

### 骨骼动画
```javascript
// 从模型加载
SceneLoader.ImportMesh('', 'models/', 'character.glb', scene, (meshes, particleSystems, skeletons) => {
  const skeleton = skeletons[0];

  // 开始动画
  scene.beginAnimation(skeleton, 0, 100, true);
});

// 手动创建骨骼动画
const skeleton = new Skeleton('skeleton', scene);
const bone = new Bone('bone', skeleton, null, length, orientation);
```

## 物理引擎

### Cannon.js集成
```javascript
import '@babylonjs/core/Physics/physicsEngineComponent';

// 启用物理引擎
scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin());

// 创建物理体
const ground = MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, {
  mass: 0,
  restitution: 0.7
});

const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, {
  mass: 1,
  restitution: 0.9
});
```

### 物理材质
```javascript
const physicsMaterial = new PhysicsMaterial('physicsMaterial');
physicsMaterial.friction = 0.2;
physicsMaterial.restitution = 0.7;

ground.physicsImpostor.physicsMaterial = physicsMaterial;
sphere.physicsImpostor.physicsMaterial = physicsMaterial;
```

## 粒子系统

### 基础粒子
```javascript
const particleSystem = new ParticleSystem('particles', 2000, scene);

// 纹理
particleSystem.particleTexture = new Texture('flare.png', scene);

// 发射器
particleSystem.emitter = box;

// 颜色
particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
particleSystem.color2 = new Color4(0.2, 0.5, 1.0, 1.0);
particleSystem.colorDead = new Color4(0, 0, 0.2, 0.0);

// 大小
particleSystem.minSize = 0.1;
particleSystem.maxSize = 0.5;

// 生命周期
particleSystem.minLifeTime = 0.3;
particleSystem.maxLifeTime = 1.5;

// 发射率
particleSystem.emitRate = 350;

// 开始粒子系统
particleSystem.start();
```

## GUI系统

### GUI创建
```javascript
import { AdvancedDynamicTexture, Button, Control, TextBlock } from '@babylonjs/gui';

// 创建GUI纹理
const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');

// 创建按钮
const button = Button.CreateSimpleButton('but', 'Click Me');
button.width = '150px';
button.height = '40px';
button.color = 'white';
button.background = 'green';
button.onPointerUpObservable.add(() => {
  alert('Button clicked!');
});
advancedTexture.addControl(button);

// 创建文本
const text = new TextBlock();
text.text = 'Hello Babylon.js';
text.color = 'white';
text.fontSize = 24;
text.top = '100px';
advancedTexture.addControl(text);
```

## 加载器

### 模型加载
```javascript
import { SceneLoader } from '@babylonjs/loaders';

// GLTF加载
SceneLoader.ImportMeshAsync('', 'models/', 'model.glb', scene).then((result) => {
  const mesh = result.meshes[0];
  mesh.position = new Vector3(0, 0, 0);
});

// OBJ加载
SceneLoader.ImportMesh('', 'models/', 'model.obj', scene, (meshes) => {
  // 处理加载的网格
});

// 带进度回调
SceneLoader.ImportMesh(
  '',
  'models/',
  'model.glb',
  scene,
  (meshes) => { /* 成功 */ },
  (evt) => { /* 进度 */ console.log(evt.loaded + ' of ' + evt.total); },
  (error) => { /* 错误 */ console.error(error); }
);
```

## 后处理

### 基础后处理
```javascript
import { DefaultRenderingPipeline } from '@babylonjs/core/PostProcesses/RenderPipeline';

// 创建默认渲染管线
const pipeline = new DefaultRenderingPipeline('default', true, scene);

// 启用效果
pipeline.imageProcessing.contrast = 1.2;
pipeline.bloom.enabled = true;
pipeline.bloom.intensity = 0.5;
pipeline.chromaticAberration.enabled = true;
pipeline.chromaticAberration.aberrationAmount = 1.0;

// 景深
pipeline.depthOfField.enabled = true;
pipeline.depthOfField.focalLength = 150;
pipeline.depthOfField.fStop = 1.4;
pipeline.depthOfField.focusDistance = 2000;
```

### 自定义着色器
```javascript
import { Effect } from '@babylonjs/core/Materials/effect';

// 着色器代码
const vertexShader = `
  precision highp float;
  attribute vec3 position;
  uniform mat4 worldViewProjection;
  void main() {
    gl_Position = worldViewProjection * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform vec3 color;
  void main() {
    gl_FragColor = vec4(color, 1.0);
  }
`;

// 创建着色器材质
Effect.ShadersStore['customVertexShader'] = vertexShader;
Effect.ShadersStore['customFragmentShader'] = fragmentShader;

const shaderMaterial = new ShaderMaterial('shader', scene, {
  vertex: 'custom',
  fragment: 'custom'
}, {
  attributes: ['position'],
  uniforms: ['worldViewProjection', 'color']
});

shaderMaterial.setColor3('color', new Color3(1, 0, 0));
mesh.material = shaderMaterial;
```

## WebXR支持

### VR/AR体验
```javascript
// 创建WebXR体验助手
const xrHelper = await scene.createDefaultXRExperienceAsync({
  uiOptions: {
    sessionMode: 'immersive-vr',
    referenceSpaceType: 'local-floor'
  },
  optionalFeatures: true
});

// 添加交互功能
const featuresManager = xrHelper.baseExperience.featuresManager;

// 手柄追踪
const pointerSelection = featuresManager.enableFeature(
  WebXRFeatureName.POINTER_SELECTION,
  'default'
);

// 射线选择
const teleportation = featuresManager.enableFeature(
  WebXRFeatureName.TELEPORTATION,
  'default'
);
```

## 性能优化

### LOD系统
```javascript
// 创建LOD网格
const lodMesh = new AbstractMesh('lodMesh', scene);

// 添加不同细节等级
const lod0 = MeshBuilder.CreateSphere('lod0', { diameter: 10 }, scene);
const lod1 = MeshBuilder.CreateSphere('lod1', { diameter: 8 }, scene);
const lod2 = MeshBuilder.CreateSphere('lod2', { diameter: 6 }, scene);

// 设置LOD距离
lodMesh.addLODLevel(lod0, 0);
lodMesh.addLODLevel(lod1, 50);
lodMesh.addLODLevel(lod2, 100);
```

### 实例化渲染
```javascript
// 创建实例化网格
const sourceMesh = MeshBuilder.CreateBox('source', {}, scene);
const instances = [];

for (let i = 0; i < 1000; i++) {
  const instance = sourceMesh.createInstance('instance' + i);
  instance.position = new Vector3(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() * 100 - 50
  );
  instances.push(instance);
}
```

## 工具和调试

### Babylon.js Inspector
```javascript
// 启用Inspector
scene.debugLayer.show({
  embedMode: true,
  overlay: true
});

// 或通过快捷键
// Inspector可以在浏览器中通过右键点击场景启用
```

### 性能监控
```javascript
// 性能监视器
scene.getEngine().displayFPS = true;

// 统计信息
scene.getEngine().getDrawCalls();
scene.getActiveMeshes().length;
scene.getActiveParticles().length;
```

## 最佳实践

### 1. 场景优化
- 合理使用LOD技术
- 启用视锥体剔除
- 合并静态网格
- 使用实例化渲染

### 2. 材质优化
- 复用材质对象
- 使用纹理图集
- 启用纹理压缩
- 合理设置纹理大小

### 3. 动画优化
- 使用GPU蒙皮
- 优化骨骼数量
- 使用动画压缩
- 合理设置帧率

### 4. 内存管理
- 及时释放资源
- 使用对象池
- 避免内存泄漏
- 监控内存使用

## 学习资源

### 官方资源
- [Babylon.js官网](https://www.babylonjs.com/)
- [官方文档](https://doc.babylonjs.com/)
- [Playground](https://playground.babylonjs.com/)
- [Inspector](https://sandbox.babylonjs.com/)

### 教程课程
- [Babylon.js大学](https://www.babylonjs-university.com/)
- [官方教程](https://doc.babylonjs.com/start/chap0)

### 社区资源
- [Discord社区](https://discord.gg/babylonjs)
- [论坛](https://forum.babylonjs.com/)
- [GitHub](https://github.com/BabylonJS/Babylon.js)

Babylon.js 以其完整的功能集和强大的工具链，成为开发复杂3D应用和游戏的理想选择，特别适合需要企业级支持和高性能要求的项目。