# WebGL

WebGL (Web Graphics Library) 是一个JavaScript API，用于在任何兼容的Web浏览器中渲染高性能的交互式3D和2D图形，而无需使用插件。

## 概述

WebGL 基于OpenGL ES 2.0，为Web平台提供了底层的GPU加速图形渲染能力。它直接在浏览器的canvas元素中运行，能够访问用户的GPU进行硬件加速渲染。

## 核心概念

### 🎨 渲染管线
- **顶点着色器** - 处理顶点数据的位置、变换等
- **图元装配** - 将顶点组装成三角形、线段等图元
- **光栅化** - 将图元转换为像素片段
- **片段着色器** - 计算每个像素的最终颜色

### 📐 坐标系统
- **局部坐标** - 模型自身的坐标系统
- **世界坐标** - 场景中的全局坐标系统
- **视图坐标** - 相机视角的坐标系统
- **裁剪坐标** - 投影后的标准化坐标系统

### 🔄 矩阵变换
- **模型矩阵** - 物体的位置、旋转、缩放变换
- **视图矩阵** - 相机的位置和朝向变换
- **投影矩阵** - 3D到2D的投影变换
- **法线矩阵** - 法线向量的变换矩阵

## 基础API

### 初始化WebGL上下文
```javascript
// 获取canvas元素
const canvas = document.getElementById('glCanvas');

// 获取WebGL上下文
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

if (!gl) {
    console.error('WebGL不被支持');
}

// 设置视口
gl.viewport(0, 0, canvas.width, canvas.height);

// 设置清空颜色
gl.clearColor(0.0, 0.0, 0.0, 1.0);

// 启用深度测试
gl.enable(gl.DEPTH_TEST);

// 清空颜色和深度缓冲区
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
```

### 着色器程序
```javascript
// 顶点着色器源码
const vertexShaderSource = `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying vec3 vColor;

    void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
        vColor = aVertexColor;
    }
`;

// 片段着色器源码
const fragmentShaderSource = `
    precision mediump float;

    varying vec3 vColor;

    void main(void) {
        gl_FragColor = vec4(vColor, 1.0);
    }
`;

// 创建着色器
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('着色器编译错误:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

// 创建着色器程序
function createShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('着色器程序链接错误:', gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

// 使用着色器程序
const shaderProgram = createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
gl.useProgram(shaderProgram);
```

### 缓冲区管理
```javascript
// 定义立方体顶点数据
const vertices = [
    // 前面
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    // 后面
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,
    // 其他面...
];

// 颜色数据
const colors = [
    1.0, 0.0, 0.0,  // 红
    0.0, 1.0, 0.0,  // 绿
    0.0, 0.0, 1.0,  // 蓝
    1.0, 1.0, 0.0,  // 黄
    // ...
];

// 索引数据
const indices = [
    0, 1, 2,    0, 2, 3,    // 前面
    4, 5, 6,    4, 6, 7,    // 后面
    // ...
];

// 创建顶点缓冲区
function createBuffer(gl, data, type = gl.ARRAY_BUFFER) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, new Float32Array(data), gl.STATIC_DRAW);
    return buffer;
}

// 创建缓冲区
const vertexBuffer = createBuffer(gl, vertices);
const colorBuffer = createBuffer(gl, colors);
const indexBuffer = createBuffer(gl, indices, gl.ELEMENT_ARRAY_BUFFER);
```

### 属性设置
```javascript
// 获取属性位置
const aVertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
const aVertexColor = gl.getAttribLocation(shaderProgram, 'aVertexColor');

// 绑定顶点缓冲区并设置属性
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aVertexPosition);

// 绑定颜色缓冲区并设置属性
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(aVertexColor, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aVertexColor);
```

### Uniform变量
```javascript
// 获取uniform位置
const uModelViewMatrix = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
const uProjectionMatrix = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');

// 创建矩阵
function createMatrix4() {
    return new Float32Array(16);
}

function setIdentityMatrix(matrix) {
    matrix.fill(0);
    matrix[0] = matrix[5] = matrix[10] = matrix[15] = 1.0;
}

function setPerspectiveMatrix(matrix, fov, aspect, near, far) {
    const f = 1.0 / Math.tan(fov / 2);
    const nf = 1 / (near - far);

    matrix.fill(0);
    matrix[0] = f / aspect;
    matrix[5] = f;
    matrix[10] = (far + near) * nf;
    matrix[11] = -1;
    matrix[14] = 2 * far * near * nf;
}

// 设置uniform值
const modelViewMatrix = createMatrix4();
const projectionMatrix = createMatrix4();

setIdentityMatrix(modelViewMatrix);
setPerspectiveMatrix(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);

gl.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);
gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);
```

