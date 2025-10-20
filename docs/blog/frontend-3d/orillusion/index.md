# Orillusion

Orillusion 是基于WebGPU的国产3D渲染引擎，为现代Web应用提供高性能的3D图形渲染能力。

## 概述

Orillusion 是国内首个完全基于WebGPU开发的3D引擎，采用现代图形API设计理念，致力于为Web3D开发提供更高效、更易用的解决方案。

## 核心特性

### 🚀 WebGPU驱动
- **现代GPU架构** - 充分发挥硬件性能
- **计算着色器** - GPU并行计算能力
- **多线程渲染** - Web Workers支持
- **统一着色语言** - WGSL标准

### 🎨 PBR渲染管线
- **物理渲染** - 真实感材质系统
- **全局光照** - 实时GI解决方案
- **屏幕空间反射** - 高质量反射效果
- **后处理栈** - 丰富的视觉效果

### 🎮 实时引擎功能
- **场景图系统** - 层次化场景管理
- **动画系统** - 骨骼动画和变形动画
- **物理引擎** - 真实物理模拟
- **粒子系统** - 高性能粒子渲染

### 🛠️ 开发体验
- **TypeScript支持** - 完整的类型定义
- **组件化架构** - 可扩展的组件系统
- **热重载开发** - 实时预览功能
- **可视化编辑器** - 在线场景编辑器

## 快速开始

### 环境要求
- Chrome 113+ / Edge 113+ / Firefox 113+
- 支持WebGPU的现代浏览器
- 建议使用开发版浏览器体验最新特性

### 安装
```bash
npm install @orillusion/core
```

### 基础场景
```javascript
import { Engine3D, Scene3D, Camera3D, HoverCameraController, Object3D, MeshRenderer, BoxGeometry, UnlitMaterial } from '@orillusion/core';

// 创建引擎
const engine = new Engine3D();
await engine.init();

// 创建场景
const scene = new Scene3D();
scene.background = new Color(0.2, 0.2, 0.2, 1.0);

// 创建相机
const cameraObj = new Object3D();
const camera = cameraObj.addComponent(Camera3D);
camera.perspective(60, window.innerWidth / window.innerHeight, 1, 5000.0);

// 添加相机控制器
const controller = cameraObj.addComponent(HoverCameraController);
controller.setCamera(20, -20, 0, new Vector3(0, 0, 0));
scene.addChild(cameraObj);

// 创建立方体
const boxObj = new Object3D();
const renderer = boxObj.addComponent(MeshRenderer);
renderer.geometry = new BoxGeometry(1, 1, 1);
renderer.material = new UnlitMaterial();
scene.addChild(boxObj);

// 启动渲染
engine.run();
```

## 场景系统

### 场景管理
```javascript
import { Scene3D, Object3D } from '@orillusion/core';

// 创建场景
const scene = new Scene3D();

// 场景配置
scene.background = new Color(0.1, 0.1, 0.1);
scene.ambientLight = new Color(0.2, 0.2, 0.2);
scene.fog = new Fog(0.8, 10, 100);

// 对象层次结构
const parentObj = new Object3D();
const childObj = new Object3D();

parentObj.addChild(childObj);
scene.addChild(parentObj);

// 遍历场景树
scene.traverse((obj) => {
    console.log('场景对象:', obj.name);
});
```

### 组件系统
```javascript
import { Component, Behaviour } from '@orillusion/core';

// 自定义组件
class RotateComponent extends Behaviour {
    private speed: number = 1.0;

    onUpdate() {
        this.object3D.rotationY += this.speed * 0.01;
    }

    setSpeed(value: number) {
        this.speed = value;
    }
}

// 添加组件到对象
const cube = new Object3D();
const rotator = cube.addComponent(RotateComponent);
rotator.setSpeed(2.0);
```

## 渲染系统

### 材质系统
```javascript
import { PBRMaterial, UnlitMaterial, Texture } from '@orillusion/core';

// PBR材质
const pbrMaterial = new PBRMaterial();
pbrMaterial.baseColor = new Color(1.0, 0.0, 0.0);
pbrMaterial.metallic = 0.8;
pbrMaterial.roughness = 0.2;
pbrMaterial.emissive = new Color(0.1, 0.0, 0.0);

// 纹理加载
const texture = new Texture();
await texture.load('texture.jpg');
pbrMaterial.baseMap = texture;

// 法线贴图
const normalMap = new Texture();
await normalMap.load('normal.jpg');
pbrMaterial.normalMap = normalMap;

// 应用材质
renderer.material = pbrMaterial;
```

