# Cesium.js

Cesium.js 是一个开源的JavaScript库，用于创建世界级的3D地球和地图可视化应用，专注于地理空间数据的展示和分析。

## 概述

Cesium 由Analytical Graphics公司创建，是一个高性能的WebGL地球引擎，能够展示全球范围的3D地理数据，包括地形、影像、3D模型、矢量数据等。它广泛用于地理信息系统、国防、航空航天、城市规划等领域。

## 核心特性

### 🌍 全球地球渲染
- **3D地球模型** - 高精度球体地球模型
- **全球地形** - 多分辨率地形数据
- **卫星影像** - 高分辨率影像底图
- **地形夸张** - 地形起伏效果增强

### 🏗️ 3D可视化
- **3D建筑物** - 城市建筑物建模
- **点云数据** - 激光雷达点云渲染
- **3D瓦片** - 大规模3D数据瓦片
- **倾斜摄影** - 倾斜摄影模型

### 📊 地理空间数据
- **矢量数据** - 点、线、面矢量要素
- **时空数据** - 时间序列数据可视化
- **实时数据** - 动态数据流展示
- **地理编码** - 坐标系统和投影转换

### 🎮 交互功能
- **相机控制** - 丰富的相机控制方式
- **拾取操作** - 空间拾取和查询
- **场景控制** - 时间、天气等场景控制
- **测量工具** - 距离、面积、高度测量

## 快速开始

### 安装
```bash
npm install cesium
```

### 基础地球应用
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Cesium.js"></script>
    <link href="https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
</head>
<body>
    <div id="cesiumContainer" style="width: 100%; height: 100%;"></div>
    <script>
        // 初始化Cesium
        const viewer = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: Cesium.createWorldTerrain(),
            imageryProvider: new Cesium.TileMapServiceImageryProvider({
                url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
            }),
            baseLayerPicker: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            vrButton: false
        });

        // 设置初始视图
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(116.3912, 39.9071, 1000)
        });
    </script>
</body>
</html>
```

### ES6模块使用
```javascript
import { Viewer, createWorldTerrain, Cartesian3 } from 'cesium';

// 创建viewer
const viewer = new Viewer('cesiumContainer', {
    terrainProvider: await createWorldTerrain(),
    timeline: false,
    animation: false,
    vrButton: false
});

// 设置初始位置
viewer.camera.setView({
    destination: Cartesian3.fromDegrees(116.3912, 39.9071, 1000)
});
```

## 场景配置

### 地形和影像
```javascript
// 添加地形
const terrainProvider = await Cesium.createWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true
});
viewer.terrainProvider = terrainProvider;

// 添加高分辨率影像
const imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
});
viewer.imageryLayers.addImageryProvider(imageryProvider);

// 自定义影像图层
const customLayer = viewer.imageryLayers.addImageryProvider(
    new Cesium.SingleTileImageryProvider({
        url: 'custom_map.png',
        rectangle: Cesium.Rectangle.fromDegrees(-120, 35, -110, 40)
    })
);
customLayer.alpha = 0.7;
customLayer.brightness = 1.2;
```

### 场景模式
```javascript
// 切换场景模式
viewer.scene.mode = Cesium.SceneMode.SCENE3D;    // 3D模式
viewer.scene.mode = Cesium.SceneMode.SCENE2D;    // 2D模式
viewer.scene.mode = Cesium.SceneMode.COLUMBUS_VIEW; // 哥伦布视图

// 设置渲染效果
viewer.scene.globe.enableLighting = true;  // 启用光照
viewer.scene.skyAtmosphere.show = true;    // 显示大气层
viewer.scene.skyBox.show = true;          // 显示星空

// 设置时间
viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date());
viewer.clock.multiplier = 1000; // 时间加速倍数
```

## 相机控制

### 相机操作
```javascript
// 飞行到指定位置
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(116.3912, 39.9071, 1000),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-45.0),
        roll: 0.0
    },
    duration: 3.0
});

// 设置相机视图
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(116.3912, 39.9071, 1000),
    orientation: {
        heading: Cesium.Math.toRadians(45),
        pitch: Cesium.Math.toRadians(-30),
        roll: 0.0
    }
});

