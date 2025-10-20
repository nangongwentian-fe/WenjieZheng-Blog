# WebGPU

WebGPU 是下一代Web图形API，提供对现代GPU的底层访问能力，是WebGL的继任者，为Web带来更强大的图形和计算性能。

## 概述

WebGPU 是W3C制定的Web图形标准，旨在为Web开发者提供现代GPU的原生访问能力。它借鉴了Vulkan、Metal和Direct3D 12等现代图形API的设计理念，提供更高效、更灵活的GPU编程接口。

## 核心特性

### 🚀 现代架构
- **显式资源管理** - 开发者完全控制GPU资源
- **多线程支持** - 与Web Workers无缝集成
- **计算着色器** - 通用GPU计算能力
- **更优性能** - 减少CPU开销和状态切换

### 🎨 图形渲染
- **渲染管线** - 可编程的图形管线
- **多渲染目标** - 同时渲染多个目标
- **实例化渲染** - 高效批量渲染
- **间接渲染** - GPU驱动的渲染

### 🔢 通用计算
- **计算管线** - 专用计算着色器管线
- **原子操作** - 线程安全的内存操作
- **共享内存** - 着色器间高效数据共享
- **工作组** - 并行计算组织

### 📊 内存模型
- **缓冲区管理** - 灵活的GPU内存分配
- **纹理格式** - 丰富的纹理格式支持
- **采样器** - 高级纹理采样控制
- **内存屏障** - 精确的内存同步控制

## 快速开始

### 环境检查
```javascript
// 检查WebGPU支持
async function checkWebGPUSupport() {
    if (!navigator.gpu) {
        console.error('WebGPU不被支持');
        return false;
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
        console.error('无法获取WebGPU适配器');
        return false;
    }

    return true;
}
```

### 初始化WebGPU
```javascript
// 获取GPU适配器和设备
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

// 获取canvas上下文
const canvas = document.getElementById('gpuCanvas');
const context = canvas.getContext('webgpu');

// 配置交换链
const swapChainFormat = 'bgra8unorm';
context.configure({
    device: device,
    format: swapChainFormat,
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

// 创建渲染管线
const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
        module: device.createShaderModule({
            code: vertexShaderCode
        }),
        entryPoint: 'main',
        buffers: [
            {
                arrayStride: 12, // vec3 * 4 bytes
                attributes: [{
                    shaderLocation: 0,
                    offset: 0,
                    format: 'float32x3'
                }]
            }
        ]
    },
    fragment: {
        module: device.createShaderModule({
            code: fragmentShaderCode
        }),
        entryPoint: 'main',
        targets: [{
            format: swapChainFormat
        }]
    },
    primitive: {
        topology: 'triangle-list'
    },
    depthStencil: {
        depthWriteEnabled: true,
        depthCompare: 'less',
        format: 'depth24plus'
    }
});
```

## WGSL着色器语言

### 顶点着色器
```wgsl
struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) color: vec3<f32>,
    @location(1) uv: vec2<f32>,
};

struct Uniforms {
    modelViewProjection: mat4x4<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex
fn main(@location(0) position: vec3<f32>,
       @location(1) color: vec3<f32>,
       @location(2) uv: vec2<f32>) -> VertexOutput {

    var output: VertexOutput;
    output.position = uniforms.modelViewProjection * vec4<f32>(position, 1.0);
    output.color = color;
    output.uv = uv;

    return output;
}
```

### 片段着色器
```wgsl
@group(0) @binding(1) var diffuseTexture: texture_2d<f32>;
@group(0) @binding(2) var textureSampler: sampler;

@fragment
fn main(@location(0) color: vec3<f32>,
       @location(1) uv: vec2<f32>) -> @location(0) vec4<f32> {

    let textureColor = textureSample(diffuseTexture, textureSampler, uv);
    let finalColor = color * textureColor.rgb;

    return vec4<f32>(finalColor, 1.0);
}
```