### 光照系统
```javascript
import { DirectLight, PointLight, SpotLight } from '@orillusion/core';

// 方向光（太阳光）
const sunLight = new Object3D();
const light = sunLight.addComponent(DirectLight);
light.lightColor = new Color(1.0, 1.0, 0.9);
light.intensity = 3.0;
sunLight.rotationX = -45;
sunLight.rotationY = 45;
scene.addChild(sunLight);

// 点光源
const pointLightObj = new Object3D();
const pointLight = pointLightObj.addComponent(PointLight);
pointLight.lightColor = new Color(1.0, 1.0, 1.0);
pointLight.intensity = 10.0;
pointLight.range = 100.0;
pointLightObj.position = new Vector3(0, 5, 0);
scene.addChild(pointLightObj);

// 聚光灯
const spotLightObj = new Object3D();
const spotLight = spotLightObj.addComponent(SpotLight);
spotLight.lightColor = new Color(1.0, 1.0, 0.8);
spotLight.intensity = 20.0;
spotLight.range = 50.0;
spotLight.angle = Math.PI / 6;
spotLightObj.position = new Vector3(0, 10, 0);
spotLightObj.lookAt(new Vector3(0, 0, 0));
scene.addChild(spotLightObj);
```

## 几何体系统

### 内置几何体
```javascript
import { BoxGeometry, SphereGeometry, CylinderGeometry, PlaneGeometry } from '@orillusion/core';

// 立方体
const boxGeo = new BoxGeometry(2, 2, 2);

// 球体
const sphereGeo = new SphereGeometry(1.5, 32, 32);

// 圆柱体
const cylinderGeo = new CylinderGeometry(1, 1, 3, 32);

// 平面
const planeGeo = new PlaneGeometry(10, 10);
```

### 自定义几何体
```javascript
import { GeometryBase } from '@orillusion/core';

// 创建自定义几何体
class CustomGeometry extends GeometryBase {
    constructor() {
        super();
        this.build();
    }

    private build() {
        // 定义顶点位置
        const vertices = new Float32Array([
            // 前面
            -0.5, -0.5,  0.5,
             0.5, -0.5,  0.5,
             0.5,  0.5,  0.5,
            -0.5,  0.5,  0.5,
            // ... 其他顶点
        ]);

        // 定义顶点索引
        const indices = new Uint16Array([
            0, 1, 2,
            0, 2, 3,
            // ... 其他面
        ]);

        // 定义法线
        const normals = new Float32Array([
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // ... 其他法线
        ]);

        // 定义UV坐标
        const uvs = new Float32Array([
            0, 0,
            1, 0,
            1, 1,
            0, 1,
            // ... 其他UV
        ]);

        // 设置几何体数据
        this.setAttribute('position', vertices);
        this.setAttribute('normal', normals);
        this.setAttribute('uv', uvs);
        this.setIndices(indices);
    }
}

// 使用自定义几何体
const customGeo = new CustomGeometry();
const mesh = new Object3D();
const renderer = mesh.addComponent(MeshRenderer);
renderer.geometry = customGeo;
```

## 动画系统

### 变换动画
```javascript
import { Animation } from '@orillusion/core';

// 创建动画组件
const animator = object.addComponent(Animation);

// 创建动画轨道
const positionTrack = new VectorKeyframeTrack('object.position');
positionTrack.addKeyframe(0, new Vector3(0, 0, 0));
positionTrack.addKeyframe(1, new Vector3(5, 0, 0));
positionTrack.addKeyframe(2, new Vector3(5, 3, 0));
positionTrack.addKeyframe(3, new Vector3(0, 0, 0));

const rotationTrack = new QuaternionKeyframeTrack('object.rotation');
rotationTrack.addKeyframe(0, new Quaternion(0, 0, 0, 1));
rotationTrack.addKeyframe(3, new Quaternion(0, 1, 0, 1));

// 创建动画剪辑
const clip = new AnimationClip('moveAndRotate', 3, [positionTrack, rotationTrack]);

// 添加到动画组件
animator.addClip(clip);

// 播放动画
animator.play('moveAndRotate');
```