// 相机动画
viewer.camera.lookAt(
    Cesium.Cartesian3.fromDegrees(116.3912, 39.9071, 0),
    new Cesium.HeadingPitchRange(
        Cesium.Math.toRadians(45),
        Cesium.Math.toRadians(-30),
        1000
    )
);
```

### 自定义相机控制
```javascript
// 监听相机移动事件
viewer.camera.moveStart.addEventListener(function() {
    console.log('相机开始移动');
});

viewer.camera.moveEnd.addEventListener(function() {
    console.log('相机停止移动');
    const position = viewer.camera.positionCartographic;
    console.log(`经度: ${Cesium.Math.toDegrees(position.longitude)}, 纬度: ${Cesium.Math.toDegrees(position.latitude)}, 高度: ${position.height}`);
});

// 设置相机限制
viewer.scene.screenSpaceCameraController.minimumZoomDistance = 100;
viewer.scene.screenSpaceCameraController.maximumZoomDistance = 10000000;
```

## 实体和数据

### 点位标记
```javascript
// 添加点位
const pointEntity = viewer.entities.add({
    name: '北京',
    position: Cesium.Cartesian3.fromDegrees(116.3912, 39.9071, 100),
    point: {
        pixelSize: 10,
        color: Cesium.Color.YELLOW,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
    },
    label: {
        text: '北京市',
        font: '14pt sans-serif',
        pixelOffset: new Cesium.Cartesian2(0, -50),
        showBackground: true,
        backgroundColor: Cesium.Color.BLACK.withAlpha(0.7)
    }
});

// 添加广告牌
const billboardEntity = viewer.entities.add({
    name: '标记',
    position: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 50),
    billboard: {
        image: 'marker.png',
        width: 32,
        height: 32,
        scale: 1.0,
        rotation: Cesium.Math.toRadians(0),
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
    }
});
```

### 线和面
```javascript
// 添加线条
const lineEntity = viewer.entities.add({
    name: '路线',
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            116.3912, 39.9071,
            116.4074, 39.9042,
            116.4234, 39.9015
        ]),
        width: 5,
        material: Cesium.Color.RED,
        clampToGround: true
    }
});

// 添加多边形
const polygonEntity = viewer.entities.add({
    name: '区域',
    polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
            116.3800, 39.9100,
            116.4000, 39.9100,
            116.4000, 39.8900,
            116.3800, 39.8900
        ]),
        material: Cesium.Color.BLUE.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLUE,
        height: 100,
        extrudedHeight: 200
    }
});
```

### 3D模型
```javascript
// 添加3D模型
const modelEntity = viewer.entities.add({
    name: '建筑模型',
    position: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 0),
    model: {
        uri: 'building.glb',
        minimumPixelSize: 128,
        maximumScale: 20000,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
    }
});

// 加载GLTF模型
const model = await Cesium.Model.fromGltfAsync({
    url: 'model.glb',
    scene: viewer.scene,
    modelMatrix: Cesium.Matrix4.fromTranslation(
        Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 0)
    )
});

// 模型动画
model.activeAnimations.add({
    name: 'animation_name',
    loop: Cesium.ModelAnimationLoop.REPEAT,
    speedup: 1.0
});
```

## 图层和数据源

### CZML数据
```javascript
// 加载CZML数据
const czmlDataSource = await Cesium.CzmlDataSource.load('data.czml');
viewer.dataSources.add(czmlDataSource);

// CZML数据格式示例
const czml = [{
    id: 'document',
    version: '1.0',
    name: '测试数据'
}, {
    id: 'satellite',
    availability: '2012-08-04T16:00:00Z/2012-08-04T16:05:00Z',
    position: {
        epoch: '2012-08-04T16:00:00Z',
        cartesian: [
            0, 3580579.0, 0, 4661944.0,
            60, 3580560.0, 0, 4661969.0,
            120, 3580540.0, 0, 4661995.0
        ]
    },
    point: {
        color: {
            rgba: [255, 255, 0, 255]
        },
        pixelSize: 10
    }
}];
```

### GeoJSON数据
```javascript
// 加载GeoJSON数据
const geoJsonDataSource = await Cesium.GeoJsonDataSource.load('data.geojson', {
    stroke: Cesium.Color.HOTPINK,
    fill: Cesium.Color.PINK.withAlpha(0.5),
    strokeWidth: 3,
    markerSymbol: '?'
});
viewer.dataSources.add(geoJsonDataSource);