### 计算着色器
```wgsl
@group(0) @binding(0) var<storage, read> inputBuffer: array<f32>;
@group(0) @binding(1) var<storage, read_write> outputBuffer: array<f32>;

struct WorkgroupData {
    data: array<f32, 64>,
};
@group(1) @binding(0) var<workgroup> workgroupData: WorkgroupData;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>,
       @builtin(local_invocation_id) local_id: vec3<u32>,
       @builtin(workgroup_id) workgroup_id: vec3<u32>) {

    let index = global_id.x;

    // 局部工作组内数据共享
    workgroupData.data[local_id.x] = inputBuffer[index];

    // 工作组内同步
    workgroupBarrier();

    // 并行计算
    outputBuffer[index] = workgroupData.data[local_id.x] * 2.0;
}
```

## 缓冲区管理

### 顶点缓冲区
```javascript
// 创建顶点数据
const vertices = new Float32Array([
    // 位置(x,y,z)     颜色(r,g,b)    UV(u,v)
    -0.5, -0.5, 0.0,  1.0, 0.0, 0.0,  0.0, 0.0,
     0.5, -0.5, 0.0,  0.0, 1.0, 0.0,  1.0, 0.0,
     0.0,  0.5, 0.0,  0.0, 0.0, 1.0,  0.5, 1.0,
]);

// 创建顶点缓冲区
const vertexBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
});

// 上传数据到GPU
device.queue.writeBuffer(vertexBuffer, 0, vertices);

// 索引缓冲区
const indices = new Uint16Array([0, 1, 2]);
const indexBuffer = device.createBuffer({
    size: indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
});
device.queue.writeBuffer(indexBuffer, 0, indices);
```

### Uniform缓冲区
```javascript
// 创建模型视图投影矩阵
const modelViewProjection = new Float32Array(16);

// 创建uniform缓冲区
const uniformBuffer = device.createBuffer({
    size: 64, // mat4x4 = 16 floats * 4 bytes
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});

// 更新uniform数据
function updateUniforms() {
    // 计算矩阵...
    device.queue.writeBuffer(uniformBuffer, 0, modelViewProjection);
}
```

### 存储缓冲区
```javascript
// 创建存储缓冲区
const storageBuffer = device.createBuffer({
    size: 1024 * 4, // 1024 floats
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
});

// 填充初始数据
const initialData = new Float32Array(1024).fill(1.0);
device.queue.writeBuffer(storageBuffer, 0, initialData);
```

## 纹理和采样器

### 纹理创建
```javascript
// 创建纹理
const texture = device.createTexture({
    size: {
        width: 512,
        height: 512,
    },
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING |
           GPUTextureUsage.COPY_DST |
           GPUTextureUsage.RENDER_ATTACHMENT,
});

// 加载图像并上传到纹理
async function loadTexture(url) {
    const response = await fetch(url);
    const imageBitmap = await createImageBitmap(await response.blob());

    device.queue.copyExternalImageToTexture(
        { source: imageBitmap },
        { texture: texture },
        { width: imageBitmap.width, height: imageBitmap.height }
    );
}
```

### 采样器配置
```javascript
// 创建采样器
const sampler = device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
    addressModeU: 'repeat',
    addressModeV: 'repeat',
    maxAnisotropy: 16,
});
```

## 渲染管线

### 图形管线创建
```javascript
const pipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({
        bindGroupLayouts: [bindGroupLayout]
    }),

    vertex: {
        module: device.createShaderModule({ code: vertexShaderWGSL }),
        entryPoint: 'main',
        buffers: [
            {
                arrayStride: 32, // 8 floats * 4 bytes
                attributes: [
                    {
                        shaderLocation: 0,
                        offset: 0,
                        format: 'float32x3', // position
                    },
                    {
                        shaderLocation: 1,
                        offset: 12,
                        format: 'float32x3', // color
                    },
                    {
                        shaderLocation: 2,
                        offset: 24,
                        format: 'float32x2', // uv
                    }
                ]
            }
        ]
    },

    fragment: {
        module: device.createShaderModule({ code: fragmentShaderWGSL }),
        entryPoint: 'main',
        targets: [{
            format: 'bgra8unorm',
            blend: {
                color: {
                    srcFactor: 'src-alpha',
                    dstFactor: 'one-minus-src-alpha',
                },
                alpha: {
                    srcFactor: 'one',
                    dstFactor: 'one-minus-src-alpha',
                }
            }
        }]
    },

    primitive: {
        topology: 'triangle-list',
        cullMode: 'back',
        frontFace: 'ccw'
    },

    depthStencil: {
        depthWriteEnabled: true,
        depthCompare: 'less',
        format: 'depth24plus'
    },

    multisample: {
        count: 4,
    }
});
```