## 渲染循环

### 基础渲染循环
```javascript
function render() {
    // 清空缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // 更新矩阵
    const time = Date.now() * 0.001;
    setIdentityMatrix(modelViewMatrix);

    // 应用旋转变换
    const angle = time * 0.5;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    modelViewMatrix[0] = cos;
    modelViewMatrix[2] = sin;
    modelViewMatrix[8] = -sin;
    modelViewMatrix[10] = cos;
    modelViewMatrix[14] = -6.0;

    // 更新uniform
    gl.uniformMatrix4fv(uModelViewMatrix, false, modelViewMatrix);

    // 绘制
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    // 请求下一帧
    requestAnimationFrame(render);
}

// 开始渲染
render();
```

## 纹理映射

### 纹理基础
```javascript
// 创建纹理
function createTexture(gl, image) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 设置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // 上传图像数据
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    return texture;
}

// 加载纹理图像
function loadTexture(gl, url, callback) {
    const image = new Image();
    image.onload = () => {
        const texture = createTexture(gl, image);
        callback(texture);
    };
    image.src = url;
}

// 纹理坐标
const textureCoords = [
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    // ...
];

// 更新着色器
const texturedVertexShader = `
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying vec2 vTextureCoord;

    void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
        vTextureCoord = aTextureCoord;
    }
`;

const texturedFragmentShader = `
    precision mediump float;

    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;

    void main(void) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
`;
```

## 光照模型

### Phong光照模型
```javascript
// 光照着色器
const phongVertexShader = `
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexNormal;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat3 uNormalMatrix;

    varying vec3 vNormal;
    varying vec3 vPosition;

    void main(void) {
        vec4 position = uModelViewMatrix * vec4(aVertexPosition, 1.0);
        vPosition = position.xyz;
        vNormal = uNormalMatrix * aVertexNormal;
        gl_Position = uProjectionMatrix * position;
    }
`;

const phongFragmentShader = `
    precision mediump float;

    varying vec3 vNormal;
    varying vec3 vPosition;

    uniform vec3 uLightPosition;
    uniform vec3 uAmbientColor;
    uniform vec3 uDiffuseColor;
    uniform vec3 uSpecularColor;
    uniform float uShininess;

    void main(void) {
        // 归一化法线和向量
        vec3 normal = normalize(vNormal);
        vec3 lightDirection = normalize(uLightPosition - vPosition);
        vec3 viewDirection = normalize(-vPosition);
        vec3 reflectDirection = reflect(-lightDirection, normal);

        // 环境光
        vec3 ambient = uAmbientColor;

        // 漫反射
        float diffuseFactor = max(dot(normal, lightDirection), 0.0);
        vec3 diffuse = uDiffuseColor * diffuseFactor;

        // 镜面反射
        float specularFactor = pow(max(dot(viewDirection, reflectDirection), 0.0), uShininess);
        vec3 specular = uSpecularColor * specularFactor;

        // 最终颜色
        vec3 finalColor = ambient + diffuse + specular;
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;
```

## 阴影映射

### 阴影贴图技术
```javascript
// 创建帧缓冲区
function createFramebuffer(gl, texture) {
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, texture, 0);

    // 检查帧缓冲区完整性
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        console.error('帧缓冲区不完整');
    }

    return framebuffer;
}

// 创建深度纹理
const shadowTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, shadowTexture);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, 1024, 1024, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

// 阴影着色器
const shadowVertexShader = `
    uniform mat4 uLightMatrix;
    attribute vec3 aVertexPosition;

    void main(void) {
        gl_Position = uLightMatrix * vec4(aVertexPosition, 1.0);
    }
`;

