export default {
  title: 'Wenjie Zheng Blog',
  description: 'Personal blog for sharing thoughts and experiences',

  // 设置默认主题为暗色模式
  appearance: 'dark',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog' }
    ],

    sidebar: [
      {
        text: '博客',
        items: [
          {
            text: 'AI编程',
            items: [
              {
                text: 'AI编程产品',
                link: '/blog/ai-programming/ai-products/',
                items: [
                  { text: 'Claude Code', link: '/blog/ai-programming/ai-products/claude-code/' },
                  { text: 'Cursor', link: '/blog/ai-programming/ai-products/cursor/' },
                  { text: 'Kiro', link: '/blog/ai-programming/ai-products/kiro/' },
                  { text: 'Augment Code', link: '/blog/ai-programming/ai-products/augment-code/' },
                  { text: 'Codex', link: '/blog/ai-programming/ai-products/codex/' },
                  { text: 'Factory Droid', link: '/blog/ai-programming/ai-products/factory-droid/' },
                  { text: 'Trae', link: '/blog/ai-programming/ai-products/trae/' },
                  { text: 'Qoder', link: '/blog/ai-programming/ai-products/qoder/' }
                ]
              },
              {
                text: 'AI编程工具或框架',
                link: '/blog/ai-programming/ai-tools-frameworks/',
                items: [
                  { text: 'Z CF', link: '/blog/ai-programming/ai-tools-frameworks/z-cf/' },
                  { text: 'Spec-Kit', link: '/blog/ai-programming/ai-tools-frameworks/spec-kit/' },
                  { text: 'OpenSpec', link: '/blog/ai-programming/ai-tools-frameworks/openspec/' },
                  { text: 'BMad-Method', link: '/blog/ai-programming/ai-tools-frameworks/bmad-method/' }
                ]
              }
            ]
          },
          {
            text: '前端3D开发',
            items: [
              { text: 'Three.js', link: '/blog/frontend-3d/threejs/' },
              { text: 'Babylon.js', link: '/blog/frontend-3d/babylonjs/' },
              { text: 'MapboxGL', link: '/blog/frontend-3d/mapboxgl/' },
              { text: 'Orillusion', link: '/blog/frontend-3d/orillusion/' },
              { text: 'WebGL', link: '/blog/frontend-3d/webgl/' },
              { text: 'WebGPU', link: '/blog/frontend-3d/webgpu/' },
              { text: 'Cesium.js', link: '/blog/frontend-3d/cesiumjs/' }
            ]
          },
          {
            text: '前端开发',
            items: [
              { text: 'Vue', link: '/blog/frontend/vue/' },
              { text: 'React', link: '/blog/frontend/react/' }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nangongwentian-fe' }
    ],

    footer: {
      message: 'Built with VitePress',
      copyright: '© 2024 Wenjie Zheng'
    }
  }
}