// 自定义样式
const dataSource = await Cesium.GeoJsonDataSource.load('countries.geojson', {
    stroke: Cesium.Color.WHITE,
    fill: Cesium.Color.BLUE.withAlpha(0.1),
    strokeWidth: 2
});

// 添加点击事件
viewer.screenSpaceEventHandler.setInputAction(function(click) {
    const pickedObject = viewer.scene.pick(click.position);
    if (Cesium.defined(pickedObject)) {
        const entity = pickedObject.id;
        console.log('点击的实体:', entity.name);
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

### KML数据
```javascript
// 加载KML数据
const kmlDataSource = await Cesium.KmlDataSource.load('data.kml', {
    camera: viewer.scene.camera,
    canvas: viewer.scene.canvas
});
viewer.dataSources.add(kmlDataSource);
```

## 3D瓦片

### 3D Tiles
```javascript
// 加载3D Tiles数据
const tileset = await Cesium.Cesium3DTileset.fromUrl('https://cesium.com/public/SandCastle/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json', {
    maximumScreenSpaceError: 2,
    maximumMemoryUsage: 512
});
viewer.scene.primitives.add(tileset);

// 定位到瓦片集
viewer.zoomTo(tileset);

// 瓦片集样式
tileset.style = new Cesium.Cesium3DTileStyle({
    color: {
        conditions: [
            ['${Height} >= 100', 'color("purple", 0.5)'],
            ['${Height} >= 50', 'color("red", 0.5)'],
            ['true', 'color("blue", 0.5)']
        ]
    },
    show: '${Height} > 0',
    meta: {
        description: '"Building floor ${Floor} / ${Height} meters"'
    }
});
```

### 自定义3D Tiles
```javascript
// 创建自定义3D Tiles
const customTileset = new Cesium.Cesium3DTileset({
    url: 'custom_tileset.json',
    debugShowBoundingVolume: true,
    debugShowContentBoundingVolume: true,
    debugShowViewerRequestVolume: true
});

// 监听瓦片集事件
tileset.readyPromise.then(function(tileset) {
    console.log('瓦片集加载完成');
}).otherwise(function(error) {
    console.error('瓦片集加载失败:', error);
});

tileset.tileVisible.addEventListener(function(tile) {
    console.log('瓦片可见:', tile);
});
```

## 地形和影像

### 地形服务
```javascript
// Google地形服务
const googleTerrain = new Cesium.GoogleEarthEnterpriseTerrainProvider({
    url: 'https://earth.enterprise.googleapis.com/1.0/terrain',
    proxy: new Cesium.DefaultProxy('/proxy/')
});

// ArcGIS地形服务
const arcGISTerrain = new Cesium.ArcGISTiledElevationTerrainProvider({
    url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
    token: 'YOUR_API_KEY'
});

viewer.terrainProvider = arcGISTerrain;
```

### 自定义影像
```javascript
// OpenStreetMap
const osm = new Cesium.OpenStreetMapImageryProvider({
    url: 'https://a.tile.openstreetmap.org/'
});

// Mapbox卫星影像
const mapboxSatellite = new Cesium.MapboxStyleImageryProvider({
    styleId: 'mapbox/satellite-v9',
    accessToken: 'YOUR_MAPBOX_TOKEN'
});

// 天地图
const tiandituVec = new Cesium.WebMapTileServiceImageryProvider({
    url: 'http://t0.tianditu.gov.cn/vec_w/wmts',
    layer: 'vec',
    style: 'default',
    format: 'tiles',
    tileMatrixSetID: 'w',
    maximumLevel: 18
});
```

## 时间和动画

### 时间轴控制
```javascript
// 设置时间轴
viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime);

// 添加时间动态实体
const dynamicEntity = viewer.entities.add({
    position: new Cesium.SampledPositionProperty(),
    model: {
        uri: 'satellite.glb'
    }
});

// 添加位置采样
const time1 = Cesium.JulianDate.fromDate(new Date('2023-01-01T00:00:00Z'));
const time2 = Cesium.JulianDate.fromDate(new Date('2023-01-01T01:00:00Z'));

dynamicEntity.position.addSample(time1, Cesium.Cartesian3.fromDegrees(116.3912, 39.9071, 400000));
dynamicEntity.position.addSample(time2, Cesium.Cartesian3.fromDegrees(120.1551, 30.2741, 400000));

// 轨迹显示
dynamicEntity.path = {
    show: true,
    leadTime: 0,
    trailTime: 3600,
    width: 2,
    material: Cesium.Color.YELLOW
};
```

## 交互和分析

### 拾取操作
```javascript
// 场景拾取
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

handler.setInputAction(function(movement) {
    const pickedObject = viewer.scene.pick(movement.position);
    if (Cesium.defined(pickedObject)) {
        console.log('拾取到对象:', pickedObject);

        // 显示信息
        const entity = pickedObject.id;
        if (entity && entity.name) {
            const info = `
                名称: ${entity.name}
                位置: ${Cesium.Math.toDegrees(entity.position.getValue(viewer.clock.currentTime).longitude).toFixed(6)},
                        ${Cesium.Math.toDegrees(entity.position.getValue(viewer.clock.currentTime).latitude).toFixed(6)}
            `;
            console.log(info);
        }
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// 地形拾取
handler.setInputAction(function(movement) {
    const ray = viewer.camera.getPickRay(movement.position);
    const position = viewer.scene.globe.pick(ray, viewer.scene);

    if (Cesium.defined(position)) {
        const cartographic = Cesium.Cartographic.fromCartesian(position);
        console.log(`经度: ${Cesium.Math.toDegrees(cartographic.longitude)}, 纬度: ${Cesium.Math.toDegrees(cartographic.latitude)}, 高度: ${cartographic.height}`);
    }
}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
```

### 测量工具
```javascript
// 距离测量
let distancePoints = [];
handler.setInputAction(function(click) {
    const ray = viewer.camera.getPickRay(click.position);
    const position = viewer.scene.globe.pick(ray, viewer.scene);

    if (Cesium.defined(position)) {
        distancePoints.push(position);

        // 添加标记点
        viewer.entities.add({
            position: position,
            point: {
                pixelSize: 10,
                color: Cesium.Color.YELLOW,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        });

        // 如果有多个点，画线
        if (distancePoints.length > 1) {
            viewer.entities.add({
                polyline: {
                    positions: distancePoints,
                    width: 3,
                    material: Cesium.Color.RED,
                    clampToGround: true
                }
            });

            // 计算距离
            const distance = Cesium.Cartesian3.distance(distancePoints[0], distancePoints[1]);
            console.log(`距离: ${distance.toFixed(2)} 米`);
        }
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

## 性能优化

### 渲染优化
```javascript
// 设置渲染参数
viewer.scene.globe.maximumScreenSpaceError = 2;
viewer.scene.shadowMap.enabled = false;
viewer.scene.fog.enabled = false;

// 地形优化
viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();

// 禁用不必要的功能
viewer.scene.skyAtmosphere.show = false;
viewer.scene.skyBox.show = false;
viewer.scene.globe.enableLighting = false;

// 设置LOD
viewer.scene.screenSpaceCameraController.maximumZoomDistance = 100000;
```

### 内存管理
```javascript
// 定期清理缓存
setInterval(() => {
    viewer.scene.globe._surface._tileProvider._cache.reset();
}, 60000);

// 限制最大缓存
viewer.scene.globe._surface._tileProvider._cache.maximumTiles = 1000;

// 移除不需要的数据源
viewer.dataSources.remove(dataSource);
```

## 最佳实践

### 1. 数据管理
- 使用3D Tiles处理大规模数据
- 合理设置缓存大小
- 及时清理不需要的资源

### 2. 性能优化
- 选择合适的地形和影像服务
- 设置适当的LOD参数
- 优化几何体复杂度

### 3. 用户体验
- 提供加载进度指示
- 实现平滑的相机动画
- 优化移动端体验

### 4. 错误处理
- 监听数据加载错误
- 提供降级方案
- 实现重试机制

## 学习资源

### 官方资源
- [Cesium官网](https://cesium.com/)
- [CesiumJS文档](https://cesium.com/learn/cesiumjs/)
- [Sandcastle示例](https://sandcastle.cesium.com/)

### API参考
- [API文档](https://cesium.com/learn/cesiumjs/ref-doc/)
- [Cesium Ion](https://cesium.com/ion/)

### 社区资源
- [GitHub仓库](https://github.com/CesiumGS/cesium)
- [论坛](https://community.cesium.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/cesium)

Cesium.js 是地理空间可视化的强大工具，特别适合需要展示全球范围地理数据的应用，如GIS系统、智慧城市、航空航天等领域。