const shadowFragmentShader = `
    precision mediump float;

    void main(void) {
        // 不需要输出颜色，只需要深度
    }
`;
```

## 性能优化

### 缓冲区优化
```javascript
// 交错顶点数据
const interleavedData = new Float32Array([
    // 位置(x,y,z)      颜色(r,g,b)     纹理(u,v)
    -1.0, -1.0,  1.0,  1.0, 0.0, 0.0,  0.0, 0.0,
     1.0, -1.0,  1.0,  0.0, 1.0, 0.0,  1.0, 0.0,
     1.0,  1.0,  1.0,  0.0, 0.0, 1.0,  1.0, 1.0,
    -1.0,  1.0,  1.0,  1.0, 1.0, 0.0,  0.0, 1.0,
]);

// 创建交错缓冲区
const interleavedBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, interleavedBuffer);
gl.bufferData(gl.ARRAY_BUFFER, interleavedData, gl.STATIC_DRAW);

// 设置属性指针
const stride = 8 * 4; // 每个顶点8个float
const positionOffset = 0;
const colorOffset = 3 * 4;
const texCoordOffset = 6 * 4;

// 位置属性
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, stride, positionOffset);
gl.enableVertexAttribArray(positionLocation);

// 颜色属性
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, stride, colorOffset);
gl.enableVertexAttribArray(colorLocation);

// 纹理坐标属性
gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, stride, texCoordOffset);
gl.enableVertexAttribArray(texCoordLocation);
```

### 实例化渲染
```javascript
// 实例化数据
const instancePositions = [
    0.0, 0.0, 0.0,
    2.0, 0.0, 0.0,
    -2.0, 0.0, 0.0,
    // ... 更多实例位置
];

// 创建实例化缓冲区
const instanceBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(instancePositions), gl.STATIC_DRAW);

// 实例化属性
const instanceAttributeLocation = gl.getAttribLocation(shaderProgram, 'aInstancePosition');
gl.vertexAttribPointer(instanceAttributeLocation, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(instanceAttributeLocation);

// 设置实例化步长
gl.vertexAttribDivisor(instanceAttributeLocation, 1);

// 实例化绘制
gl.drawArraysInstanced(gl.TRIANGLES, 0, vertexCount, instanceCount);
```

## 调试工具

### WebGL Inspector
```javascript
// 错误检查
function checkGLError(gl) {
    const error = gl.getError();
    if (error !== gl.NO_ERROR) {
        console.error('WebGL错误:', error);
    }
}

// 调用检查
function debugGLError(gl, operation) {
    operation();
    checkGLError(gl);
}

// 使用示例
debugGLError(gl, () => {
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
});
```

### Spector.js
```javascript
// Spector.js 是一个强大的WebGL调试工具
// 在浏览器中安装Spector.js扩展
// 可以捕获和分析WebGL渲染调用
```

## 最佳实践

### 1. 状态管理
- 减少状态切换
- 合理使用状态缓存
- 避免不必要的API调用

### 2. 内存管理
- 及时释放资源
- 合理使用缓冲区
- 避免内存泄漏

### 3. 性能优化
- 使用批处理技术
- 启用背面剔除
- 合理设置深度测试

### 4. 错误处理
- 检查WebGL支持
- 处理上下文丢失
- 提供降级方案

## 浏览器兼容性

### 检测WebGL支持
```javascript
function detectWebGL() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext &&
                 (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch(e) {
        return false;
    }
}

if (!detectWebGL()) {
    console.error('WebGL不被支持');
    // 提供Canvas 2D降级方案
}
```

## 学习资源

### 官方文档
- [WebGL规范](https://www.khronos.org/webgl/)
- [MDN WebGL教程](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [WebGL Fundamentals](https://webglfundamentals.org/)

### 教程课程
- [Learn WebGL](https://webglacademy.com/)
- [WebGL Workshop](https://github.com/msalsas/webgl-workshop)

### 工具库
- [Three.js](https://threejs.org/) - 高级WebGL库
- [Babylon.js](https://www.babylonjs.com/) - 3D游戏引擎
- [Pixi.js](https://pixijs.com/) - 2D WebGL渲染器

WebGL 为Web开发者提供了强大的GPU图形编程能力，是现代Web3D应用的基础技术。虽然学习曲线较陡，但掌握后将能够创建令人惊叹的3D图形应用。