### 计算管线创建
```javascript
const computePipeline = device.createComputePipeline({
    layout: 'auto',
    compute: {
        module: device.createShaderModule({
            code: computeShaderWGSL
        }),
        entryPoint: 'main'
    }
});
```

## 绑定组

### 创建绑定组布局
```javascript
const bindGroupLayout = device.createBindGroupLayout({
    entries: [
        {
            binding: 0,
            visibility: GPUShaderStage.VERTEX,
            buffer: {
                type: 'uniform',
            }
        },
        {
            binding: 1,
            visibility: GPUShaderStage.FRAGMENT,
            texture: {
                sampleType: 'float',
            }
        },
        {
            binding: 2,
            visibility: GPUShaderStage.FRAGMENT,
            sampler: {
                type: 'filtering',
            }
        }
    ]
});
```

### 创建绑定组
```javascript
const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [
        {
            binding: 0,
            resource: {
                buffer: uniformBuffer,
            }
        },
        {
            binding: 1,
            resource: texture.createView(),
        },
        {
            binding: 2,
            resource: sampler,
        }
    ]
});
```

## 渲染循环

### 基础渲染循环
```javascript
function render() {
    // 更新uniform数据
    updateUniforms();

    // 获取当前帧的纹理
    const currentTexture = context.getCurrentTexture();

    // 创建命令编码器
    const commandEncoder = device.createCommandEncoder();

    // 创建渲染通道描述符
    const renderPassDescriptor = {
        colorAttachments: [{
            view: currentTexture.createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            loadOp: 'clear',
            storeOp: 'store',
        }],
        depthStencilAttachment: {
            view: depthTexture.createView(),
            depthClearValue: 1.0,
            depthLoadOp: 'clear',
            depthStoreOp: 'store',
        }
    };

    // 开始渲染通道
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

    // 设置渲染管线和绑定组
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.setVertexBuffer(0, vertexBuffer);
    passEncoder.setIndexBuffer(indexBuffer, 'uint16');

    // 绘制
    passEncoder.drawIndexed(3);

    // 结束渲染通道
    passEncoder.end();

    // 提交命令
    device.queue.submit([commandEncoder.finish()]);

    // 请求下一帧
    requestAnimationFrame(render);
}

// 开始渲染
render();
```

## 计算着色器

### GPU计算示例
```javascript
// 创建计算缓冲区
const computeInputBuffer = device.createBuffer({
    size: 1024 * 4,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
});

const computeOutputBuffer = device.createBuffer({
    size: 1024 * 4,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});

// 创建读取缓冲区（用于从GPU读取结果）
const readBuffer = device.createBuffer({
    size: 1024 * 4,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
});

// 执行计算
async function runCompute() {
    // 创建命令编码器
    const commandEncoder = device.createCommandEncoder();

    // 开始计算通道
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(computePipeline);
    passEncoder.setBindGroup(0, computeBindGroup);
    passEncoder.dispatchWorkgroups(Math.ceil(1024 / 64));
    passEncoder.end();

    // 复制结果到读取缓冲区
    commandEncoder.copyBufferToBuffer(
        computeOutputBuffer,
        0,
        readBuffer,
        0,
        1024 * 4
    );

    // 提交命令
    device.queue.submit([commandEncoder.finish()]);

    // 等待完成并读取结果
    await device.queue.onSubmittedWorkDone();
    await readBuffer.mapAsync(GPUMapMode.READ, 0, 1024 * 4);

    const result = new Float32Array(readBuffer.getMappedRange());
    console.log('计算结果:', result);

    readBuffer.unmap();
}
```

## 性能优化

