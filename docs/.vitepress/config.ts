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
                text: 'Claude Code',
                link: '/blog/ai-programming/claude-code/',
                items: [
                  { text: 'Z CF', link: '/blog/ai-programming/claude-code/z-cf/' }
                ]
              },
              { text: 'Codex', link: '/blog/ai-programming/codex/' },
              { text: 'Trae', link: '/blog/ai-programming/trae/' },
              { text: 'Qoder', link: '/blog/ai-programming/qoder/' },
              { text: 'Cursor', link: '/blog/ai-programming/cursor/' }
            ]
          },
          {
            text: '前端开发',
            items: [
              { text: 'Vue', link: '/blog/frontend/vue' },
              { text: 'React', link: '/blog/frontend/react' }
            ]
          }
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