# MapboxGL

MapboxGL 是一个强大的Web地图渲染库，使用WebGL技术实现高性能的矢量地图和地理空间数据可视化。

## 概述

MapboxGL JS 是Mapbox公司开发的开源JavaScript库，用于在浏览器中显示交互式地图。它基于WebGL技术，支持矢量瓦片渲染、自定义样式和丰富的地图交互功能。

## 核心特性

### 🗺️ 地图渲染
- **矢量瓦片** - 高效的矢量数据渲染
- **栅格瓦片** - 传统栅格图像支持
- **3D地形** - 地形起伏和倾斜显示
- **建筑3D** - 3D建筑物显示

### 🎨 样式系统
- **Mapbox Studio** - 在线地图样式编辑器
- **动态样式** - 运行时样式修改
- **自定义图层** - 数据可视化图层
- **表达式系统** - 条件样式和动画

### 📊 数据可视化
- **GeoJSON支持** - 标准地理数据格式
- **热力图** - 密度数据可视化
- **聚类聚合** - 点数据聚合显示
- **等值线图** - 连续数据可视化

### 🎮 交互功能
- **手势控制** - 平移、缩放、旋转
- **地理围栏** - 区域交互
- **弹出窗口** - 信息展示
- **绘制工具** - 标记和图形绘制

## 快速开始

### 安装
```bash
npm install mapbox-gl
```

### 基础地图
```html
<!DOCTYPE html>
<html>
<head>
    <script src='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css' rel='stylesheet' />
</head>
<body>
    <div id='map' style='width: 100%; height: 400px;'></div>
    <script>
        mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-74.5, 40],
            zoom: 9
        });
    </script>
</body>
</html>
```

### ES6模块使用
```javascript
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [116.4074, 39.9042], // 北京坐标
    zoom: 12
});
```

## 地图控制

### 基础控制
```javascript
// 导航控件
map.addControl(new mapboxgl.NavigationControl());

// 比例尺控件
map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
}));

// 全屏控件
map.addControl(new mapboxgl.FullscreenControl());

// 地理定位控件
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

// 切换图层控件
map.addControl(new mapboxgl.AttributionControl());
```

### 自定义控件
```javascript
class CustomControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'custom-control';
        this._container.textContent = '自定义控件';

        this._container.addEventListener('click', () => {
            console.log('控件点击');
        });

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}

map.addControl(new CustomControl(), 'top-right');
```

## 标记和弹窗

### 添加标记
```javascript
// 基础标记
const marker = new mapboxgl.Marker()
    .setLngLat([116.4074, 39.9042])
    .addTo(map);

// 自定义标记
const customMarker = new mapboxgl.Marker({
    color: '#3366ff',
    anchor: 'bottom'
})
    .setLngLat([116.4074, 39.9042])
    .addTo(map);

// HTML自定义标记
const el = document.createElement('div');
el.className = 'custom-marker';
el.style.backgroundImage = 'url(marker.png)';
el.style.width = '32px';
el.style.height = '32px';

const htmlMarker = new mapboxgl.Marker(el)
    .setLngLat([116.4074, 39.9042])
    .addTo(map);
```

### 弹窗功能
```javascript
// 创建弹窗
const popup = new mapboxgl.Popup({
    offset: 25,
    className: 'custom-popup'
})
.setHTML('<h3>标题</h3><p>内容描述</p>');

// 标记绑定弹窗
marker.setPopup(popup);

// 点击显示弹窗
map.on('click', (e) => {
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`坐标: ${e.lngLat.lat.toFixed(4)}, ${e.lngLat.lng.toFixed(4)}`)
        .addTo(map);
});
```

## 图层和数据

### 添加GeoJSON数据
```javascript
// 添加GeoJSON源
map.addSource('points', {
    type: 'geojson',
    data: {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [116.4074, 39.9042]
                },
                properties: {
                    title: '北京',
                    description: '中国首都'
                }
            }
        ]
    }
});

// 添加图层
map.addLayer({
    id: 'points',
    type: 'circle',
    source: 'points',
    paint: {
        'circle-radius': 6,
        'circle-color': '#B42222'
    }
});
```