### 命令缓冲区优化
```javascript
// 重用命令编码器
const commandEncoder = device.createCommandEncoder();

// 批量操作
function batchOperations() {
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

    // 批量绘制多个对象
    for (let i = 0; i < objects.length; i++) {
        passEncoder.setBindGroup(0, objects[i].bindGroup);
        passEncoder.drawIndexed(objects[i].indexCount);
    }

    passEncoder.end();
}

// 使用时间戳查询
const querySet = device.createQuerySet({
    type: 'timestamp',
    count: 2,
});

// 在渲染通道中插入时间戳
passEncoder.writeTimestamp(querySet, 0);
// ... 渲染操作 ...
passEncoder.writeTimestamp(querySet, 1);
```

### 内存优化
```javascript
// 使用缓冲区映射优化
async function optimizedBufferWrite(buffer, data) {
    const mapping = await buffer.mapAsync(GPUMapMode.WRITE);
    new Uint8Array(mapping).set(new Uint8Array(data));
    buffer.unmap();
}

// 纹理压缩
function createCompressedTexture(format, data) {
    const compressedFormats = [
        'bc1-rgba-unorm',
        'bc3-rgba-unorm',
        'bc5-rg-unorm',
        'bc7-rgba-unorm'
    ];

    if (compressedFormats.includes(format)) {
        return device.createTexture({
            format: format,
            usage: GPUBufferUsage.TEXTURE_BINDING,
            // ... 其他配置
        });
    }
}
```

## 错误处理和调试

### 错误捕获
```javascript
// 创建带错误验证的设备
const device = await adapter.requestDevice({
    requiredFeatures: [],
    requiredLimits: {},
});

// 设置错误回调
device.addEventListener('uncapturederror', (event) => {
    console.error('WebGPU未捕获错误:', event.error);
});

// 验证着色器模块
const shaderModule = device.createShaderModule({
    code: shaderCode,
});

// 检查编译信息
const compilationInfo = await shaderModule.getCompilationInfo();
if (compilationInfo.messages.length > 0) {
    console.error('着色器编译错误:');
    compilationInfo.messages.forEach(message => {
        console.error(`${message.type}: ${message.message}`);
    });
}
```

## 浏览器兼容性

### 功能检测
```javascript
async function detectWebGPUFeatures() {
    const adapter = await navigator.gpu.requestAdapter();

    if (!adapter) {
        return { supported: false };
    }

    const features = adapter.features;
    const limits = adapter.limits;

    return {
        supported: true,
        features: {
            timestampQuery: features.has('timestamp-query'),
            pipelineStatisticsQuery: features.has('pipeline-statistics-query'),
            textureCompressionBC: features.has('texture-compression-bc'),
            textureCompressionETC2: features.has('texture-compression-etc2'),
        },
        limits: {
            maxTextureDimension2D: limits.maxTextureDimension2D,
            maxComputeWorkgroupSizeX: limits.maxComputeWorkgroupSizeX,
            maxStorageBufferBindingSize: limits.maxStorageBufferBindingSize,
        }
    };
}
```

## 最佳实践

### 1. 资源管理
- 合理规划GPU内存使用
- 及时释放不需要的资源
- 使用对象池减少分配开销

### 2. 性能优化
- 批量提交命令减少开销
- 使用时间戳查询分析性能
- 优化着色器编译

### 3. 错误处理
- 实现完整的错误捕获机制
- 提供WebGL降级方案
- 监听上下文丢失事件

### 4. 开发流程
- 使用验证模式调试
- 实现热重载功能
- 建立完善的测试体系

## 学习资源

### 官方文档
- [WebGPU规范](https://www.w3.org/TR/webgpu/)
- [WebGPU API文档](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL规范](https://www.w3.org/TR/WGSL/)

### 教程和示例
- [WebGPU Fundamentals](https://webgpufundamentals.org/)
- [WebGPU Samples](https://github.com/google/WebGPU-Samples)
- [WebGPU Playground](https://webgpu-playground.netlify.app/)

### 开发工具
- [WebGPU Inspector](https://github.com/brendandahl/webgpu-inspector)
- [WGSL Playground](https://www.wgsl.org/playground)

WebGPU 代表了Web图形技术的未来，提供了接近原生应用的图形性能。虽然目前浏览器支持还在发展中，但它将成为下一代Web3D应用的核心技术。