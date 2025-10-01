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
        text: 'AI编程',
        items: [
          { text: 'Claude Code', link: '/ai-programming/claude-code' },
          { text: 'Codex', link: '/ai-programming/codex' },
          { text: 'Trae', link: '/ai-programming/trae' },
          { text: 'Qoder', link: '/ai-programming/qoder' },
          { text: 'Cursor', link: '/ai-programming/cursor' }
        ]
      },
      {
        text: '前端开发',
        items: [
          { text: 'Vue', link: '/frontend/vue' },
          { text: 'React', link: '/frontend/react' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wenjiezheng' }
    ],

    footer: {
      message: 'Built with VitePress',
      copyright: '© 2024 Wenjie Zheng'
    }
  }
}