### 骨骼动画
```javascript
import { SkeletalAnimation, Skeleton } from '@orillusion/core';

// 加载骨骼模型
const loader = new GLTFLoader();
await loader.load('character.glb');

// 获取骨骼动画组件
const skinnedMesh = scene.findByName('Character');
const skeletalAnimation = skinnedMesh.getComponent(SkeletalAnimation);

// 播放动画
skeletalAnimation.playAnimation('walk', {
    loop: true,
    speed: 1.0
});

// 动画混合
skeletalAnimation.crossFade('run', 0.5);
```

## 物理系统

### 基础物理
```javascript
import { PhysicsSystem, RigidBody, BoxCollider, SphereCollider } from '@orillusion/core';

// 启用物理系统
const physics = new PhysicsSystem();
physics.init(scene);

// 添加刚体组件
const rigidBody = object.addComponent(RigidBody);
rigidBody.mass = 1.0;
rigidBody.friction = 0.5;
rigidBody.restitution = 0.8;

// 添加碰撞体
const boxCollider = object.addComponent(BoxCollider);
boxCollider.size = new Vector3(1, 1, 1);

// 球体碰撞体
const sphereCollider = object.addComponent(SphereCollider);
sphereCollider.radius = 0.5;
```

### 物理事件
```javascript
// 碰撞事件
rigidBody.onCollisionEnter = (other) => {
    console.log('碰撞开始:', other.object3D.name);
};

rigidBody.onCollisionExit = (other) => {
    console.log('碰撞结束:', other.object3D.name);
};

// 触发器事件
const trigger = triggerObject.addComponent(RigidBody);
trigger.isTrigger = true;

trigger.onTriggerEnter = (other) => {
    console.log('进入触发区域:', other.object3D.name);
};
```

## 粒子系统

### 基础粒子
```javascript
import { ParticleSystem, ParticleSystemModule } from '@orillusion/core';

// 创建粒子系统
const particleSystem = new ParticleSystem(1000);
scene.addChild(particleSystem);

// 配置粒子模块
const emissionModule = particleSystem.getModule(ParticleSystemModule.Emission);
emissionModule.rate = 100;

const startLifetimeModule = particleSystem.getModule(ParticleSystemModule.StartLifetime);
startLifetimeModule.constant = 3.0;

const startSpeedModule = particleSystem.getModule(ParticleSystemModule.StartSpeed);
startSpeedModule.constant = 5.0;

const startColorModule = particleSystem.getModule(ParticleSystemModule.StartColor);
startColorModule.constant = new Color(1.0, 0.5, 0.0);

const sizeModule = particleSystem.getModule(ParticleSystemModule.Size);
sizeModule.constant = 0.2;

// 播放粒子系统
particleSystem.play();
```

## 后处理系统

### 后处理效果
```javascript
import { PostProcessingComponent, BloomEffect, FXAAEffect } from '@orillusion/core';

// 添加后处理组件
const postProcessing = camera.addComponent(PostProcessingComponent);

// 泛光效果
const bloom = postProcessing.addEffect(BloomEffect);
bloom.intensity = 1.5;
bloom.threshold = 1.0;
bloom.radius = 0.5;

// 抗锯齿效果
const fxaa = postProcessing.addEffect(FXAAEffect);

// 自定义后处理着色器
const customEffect = postProcessing.addEffect(CustomPostEffect);
customEffect.uniforms.set('intensity', 1.0);
```

## 计算着色器

### GPU计算
```javascript
import { ComputeShader } from '@orillusion/core';

// 创建计算着色器
const computeShader = new ComputeShader();

// WGSL着色器代码
const wgslCode = `
@group(0) @binding(0) var<storage, read> inputBuffer: array<f32>;
@group(0) @binding(1) var<storage, read_write> outputBuffer: array<f32>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let index = global_id.x;
    outputBuffer[index] = inputBuffer[index] * 2.0;
}
`;

computeShader.setWGSL(wgslCode);

// 设置计算缓冲区
const inputBuffer = new Float32Array(1024);
const outputBuffer = new Float32Array(1024);

computeShader.setBuffer('inputBuffer', inputBuffer);
computeShader.setBuffer('outputBuffer', outputBuffer);

// 执行计算
computeShader.dispatch(Math.ceil(1024 / 64));

// 读取结果
computeShader.readBuffer('outputBuffer').then((data) => {
    console.log('计算结果:', data);
});
```