### 外部数据源
```javascript
// 加载外部GeoJSON文件
map.addSource('countries', {
    type: 'geojson',
    data: 'data/countries.geojson'
});

// WMS数据源
map.addSource('wms-source', {
    type: 'raster',
    tiles: [
        'https://example.com/geoserver/wms?service=WMS&request=GetMap&layers=layer_name&styles=&format=image/png&transparent=true&width=256&height=256&bbox={bbox-epsg-3857}'
    ],
    tileSize: 256
});
```

## 样式和渲染

### 自定义样式
```javascript
// 动态修改图层样式
map.setPaintProperty('points', 'circle-color', [
    'match',
    ['get', 'type'],
    'restaurant',
    '#FF6B6B',
    'hotel',
    '#4ECDC4',
    'shop',
    '#45B7D1',
    '#CCCCCC'
]);

// 根据缩放级别动态调整
map.setPaintProperty('points', 'circle-radius', [
    'interpolate',
    ['linear'],
    ['zoom'],
    10, 5,
    15, 10,
    20, 20
]);
```

### 热力图
```javascript
map.addLayer({
    id: 'heatmap',
    type: 'heatmap',
    source: 'points',
    maxzoom: 20,
    paint: {
        // 热力图权重
        'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'mag'],
            0, 0,
            6, 1
        ],
        // 热力图强度
        'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            15, 3
        ],
        // 颜色渐变
        'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
        ],
        // 热力图半径
        'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            15, 20
        ]
    }
});
```

### 3D建筑
```javascript
// 添加3D建筑图层
map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15, 0,
            15.05, ['get', 'height']
        ],
        'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15, 0,
            15.05, ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
    }
});
```

## 交互事件

### 地图事件
```javascript
// 地图加载完成
map.on('load', () => {
    console.log('地图加载完成');
});

// 鼠标移动事件
map.on('mousemove', (e) => {
    const features = map.queryRenderedFeatures(e.point);
    console.log('鼠标下的要素:', features);
});

// 点击事件
map.on('click', 'points', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
});

// 鼠标悬停效果
map.on('mouseenter', 'points', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'points', () => {
    map.getCanvas().style.cursor = '';
});
```

### 地理围栏
```javascript
// 创建地理围栏
const bounds = new mapboxgl.LngLatBounds(
    [116.3, 39.8], // 西南角
    [116.5, 40.0]  // 东北角
);

// 检查点是否在围栏内
const point = [116.4074, 39.9042];
console.log(bounds.contains(point)); // true

// 自适应显示围栏
map.fitBounds(bounds, {
    padding: 20
});
```

## 绘制工具

### Mapbox Draw
```javascript
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        point: true,
        line_string: true,
        polygon: true,
        trash: true
    },
    defaultMode: 'draw_polygon'
});

map.addControl(draw);

// 绘制完成事件
map.on('draw.create', (e) => {
    const data = draw.getAll();
    console.log('绘制的图形:', data);
});
```

### 自定义绘制
```javascript
// 自定义绘制工具
class CustomDraw {
    constructor() {
        this.isDrawing = false;
        this.points = [];
    }

    enable() {
        map.on('click', this.handleClick.bind(this));
        map.on('dblclick', this.finishDrawing.bind(this));
    }

    handleClick(e) {
        if (!this.isDrawing) {
            this.isDrawing = true;
            this.points = [];
        }

        this.points.push(e.lngLat);
        this.updateDrawLayer();
    }

    finishDrawing() {
        this.isDrawing = false;
        console.log('绘制完成:', this.points);
    }

    updateDrawLayer() {
        if (map.getLayer('custom-draw')) {
            map.removeLayer('custom-draw');
        }
        if (map.getSource('custom-draw-source')) {
            map.removeSource('custom-draw-source');
        }

        map.addSource('custom-draw-source', {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: this.points.map(p => [p.lng, p.lat])
                }
            }
        });

        map.addLayer({
            id: 'custom-draw',
            type: 'line',
            source: 'custom-draw-source',
            paint: {
                'line-color': '#ff0000',
                'line-width': 2
            }
        });
    }
}
```