## 资源管理

### 资源加载
```javascript
import { ResourceManager } from '@orillusion/core';

// 创建资源管理器
const resourceManager = new ResourceManager();

// 加载纹理
const texture = await resourceManager.loadTexture('texture.jpg');

// 加载模型
const model = await resourceManager.loadModel('model.glb');

// 加载音频
const audio = await resourceManager.loadAudio('sound.mp3');

// 批量加载
const resources = await resourceManager.load({
    textures: ['diffuse.jpg', 'normal.jpg', 'roughness.jpg'],
    models: ['character.glb', 'environment.glb'],
    audio: ['bgm.mp3', 'sfx.mp3']
});
```

### 资源优化
```javascript
// 纹理压缩
const compressedTexture = await resourceManager.loadCompressedTexture('texture.ktx2');

// 模型简化
const simplifiedModel = await resourceManager.loadSimplifiedModel('high_poly.glb', {
    targetFaceCount: 10000,
    preserveBoundaries: true
});

// LOD模型加载
const lodModel = await resourceManager.loadLODModel('model.glb', [
    { distance: 0, model: 'high.glb' },
    { distance: 50, model: 'medium.glb' },
    { distance: 100, model: 'low.glb' }
]);
```

## 性能优化

### 渲染优化
```javascript
// 实例化渲染
const instanceRenderer = object.addComponent(InstanceRenderComponent);
instanceRenderer.instanceCount = 1000;

// 视锥体剔除
camera.frustumCulling = true;

// 遮挡剔除
scene.occlusionCulling = true;

// 批次渲染
const batchRenderer = scene.addComponent(BatchRendererComponent);
batchRenderer.batchObjects([
    object1,
    object2,
    object3
]);
```

### 内存优化
```javascript
// 对象池
const objectPool = new ObjectPool(Object3D, 100);

function createObject(): Object3D {
    return objectPool.acquire();
}

function destroyObject(obj: Object3D) {
    objectPool.release(obj);
}

// 纹理压缩
const textureCompressor = new TextureCompressor();
const compressedTexture = await textureCompressor.compress(texture, 'BC3');

// 几何体压缩
const geometryCompressor = new GeometryCompressor();
const compressedGeometry = await geometryCompressor.compress(geometry);
```

## 开发工具

### 在线编辑器
```javascript
// 启用调试模式
engine.debugMode = true;

// 显示性能统计
engine.showStats = true;

// 启用场景检查器
engine.enableInspector = true;

// 保存场景快照
engine.captureScene('screenshot.png');

// 导出场景数据
const sceneData = scene.serialize();
engine.downloadJSON(sceneData, 'scene.json');
```

## 最佳实践

### 1. WebGPU适配
- 检测WebGPU支持
- 提供WebGL降级方案
- 优化GPU内存使用

### 2. 性能优化
- 合理使用实例化渲染
- 优化几何体复杂度
- 使用LOD技术
- 启用视锥体剔除

### 3. 开发流程
- 使用TypeScript开发
- 实现组件化架构
- 利用热重载功能
- 使用版本控制

### 4. 用户体验
- 提供加载进度
- 优化移动端性能
- 实现响应式设计
- 处理错误和异常

## 路线图

### v1.0 (当前版本)
- 基础3D渲染管线
- PBR材质系统
- 动画系统
- 基础物理支持

### v1.5
- 增强的后处理系统
- GPU粒子系统
- 音频系统集成
- WebXR支持

### v2.0
- 全局光照解决方案
- 体积渲染
- 高级物理特性
- 可视化编辑器

## 学习资源

### 官方资源
- [Orillusion官网](https://www.orillusion.com/)
- [官方文档](https://docs.orillusion.com/)
- [在线示例](https://playground.orillusion.com/)

### 教程课程
- [入门教程](https://www.orillusion.com/tutorials)
- [API参考](https://docs.orillusion.com/api/)

### 社区资源
- [GitHub仓库](https://github.com/Orillusion/orillusion)
- [官方论坛](https://forum.orillusion.com/)
- [QQ交流群](https://jq.qq.com/?_wv=1027&k=xxxx)

Orillusion 作为国产WebGPU 3D引擎的先行者，为Web3D开发带来了新的可能性，特别适合需要现代图形API支持和中文社区的项目。