## 动画和过渡

### 动画移动
```javascript
// 飞行到指定位置
map.flyTo({
    center: [116.4074, 39.9042],
    zoom: 14,
    speed: 2,
    curve: 1.4,
    easing(t) {
        return t;
    }
});

// 平移到指定位置
map.easeTo({
    center: [116.4074, 39.9042],
    zoom: 12,
    duration: 1000
});
```

### 图层动画
```javascript
// 脉冲效果
let radius = 0;
function animate() {
    radius = (radius + 0.1) % 10;

    map.setPaintProperty('points', 'circle-radius', [
        '+',
        ['get', 'baseRadius'],
        ['*', ['sin', ['*', radius, Math.PI]], 3]
    ]);

    requestAnimationFrame(animate);
}
animate();

// 路径动画
const path = [
    [116.3, 39.9],
    [116.35, 39.92],
    [116.4, 39.9042],
    [116.45, 39.89]
];

let pathIndex = 0;
function animateMarker() {
    const currentPoint = path[pathIndex];
    marker.setLngLat(currentPoint);

    pathIndex = (pathIndex + 1) % path.length;

    setTimeout(animateMarker, 1000);
}
animateMarker();
```

## 性能优化

### 数据优化
```javascript
// 使用聚类聚合减少渲染点数
map.addSource('earthquakes', {
    type: 'geojson',
    data: 'earthquakes.geojson',
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50
});

map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
        ],
        'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
        ]
    }
});
```

### 渲染优化
```javascript
// 设置最大缩放级别避免过度渲染
map.setMaxZoom(18);

// 使用简化的数据源
map.addSource('simplified-buildings', {
    type: 'geojson',
    data: 'buildings-simplified.geojson',
    tolerance: 0.001
});

// 设置图层最小缩放级别
map.addLayer({
    id: 'buildings',
    type: 'fill',
    source: 'buildings',
    minzoom: 10
});
```

## 离线支持

### 缓存策略
```javascript
// 使用Service Worker缓存地图资源
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker注册成功'))
        .catch(err => console.log('Service Worker注册失败:', err));
}

// 预加载区域
const offlineBounds = [
    [116.2, 39.8], // 西南角
    [116.6, 40.1]  // 东北角
];

// 下载离线瓦片
map.on('load', () => {
    offlineBounds.forEach(bounds => {
        // 实现离线瓦片下载逻辑
        downloadOfflineTiles(bounds);
    });
});
```

## 最佳实践

### 1. 访问令牌管理
- 不要在客户端暴露访问令牌密钥
- 使用环境变量管理令牌
- 设置令牌使用限制

### 2. 性能优化
- 合理设置图层最小/最大缩放级别
- 使用聚类聚合处理大量点数据
- 简化几何数据减少渲染负担

### 3. 用户体验
- 提供加载状态指示
- 实现平滑的地图过渡动画
- 优化移动端触摸交互

### 4. 错误处理
- 监听地图加载错误
- 处理网络连接问题
- 提供降级方案

## 学习资源

### 官方资源
- [MapboxGL文档](https://docs.mapbox.com/mapbox-gl-js/api/)
- [Mapbox Studio](https://studio.mapbox.com/)
- [API参考](https://docs.mapbox.com/mapbox-gl-js/api/)

### 教程和示例
- [官方教程](https://docs.mapbox.com/mapbox-gl-js/examples/)
- [样式规范](https://docs.mapbox.com/mapbox-gl-js/style-spec/)

### 社区资源
- [GitHub仓库](https://github.com/mapbox/mapbox-gl-js)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/mapbox-gl-js)
- [Mapbox社区](https://www.mapbox.com/community/)

MapboxGL 凭借其强大的WebGL渲染能力和丰富的功能集，成为构建专业地图应用和地理空间可视化解决方案的首选库。